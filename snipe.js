const { ethers } = require("ethers");
const { Contract } = require('ethers');

const provider = new ethers.providers.WebSocketProvider("wss://yournode.com");

const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const contractABI = require('./abi/YOUR_ABI_CONTRACT_BOT.json');  //ABI CONTRACT BOT
const contractAddress = 'YOUR_ADDRESS_CONTRACT_B)T'; // CONTRACT BOT

const privateKey = "YOUR_PRIV_KEY";
const wallet = new ethers.Wallet(privateKey, provider);

const wbnbAddress = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"; // WBNB address
const tokenAddress = '0x3db43A0625Dd413aEFee1475FE1b9123628Ad042'; //token to buy
const amountBuy = '10000000000'; //amount to buy

const contract = new Contract(contractAddress, contractABI, wallet);

async function mempool(){
    provider.on("pending", async(tx)=>{
        const txInfo = await provider.getTransaction(tx);
        try{
            const txData = txInfo.data
            const iface = new ethers.utils.Interface(['function addLiquidityETH(address,uint256,uint256,uint256,address,uint256)'])
            const result = iface.decodeFunctionData('addLiquidityETH', txData)
            
            const tokentoSnipe = result[0]
            if(tokentoSnipe === tokenAddress){
              console.log('LIQUIDITY DETECTED')

              const swapTx = await contract.OMTHere( //OMTHere = function to buy on contract
                routerAddress,
                wbnbAddress,
                tokenAddress,
                amountBuy
              );
              console.log(swapTx);
              console.log( `✅ SUCCESS BOUGHT`);
            }
        }
        catch{
            console.log("..........still watching..........")
        }
        
    })
}
mempool()