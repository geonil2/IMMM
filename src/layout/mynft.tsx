import React, { useState } from 'react';
import Profile from '../components/myNft/profile';
import NftList from '../components/myNft/nftList';

const MyNft = () => {
    const [tab, setTab] = useState(0);

    return (
        <div>
            <ul>
                <li onClick={() => setTab(0)}>Profile</li>
                <li onClick={() => setTab(1)}>Collection</li>
                <li onClick={() => setTab(2)}>Likes</li>
            </ul>

            {
                tab === 0 ? <Profile /> : <NftList tab={tab} />
            }
        </div>
    );
};

export default MyNft;