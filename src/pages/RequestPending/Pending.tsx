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
        },
    ]

    const item_data = data.map((data,index) => {
        return <RequestBlock data={data} index={index} />;
    })

    return(
        <div>
            <Navbar/>
                <Block height="50px">
                    <div className="my-4 py-3 px-4 background">
                        <div className="mb-3 d-flex flex-row topic-request">
                            <a href="/app/request" className="p-1 fs-4 me-3 font-weight-bold">Request To You</a>
                            {/* <p className="p-1 fs-4 me-3 font-weight-bold currenttap">Request To You</p> */}
                            {/* <a href="/app/pending" className="p-1 fs-4 me-3 font-weight-bold">Your Pending</a> */}
                            <p className="p-1 fs-4 me-3 font-weight-bold currenttap">Your Pending</p>
                            <a href="/app/inprogress" className="p-1 fs-4 font-weight-bold">Inprogress</a>
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