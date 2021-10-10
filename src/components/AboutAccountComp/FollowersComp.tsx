import { useState , useEffect } from "react";

import FollowingBlock from "../Account/FollowingBlock";

export default function FollowersComp(data:any) {
    const accountData = data.data;
    const [ followerLength , setFollowerLength ] = useState<any>();

    useEffect(() => {
        setFollowerLength(accountData.length);
    } , [accountData])

    if (accountData){
        const followingBlock = accountData.map((data:any, index:any) => {
            return <FollowingBlock data={data} relation={"follower"} Noti={(tmp:any) => {console.log(tmp) ; setFollowerLength(followerLength - 1)}} />;
        })
        return (
            <div>
                <div className="bg-white mx-auto mb-4 p-3" style={{ width: "100%", minHeight:"400px"}}>
                    <div>
                        <h4 className="d-inline-block me-3 mb-4" style={{padding:"0 12px"}}>Followers</h4>
                        <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({followerLength})</h5>
                    </div>
                    <div className="row mx-auto" style={{width:"100%"}}>
                        {followingBlock}
                    </div>
                </div>
            </div>
        );        
    }
    else{
        return (
            <div></div>
        )
    }

}