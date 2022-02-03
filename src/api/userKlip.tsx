import axios from "axios";
import { COUNT_CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../constants";

const apiPrepareURL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const appName = 'KLAY_MARKET';

export const buyCard = async (tokenId: string, setQrvalue: React.Dispatch<React.SetStateAction<string>>, callback: any) => {
    const functionJson: string = '{ "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" }, { "name": "NFTAddress", "type": "address" }, { "name": "to", "type": "address" } ], "name": "buyNFT", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
    executeContract(MARKET_CONTRACT_ADDRESS, functionJson, "10000000000000000", `[\"${tokenId}\", \"${NFT_CONTRACT_ADDRESS}\"]`, setQrvalue, callback);
}

export const listingCard = async (fromAddress: string, tokenId: string, setQrvalue: React.Dispatch<React.SetStateAction<string>>, callback: any) => {
    const functionJson: string = '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
    executeContract(NFT_CONTRACT_ADDRESS, functionJson, "0", `[\"${fromAddress}\", \"${MARKET_CONTRACT_ADDRESS}\",\"${tokenId}\"]`, setQrvalue, callback);
}

export const mintCardWithURI = async (
    toAddress: string, 
    tokenId: number, 
    uri: string, 
    setQrvalue: React.Dispatch<React.SetStateAction<string>>,
    callback: any
) => {
    const functionJson: string = '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
    executeContract(NFT_CONTRACT_ADDRESS, functionJson, "0", `[\"${toAddress}\", \"${tokenId}\",\"${uri}\"]`, setQrvalue, callback);
}

export const executeContract = (
    txTo: string, 
    functionJSON: string, 
    value: string, 
    params: string, 
    setQrvalue: React.Dispatch<React.SetStateAction<string>>, 
    callback: any
) => {
    axios.post(
        apiPrepareURL, {
            bapp: {
                name: appName
            },
            type: 'execute_contract',
            transaction: {
                to : txTo,
                abi : functionJSON,
                value : value,
                parans : params
            }
        }
    ).then((res) => {
        const { request_key } = res.data;
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
        setQrvalue(qrcode);
        let timerId = setInterval(() => {
            axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`)
            .then((res) => {
                if(res.data.result) {
                    console.log(`[Result] ${JSON.stringify(res.data.result)}`);
                    callback(res.data.result)
                    clearInterval(timerId);
                }
            })
        }, 1000)
    })
}

export const getAddress = (setQrvalue: React.Dispatch<React.SetStateAction<string>>, callback: any) => {
    axios.post(
        apiPrepareURL, {
            bapp: {
                name: appName
            },
            type: 'auth'
        }
    ).then((res) => {
        const { request_key } = res.data;
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
        setQrvalue(qrcode);
        let timerId = setInterval(() => {
            axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`)
            .then((res) => {
                if(res.data.result) {
                    console.log(`[Result] ${JSON.stringify(res.data.result)}`);
                    callback(res.data.result.klaytn_address);
                    clearInterval(timerId);
                }
            })
        }, 1000)
    })
}


// export const setCount = (count: number, setQrvalue: React.Dispatch<React.SetStateAction<string>>) => {
//     axios.post(
//         apiPrepareURL, {
//             bapp: {
//                 name: appName
//             },
//             type: 'execute_contract',
//             transaction: {
//                 to : COUNT_CONTRACT_ADDRESS,
//                 abi : '{ "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }',
//                 value : '0',
//                 parans : `[\"${count}\"]`
//             }
//         }
//     ).then((res) => {
//         const { request_key } = res.data;
//         const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
//         setQrvalue(qrcode);
//         let timerId = setInterval(() => {
//             axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`)
//             .then((res) => {
//                 if(res.data.result) {
//                     console.log(`[Result] ${JSON.stringify(res.data.result)}`);
//                     clearInterval(timerId);
//                 }
//             })
//         }, 1000)
//     })
// }