import React from 'react';
import {useSetRecoilState} from "recoil";
import {showPopupAtom} from "../../recoil/popup";

const Sign = () => {
    const setShowLoginPopup = useSetRecoilState(showPopupAtom);

    return (
        <div className="header-sign">
            <div className="header-signIn" onClick={() => setShowLoginPopup(true)}>Sign In</div>
            {/* <div className="header-signOut">Sign Out</div> */}
        </div>
    );
}; 

export default Sign;
