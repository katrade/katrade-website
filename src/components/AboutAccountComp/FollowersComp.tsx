import { useState , useEffect } from "react";

import FollowingBlock from "../Account/FollowingBlock";
import Div from "../standard/Div";
import { H4, H5 } from "../standard/H";

export default function FollowersComp(data:any) {
    const accountData = data.data;
    const [ followerLength , setFollowerLength ] = useState<any>();

    useEffect(() => {
        if(accountData){
            setFollowerLength(accountData.length);
        }
    } , [accountData])

    if (accountData){
        const followingBlock = accountData.map((data:any, index:any) => {
            return <FollowingBlock data={data} relation={"follower"} Noti={(tmp:any) => {setFollowerLength(followerLength - 1)}} />;
        })
        return (
            <div>
                <Div dynamicPair={["#fff", "#212121"]} className="mx-auto mb-4 p-3" style={{ width: "100%", minHeight:"400px"}}>
                    <div>
                        <H4 className="d-inline-block me-3 mb-4" style={{padding:"0 12px"}}>Followers</H4>
                        <H5 className="d-inline-block">({followerLength})</H5>
                    </div>
                    <div className="row mx-auto" style={{width:"100%"}}>
                        {followingBlock}
                    </div>
                </Div>
            </div>
        );        
    }
    else{
        return (
            <div></div>
        )
    }

}