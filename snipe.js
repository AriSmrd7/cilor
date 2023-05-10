const { ethers } = require("ethers");
const { Contract } = require('ethers');

const provider = new ethers.providers.WebSocketProvider("wss://yournode.com");

const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

const privateKey = "YOUR_PRIV_KEY";
const wallet = new ethers.Wallet(privateKey, provider);

const wbnbAddress = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"; // WBNB address
const tokenAddress = '0x3db43A0625Dd413aEFee1475FE1b9123628Ad042'; //token to buy. replace this
const amountBuy = '10000000000'; //amount to buy in wei

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

                //function to buy on pancakeswap
            }
        }
        catch{
            console.log("..........still watching..........")
        }
        
    })
}
mempool()
