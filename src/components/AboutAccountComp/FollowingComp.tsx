import { useState , useEffect } from "react";

import FollowingBlock from "../Account/FollowingBlock";

export default function FollowingComp(data: any) {
    const accountData = data.data;
    const [ followingLength , setFollowingLength ] = useState<any>();
    
    useEffect(() => {
        setFollowingLength(accountData.length);
    } , [accountData])

    function handleFollowingLength(noti:any) {
        if(noti == "follow"){
            setFollowingLength(followingLength + 1);
        }else{
            setFollowingLength(followingLength - 1);
        }
    }

    if (accountData){
        const followingBlock = accountData.map((data:any, index:any) => {
            return <FollowingBlock data={data} relation={"following"} Noti={(noti:any) => {
                handleFollowingLength(noti);
            }} />;
        })
        return (
            <div>
                <div className="bg-white mx-auto mb-4 p-3" style={{ width: "100%", minHeight:"400px"}}>
                    <div>
                        <h4 className="d-inline-block me-3 mb-4" style={{padding:"0 12px"}}>Following</h4>
                        <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({followingLength})</h5>
                    </div>
                    <div className="row mx-auto" style={{width:"100%"}}>
                        {followingBlock}
                    </div>
                </div>
            </div>
        );
    }
    else{
        return(
            <div>Hello</div>
        )
    }
}
