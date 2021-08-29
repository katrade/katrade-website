import { useState } from 'react';

import './FollowingBlock.css'

import { TransparentButton } from '../standard/Button';

export default function FollowingBlock(props:any) {
    
    const { data, index } = props;

    const [ follow , SetFollow] = useState(true);
    const handleClickFollow = () => SetFollow(!follow);
    function follow_btn() {
        if(follow){
            return (
                <TransparentButton width="100px" buttonColor="red">Unfollow</TransparentButton>
            );
        }else{
            return (
                <TransparentButton width="100px" buttonColor="limegreen">follow</TransparentButton>
            );
        }
    }
    
    return (
        <div className="following-block">
            <img src="https://source.unsplash.com/random" />
            <h5>{data.name}</h5>
            <div onClick={handleClickFollow}>{follow_btn()}</div>
        </div>
    );
}