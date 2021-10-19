import { useState, useEffect } from "react";

import FollowingBlock from "../Account/FollowingBlock";
import Div from "../standard/Div";
import { H4, H5 } from "../standard/H";

export default function FollowingComp(data: any) {
    const accountData = data.data;
    const [followingLength, setFollowingLength] = useState<any>();

    useEffect(() => {
        if (accountData) {
            setFollowingLength(accountData.length);
        }
    }, [accountData])

    function handleFollowingLength(noti: any) {
        if (noti == "follow") {
            setFollowingLength(followingLength + 1);
        } else {
            setFollowingLength(followingLength - 1);
        }
    }

    if (accountData) {
        const followingBlock = accountData.map((data: any, index: any) => {
            return <FollowingBlock data={data} relation={"following"} Noti={(noti: any) => {
                handleFollowingLength(noti);
            }} />;
        })
        return (
            <div>
                <Div dynamicPair={["#fff", "#212121"]} className="mx-auto mb-4 p-3" style={{ width: "100%", minHeight: "400px" }}>
                    <div>
                        <H4 className="d-inline-block me-3 mb-4" style={{ padding: "0 12px" }}>Following</H4>
                        <H5 className="d-inline-block"
                        // style={{color:"#95bddfd5"}}
                        >({followingLength})</H5>
                    </div>
                    <div className="row mx-auto" style={{ width: "100%" }}>
                        {followingBlock}
                    </div>
                </Div>
            </div>
        );
    }
    else {
        return (
            <div>Hello</div>
        )
    }
}
