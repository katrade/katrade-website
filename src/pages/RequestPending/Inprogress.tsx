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
            name:"กล้วย",
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
            name:"ทุเรียน",
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
            name:"มะม่วง",
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

    // const item_data = data.map((data,index) => {
    //     return <RequestBlock data={data} index={index} />;
    // })
    const item_data = data.map((data,index) => {
        if (data.status == "2") {
            return <RequestBlock data={data} key={index} />;
        }else if (data.status == "3") {
            return <RequestBlock data={data} key={index} />;
        }
    })

    return(
        <div>
            <Navbar/>
                <Block height="50px" backgroundColor="#f7fafc">
                    <div className="my-4 py-3 px-4 background">
                        <div className="mb-3 d-flex flex-row topic-request">
                            <a href="/app/request" className="p-1 fs-4 me-3 font-weight-bold">Request To You</a>
                            <a href="/app/pending" className="p-1 fs-4 me-3 font-weight-bold">Your Pending</a>
                            <p className="p-1 fs-4 me-3 font-weight-bold currenttap">Inprogress</p>
                        </div>
                        <div>
                            {item_data}
                        </div>
                    </div>
                </Block>
            <Footer/>
        </div>
    );
}

// export default Request();