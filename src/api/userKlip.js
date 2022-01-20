import axios from "axios";
import { COUNT_CONTRACT_ADDRESS } from "../constants";

const apiPrepareURL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const appName = 'KLAY_MARKET';
export const setCount = (count, setQrvalue) => {
    axios.post(
        apiPrepareURL, {
            bapp: {
                name: appName
            },
            type: 'execute_contract',
            transaction: {
                to : COUNT_CONTRACT_ADDRESS,
                abi : '{ "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }',
                value : '0',
                parans : `[\"${count}\"]`
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
                    clearInterval(timerId);
                }
            })
        }, 1000)
    })
}


export const getAddress = (setQrvalue) => {
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
                    clearInterval(timerId);
                }
            })
        }, 1000)
    })
}