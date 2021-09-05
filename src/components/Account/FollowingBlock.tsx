import { useState } from 'react';

import './FollowingBlock.css'

import { AccountBlock } from './AccountBlock' ;
import { TransparentButton } from '../standard/Button';

export default function FollowingBlock(props:any) {
    
    const { data, index } = props;

    const [ follow , SetFollow] = useState(true);
    const handleClickFollow = () => SetFollow(!follow);
    function follow_btn() {
        if(follow){
            return (
                <TransparentButton width="80px" buttonColor="red" padding="0 5px 0 5px">Unfollow</TransparentButton>
            );
        }else{
            return (
                <TransparentButton width="80px" buttonColor="limegreen" padding="0 5px 0 5px">follow</TransparentButton>
            );
        }
    }

    return (
        // <div className="following-block">
        //     <img src="https://source.unsplash.com/random" />
        //     <h5>{data.name}</h5>
        //     <div onClick={handleClickFollow}>{follow_btn()}</div>
        // </div>
        <div className="row-follow">
            <AccountBlock padding="15px 20px">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <img src="https://source.unsplash.com/random" style={{width:"50px", height:"50px", borderRadius:"50%"}}/>
                        <p className="fs-3 ms-3 mb-0">{data.name}</p>
                    </div>
                    <div onClick={handleClickFollow}>{follow_btn()}</div>
                </div>
            </AccountBlock>
        </div>
    );
}