// Import Tasks from hardhat
// Task is for plugins and scripts are for development
const {task} = require('hardhat/config');

// Use the task function task("task name","task description") and use setAction function
task("block-number","Get the current block number").setAction(
    async (taskArgs,hre)=>{
        const blocknumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number: ${blocknumber}`);
    }
)

module.exports={}
