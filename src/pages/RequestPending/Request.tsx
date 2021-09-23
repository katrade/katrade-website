import { useState } from 'react';

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

    const request_data = data.map((data,index) => {
        if (data.status == "0") {
            return <RequestBlock data={data} status={data.status} key={index} />;
        }
    })
    const pending_data = data.map((data,index) => {
        if (data.status == "1") {
            return <RequestBlock data={data} status={data.status} key={index} />;
        }
    })
    const inprogress_data = data.map((data,index) => {
        if (data.status == "2") {
            return <RequestBlock data={data} status={data.status} key={index} />;
        }else if (data.status == "3") {
            return <RequestBlock data={data} status={data.status} key={index} />;
        }
    })

    const [ component , setComponent ] = useState(1);
    const [ selectComponent , setSelectComponent ] = useState(request_data);
    function handleComponent(status:any) {
        setComponent(status)
        if(status == 1){
            setSelectComponent(request_data);
        }else if(status == 2){
            setSelectComponent(pending_data)
        }else if(status == 3){
            setSelectComponent(inprogress_data)
        }
    }

    return(
        <div>
            <Navbar/>
                <Block height="50px" backgroundColor="#f7fafc">
                    <div className="my-4 py-3 px-4 background">
                        <div className="mb-3 d-flex flex-row topic-request">
                            <p className={component == 1? "p-1 fs-4 me-3 font-weight-bold currenttap" : "p-1 fs-4 me-3 font-weight-bold"} onClick={() => handleComponent(1)}>Request To You</p>
                            {/* <p className="p-1 fs-4 me-3 font-weight-bold currenttap" onClick={() => handleComponent(1)}>Request To You</p> */}
                            <p className={component == 2? "p-1 fs-4 me-3 font-weight-bold currenttap" : "p-1 fs-4 me-3 font-weight-bold"} onClick={() => handleComponent(2)}>Your Pending</p>
                            <p className={component == 3? "p-1 fs-4 me-3 font-weight-bold currenttap" : "p-1 fs-4 me-3 font-weight-bold"} onClick={() => handleComponent(3)}>Inprogress</p>
                        </div>
                        <div>
                            {selectComponent}
                        </div>
                    </div>
                </Block>
            <Footer/>
        </div>
    );
}

// export default Request();