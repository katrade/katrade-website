export default function FollowersComp(data: any) {
    const accountData = data.data;
    console.log(accountData)
    return (
        <div>
            <div className="bg-white row mx-auto mb-4" style={{ width: "100%" }}>
                <div className="p-3">
                <h4 className="d-inline-block me-3 mb-4">Followers</h4>
                <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({accountData.followers.length})</h5>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, aperiam.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, aperiam.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, aperiam.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, aperiam.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, aperiam.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, aperiam.</p>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, aperiam.</p>
                </div>
            </div>
        </div>
    );
}