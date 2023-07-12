// Imports
const {ethers,run,network} = require('hardhat');

// Async Functions

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const main = async()=>{
  const simpleStorage = await ethers.deployContract("SimpleStorage",[]);
   await simpleStorage.waitForDeployment();
  console.log(`Deployed contract to: ${simpleStorage.target}`)




  if((network.config.chainId === 80001 && process.env.POLYGON_API_KEY)){
    await sleep(30 * 1000)
    await verify(simpleStorage.target,[]);
  }

  const currentValue = await simpleStorage.retreive();
  console.log(`Current Value Number is ${currentValue}`);
  const transactionResponse = await simpleStorage.store("789");
  await transactionResponse.wait(5);
  const newValue = await simpleStorage.retreive();
  console.log(`Updated value is ${newValue}`); 
  
}


// Created a function to verify contract programatically
const verify = async(contractAddress,args)=>{
  try {
    console.log("Verifying contract programatically....");
    await run("verify:verify",{
      address:contractAddress,
      constructorArguments:args
    });
    
  } catch (error) {
    if(error.message.toLowerCase().includes("already verified")){
      console.log("Contract Already Verified");
    }else {
      console.log(error);
    }
  }
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })