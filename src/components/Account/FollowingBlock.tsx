import { useState } from 'react';

import useAuthorization from '../../hooks/useAuthorization';
import { AccountBlock } from './AccountBlock' ;
import { TransparentButton } from '../standard/Button';

export default function FollowingBlock(props:any) {
    
    const { data, relation , Noti } = props;
    const {unFollow, onFollow} = useAuthorization();
    const [ follow , setFollow] = useState(true);
    const [ checkFollower, setCheckFollower ] = useState(true);

    const handleClickFollow = () => setFollow(!follow);
    const handleRemoveFollower = () => setCheckFollower(!checkFollower);
    function follow_btn() {
        if (relation == "following"){
            if (follow){
                return (
                    <TransparentButton width="80px" buttonColor="red" padding="0 5px 0 5px" margin="0" onClick={() => {
                        unFollow(data._id);
                        Noti("unfollow");
                    }}>unfollow</TransparentButton>
                )
            }
            else{
                return (
                    <TransparentButton width="80px" buttonColor="limegreen" padding="0 5px 0 5px" margin="0" onClick={() => {
                        onFollow(data._id);
                        Noti("follow");
                    }}>follow</TransparentButton>
                )       
            }
        }
        else{
            if (checkFollower){
                return (
                    <TransparentButton width="80px" buttonColor="red" padding="0 5px 0 5px" margin="0" onClick={() => {
                        if (window.confirm("ต้องการยกเลิกการติดตามหรือไม่")){
                            Noti(data._id);
                        }}}>remove
                    </TransparentButton>
                )                
            }
        }
    }
    
    return (
        <div className="col-lg-6">
            <AccountBlock padding="10px">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <img src={data.profilePic? data.profilePic : "https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"} style={{width:"50px", height:"50px", borderRadius:"50%"}}/>
                        <p className="fs-3 ms-3 mb-0">{data.username}</p>
                    </div>
                    <div className="my-auto" onClick={relation=="following" ? handleClickFollow : handleRemoveFollower}>{follow_btn()}</div>
                </div>
            </AccountBlock>
        </div>
    );
}