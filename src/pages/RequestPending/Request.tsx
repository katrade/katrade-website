import { useState , useEffect } from 'react';
import useAuthorization from '../../hooks/useAuthorization';

import './Request.css';

import RequestBlock from '../../components/RequestPending/RequestBlock';

import Block from '../../components/Block'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Request() {

    const data = [
        {
            name:"bema",
            myItem:[
                {
                    nameItem:"Popcorn",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            yourItem:[
                {
                    nameItem:"Apple",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            status:"0",
        },
        {
            name:"bema",
            myItem:[
                {
                    nameItem:"Popcorn",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            yourItem:[
                {
                    nameItem:"Apple",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            status:"0",
        },
        {
            name:"bema",
            myItem:[
                {
                    nameItem:"Popcorn",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            yourItem:[
                {
                    nameItem:"Apple",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            status:"1",
        },
        {
            name:"bema",
            myItem:[
                {
                    nameItem:"Popcorn",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            yourItem:[
                {
                    nameItem:"Apple",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            status:"2",
        },
        {
            name:"bema",
            myItem:[
                {
                    nameItem:"Popcorn",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            yourItem:[
                {
                    nameItem:"Apple",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            status:"3",
        },
        {
            name:"bema",
            myItem:[
                {
                    nameItem:"Popcorn",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            yourItem:[
                {
                    nameItem:"Apple",
                    pic:"https://www.ishida.com/images/popcorn-640x480.gif",
                }
            ],
            status:"3",
        },
    ]

    const { getRequest , getPending } = useAuthorization();
    const [ dataRequest , setDataRequest ] = useState<any>();
    const [ dataPending , setDataPending ] = useState<any>();
    useEffect(() => {
        async function init() {
            var data1 = await getRequest();
            if (data1) {
                setDataRequest(data1);
            }
            var data2 = await getPending();
            if (data2) {
                setDataPending(data2);
            }
        }
        init();
    }, [])

    var request_data:any;
    var pending_data:any;
    var inprogress_data:any;
    if(dataRequest) {
        request_data = dataRequest.map((data:any,index:any) => {
            return <RequestBlock data={data} status={0} key={index} />;
        })
    }
    if(dataPending) {
        pending_data = dataPending.map((data:any,index:any) => {
            return <RequestBlock data={data} status={1} key={index} />;
        })
    }

    // const inprogress_data = data.map((data,index) => {
    //     if (data.status == "2") {
    //         return <RequestBlock data={data} status={data.status} key={index} />;
    //     }else if (data.status == "3") {
    //         return <RequestBlock data={data} status={data.status} key={index} />;
    //     }
    // })

    const [ component , setComponent ] = useState(1);
    const [ count , setCount ] = useState(0);
    const [ selectComponent , setSelectComponent ] = useState(request_data);
    function handleComponent(status:any) {
        setComponent(status)
        if(status == 1){
            setSelectComponent(request_data);
            setCount(request_data.length);
        }else if(status == 2){
            setSelectComponent(pending_data)
            setCount(pending_data.length);
        }else if(status == 3){
            setSelectComponent(inprogress_data)
            // setCount(inprogress_data.length);
        }
    }

    useEffect(() => {
        setSelectComponent(request_data);
    }, [dataRequest])

    if(dataRequest && dataPending){

        return(
            <div>
                <Navbar/>
                    <Block height="50px" backgroundColor="#f7fafc">
                        <div className="my-4 py-3 px-4 background">
                            <div className="mb-3 d-flex flex-row topic-request">
                                <p className={component == 1? "p-1 fs-4 me-3 font-weight-bold currenttap" : "p-1 fs-4 me-3 font-weight-bold"} onClick={() => handleComponent(1)}>Request To You</p>
                                <p className={component == 2? "p-1 fs-4 me-3 font-weight-bold currenttap" : "p-1 fs-4 me-3 font-weight-bold"} onClick={() => handleComponent(2)}>Your Pending</p>
                                <p className={component == 3? "p-1 fs-4 me-3 font-weight-bold currenttap" : "p-1 fs-4 me-3 font-weight-bold"} onClick={() => handleComponent(3)}>Inprogress</p>
                            </div>
                            <div style={{minHeight:"350px"}}>
                                {selectComponent}
                            </div>
                        </div>
                    </Block>
                <Footer/>
            </div>
        );
    }else{
        return (
            <div>
                <p>แสดงหน้าโหลดดิ้ง</p>
            </div>
        );
    }
}