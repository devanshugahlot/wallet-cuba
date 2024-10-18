import { BUSD_ABI, contractAbi } from "./contracts/Abi";
import { testBUSDcontractAddress, testContractAddress } from "./contracts/contracts";

let environment = process.env.NETWORK
let contractAddress = "";
let ABI = "";
let BUSDcontractAddress = "";
let BUSDABI = "";

if(environment == "testnet"){
    contractAddress = testContractAddress;
    ABI = contractAbi;
    BUSDcontractAddress = testBUSDcontractAddress;
    BUSDABI = BUSD_ABI;
}else{
    contractAddress = testContractAddress;
    ABI = contractAbi;
    BUSDcontractAddress = testBUSDcontractAddress;
    BUSDABI = BUSD_ABI;
}

export {
    contractAddress,
    ABI,
    BUSDcontractAddress,
    BUSDABI
}