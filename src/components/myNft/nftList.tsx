import React from 'react';

const NftList = ({tab} : {tab : number}) => {
    return (
        <div>
            { tab === 1 ? 'Collection' : 'Likes'}
        </div>
    );
};

export default NftList;