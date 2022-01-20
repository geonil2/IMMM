import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import Caver from 'caver-js';

const COUNT_CONTRACT_ADDRESS = '0xeea62db9dF7006F49b19EC8a64F6c9b9f7beE0F6';
// const ACCESS_KEY_ID = 'KASKT2LHUW7NMJ1FG5WD85Z9';
// const SECRET_ACCESS_KEY = '3zbxVC-8s1M5sBz0NVZ5Wv82t891VcVbvldhNQWO';
const CHAIN_ID = '1001'; // TESNET 1001, MAINNET 8217
const COUNT_ABI = '[ { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "geteBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]';
const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic S0FTS1QyTEhVVzdOTUoxRkc1V0Q4NVo5OjN6YnhWQy04czFNNXNCejBOVlo1V3Y4MnQ4OTFWY1ZidmxkaE5RV08="
    },
    {name: "x-chain-id", value : CHAIN_ID}
  ]
}
const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option)); //누구한테 실행할지
const CountContract = new caver.contract(JSON.parse(COUNT_ABI), COUNT_CONTRACT_ADDRESS); // 주소

const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
}

const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response), '');
    console.log(`balance, ${balance}`);
    return balance;
  })
}

const setCount = async (newCount) => {
  try {
    //사용할 account 설정
    const privatekey = '0x7175ec858a725800b8243be27b36130701442aa1d386f07204171c383a89a834';
    const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
    caver.wallet.add(deployer);
    const receipt = await CountContract.methods.setCount(newCount).send({
      from : deployer.address,//addree
      gas : "0x4bfd200"//
    });
    console.log(receipt, 'receipt');
  } catch(e) {
    console.log(`[Error_set_count]${e}`);
  }
}
// 1. Smart contract 배포 주소 파악(가져오기)
// 2. caver.js 이용해서 스마트 컨트랙트 연동하기
// 3. 가져온 스마트 컨트랙트 실행 

function App() {
  readCount();
  getBalance('0x7601fbeda5d5e30146e73a3508c15590b782eadc');

  //클라이언트 ID (환경변수)
  let googleClientId=process.env.REACT_APP_CLIENT_ID||"";
  //사용자 정보를 담아둘 userObj
  const [userObj, setUserObj] = useState({
    email:"",
    name:""
  })
  //로그인 성공시 res처리
  const onLoginSuccess=(res) => {
    console.log(res);
    setUserObj({...userObj,
      email:res.profileObj.email,
      name:res.profileObj.name
    }) 
  }

  const onLogout = () => {
    console.log('logout');
    setUserObj({...userObj,
      email:'',
      name:''
    }) 
  }
  return (
    <div className="App">
      <div>
        <GoogleLogin
          clientId = {googleClientId}
          buttonText="Google"
          onSuccess={result=>onLoginSuccess(result)}
          onFailure={result => console.log(result)}
        />
        <div>{userObj.email}</div>
        <div>{userObj.name}</div>

        <GoogleLogout
            clientId = {googleClientId}
            buttonText="logout!!"
            onLogoutSuccess={onLogout}
            />
      </div>
      
      <button title={'카운트 변경'} onClick={() => {setCount(100)}}>connect</button>
    </div>
  );
}

export default App;
