const { expect } = require('chai');
const {ethers} = require('hardhat');

describe("Simple Storage Test",()=>{
    let SimpleStorage
    beforeEach(async()=>{
        SimpleStorage = await ethers.deployContract("SimpleStorage",[])
        await SimpleStorage.waitForDeployment();

        // console.log("SimpleStorage Address:",SimpleStorage.target);
    })


    it("Should return the current value",async()=>{
        const currentValue = await SimpleStorage.retreive();
        expect(currentValue).to.be.equals(0);
    })

    it("Should update the current value",async()=>{
        let currentValue = await SimpleStorage.retreive();
        expect(currentValue).to.be.equals(0);
        const txResponse = await SimpleStorage.store("789");
        await txResponse.wait();
        currentValue = await SimpleStorage.retreive();

        expect(currentValue).to.be.equals("789");
    })
})