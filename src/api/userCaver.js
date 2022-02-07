import Caver from 'caver-js';
// import CounterABI from '../abi/CounterABI.json';
import KIP17ABI from '../abi/KIP17TokenABI.json';
import {COUNT_CONTRACT_ADDRESS, AUTHORIZATION, NFT_CONTRACT_ADDRESS, CHAIN_ID} from '../constants';

const option = {
    headers: [
        {
        name: "Authorization",
        value: AUTHORIZATION
        },
        {name: "x-chain-id", value : CHAIN_ID}
    ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option)); //누구한테 실행할지
const NFTContract = new caver.contract(KIP17ABI, NFT_CONTRACT_ADDRESS);

export const fetchCardsOf = async (address) => {
    // Fetch Balance
    const balance = await NFTContract.methods.balanceOf(address).call();

    // Fetch Token Ids
    const tokenIds = [];
    for(let i = 0; i < balance; i++) {
        const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
        tokenIds.push(id);
    }

    //Fetch Token URIs
    const tokenUris = [];
    for(let i = 0; i < balance; i++) {
        const uri = await NFTContract.methods.tokenURI(tokenIds[i]).call();
        tokenUris.push(uri);
    }
    
    const nfts = [];
    for(let i = 0; i < balance; i++) {
        nfts.push({ uri: tokenUris[i], id: tokenIds[i] });
    }
    
    return nfts
}


export const getBalance = (address) => {
    return caver.rpc.klay.getBalance(address).then((response) => {
        const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response), '');
        console.log(`balance, ${balance}`);
        return balance;
    })
}

// const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS); // 주소

// export const readCount = async () => {
//     const _count = await CountContract.methods.count().call();
//     console.log(_count);
// }

// export const setCount = async (newCount) => {
//     try {
//         //사용할 account 설정
//         const privatekey = '0x7175ec858a725800b8243be27b36130701442aa1d386f07204171c383a89a834';
//         const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
//         caver.wallet.add(deployer);
//         const receipt = await CountContract.methods.setCount(newCount).send({
//         from : deployer.address,//addree
//         gas : "0x4bfd200"//
//         });
//         console.log(receipt, 'receipt');
//     } catch(e) {
//         console.log(`[Error_set_count]${e}`);
//     }
// }
