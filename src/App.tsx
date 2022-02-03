import React, { useState } from 'react';
import './App.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {getBalance, fetchCardsOf} from './api/userCaver';
import QRCode from 'qrcode.react';
import * as KlipAPI from './api/userKlip';
import { MARKET_CONTRACT_ADDRESS } from './constants';
import { nfts } from './type/type';

const DEFAULT_QR_CODE = 'DEFAULT'
const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000"

function App() {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [nfts, setNfts] = useState<nfts[]>([]);
  const [myBalance, setMyBalance] = useState("0");
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
  const [mintImgUrl, setMintImgUrl] = useState("");

  // readCount();
  // getBalance('0x7601fbeda5d5e30146e73a3508c15590b782eadc');

  //클라이언트 ID (환경변수)
  let googleClientId = process.env.REACT_APP_CLIENT_ID || "";
  //사용자 정보를 담아둘 userObj
  const [userObj, setUserObj] = useState({
    email:"",
    name:""
  })
  //로그인 성공시 res처리
  const onLoginSuccess=(res: any) => {
    console.log(res);
    setUserObj({...userObj,
      email: res.profileObj.email,
      name: res.profileObj.name
    })
  }

  const onLogout = () => {
    console.log('logout');
    setUserObj({...userObj,
      email:'',
      name:''
    }) 
  }



  const onClickMint = async (uri: string) => {
    if(myAddress === DEFAULT_ADDRESS) {
      alert("No address");
    }
    const randomTokenId = Math.random() * 100;
    KlipAPI.mintCardWithURI(myAddress, randomTokenId, uri, setQrvalue, (result: any) => {
      alert(JSON.stringify(result));
    })
  }

  const getUserData = () => {
    KlipAPI.getAddress(setQrvalue, async (address: string) => {
      setMyAddress(address);
      const _balance = await getBalance(address);
      setMyBalance(_balance);
    });
  }

  const fetchMarketNFTs = async () => {
    const _nfts: nfts[] = await fetchCardsOf(MARKET_CONTRACT_ADDRESS);
    setNfts(_nfts);
  }

  const fetchMyNFTs = async () => {
    const _nfts: nfts[] = await fetchCardsOf(myAddress);
    setNfts(_nfts);
  }

  const getClickGetAddress = () => {
    // KlipAPI.getAddress(setQrvalue);
  }

  const onClickSetCount = () => {
    // KlipAPI.setCount(2000, setQrvalue);
  }

  return (
    <div className="App">
      <div>
        <GoogleLogin
          clientId = {googleClientId}
          buttonText="Login"
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

      <button onClick={fetchMyNFTs}>내 NFT 가져오기</button>
      <button onClick={fetchMarketNFTs}>마켓 NFT 가져오기</button>
      
      <form>
        <input 
          type="text"
          placeholder='이미지 주소를 입력해주세요.'
          value={mintImgUrl}
          onChange={(e) => {
            setMintImgUrl(e.target.value);
          }}
        />
        <button onClick={() => onClickMint(mintImgUrl)}>발행하기</button>
      </form>
  
      <div>
        {nfts.map((nft) => (
          <img src={nft.uri} />
        ))}
      </div>
      
      <QRCode value={qrvalue} size={256} />

      <div onClick={getUserData}>
        잔고 : {myBalance}
        주소 : {myAddress}
      </div>
      
      {/* <button onClick={getClickGetAddress}>get address</button>
      <button onClick={onClickSetCount}>set Count</button>
      <button onClick={() => {setCount(100)}}>connect</button> */}
    </div>
  );
}

export default App;
