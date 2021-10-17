import HistoryBlock from '../../components/Account/HistoryBlock';

export default function HistoryComp(data:any, checkUser:any) {
    const accountData = data.data;
    const UidUser = data.checkUser._id;
    const dataHistoryBlock = accountData.reverse().map((data:any, index:any) => {
        return <HistoryBlock data={data} UidUser={UidUser} index={index}/>;
    });

    if (accountData){
        return (
            <div>
                <div className="bg-white row mx-auto mb-4 p-3" style={{ width: "100%" }}>
                        <div>
                            <h4 className="d-inline-block me-3 mb-4">History</h4>
                            <h5 className="d-inline-block" style={{color:"#95bddfd5"}}>({accountData.length})</h5>
                        </div>
                        <div className="mx-auto" style={{width:"100%"}}>
                            {dataHistoryBlock}
                        </div>
                </div>
            </div>
        );
    }else{
        return(
            <div>กุ๊กๆๆๆ</div>
        );
    }
}