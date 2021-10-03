import FollowingBlock from "../Account/FollowingBlock";

export default function FollowersComp(data: any) {
    const accountData = data.data;
    if (accountData){
        const followingBlock = accountData.map((data:any, index:any) => {
            return <FollowingBlock data={data} key={index} relation={"follower"}/>;
        })
        return (
            <div>
                <div className="bg-white row mx-auto mb-4 p-3" style={{ width: "100%" }}>
                    <div>
                        <h4 className="d-inline-block me-3 mb-4">Followers</h4>
                        <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({accountData.length})</h5>
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