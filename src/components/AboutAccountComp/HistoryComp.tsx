import HistoryBlock from '../../components/Account/HistoryBlock';
import Div from '../standard/Div';
import { H4, H5 } from '../standard/H';

export default function HistoryComp(data:any, checkUser:any) {
    const accountData = data.data;
    const UidUser = data.checkUser._id;
    const dataHistoryBlock = accountData.reverse().map((data:any, index:any) => {
        return <HistoryBlock data={data} UidUser={UidUser} index={index}/>;
    });

    if (accountData){
        return (
            <div>
                <Div dynamicPair={["#fff", "#212121"]} className="row mx-auto mb-4 p-3" style={{ width: "100%" }}>
                        <div>
                            <H4 className="d-inline-block me-3 mb-4">History</H4>
                            <H5 className="d-inline-block">({accountData.length})</H5>
                        </div>
                        <div className="mx-auto" style={{width:"100%"}}>
                            {dataHistoryBlock.reverse()}
                        </div>
                </Div>
            </div>
        );
    }else{
        return(
            <div>กุ๊กๆๆๆ</div>
        );
    }
}