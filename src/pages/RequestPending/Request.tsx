import { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import useAuthorization from '../../hooks/useAuthorization';

import './Request.css';

import RequestBlock from '../../components/RequestPending/RequestBlock';

import Block from '../../components/Block'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CgNpm } from 'react-icons/cg';
import { TransparentButton } from '../../components/standard/Button'
import useLoading from '../../hooks/useLoading';
import Background from '../../components/Background';
import P from '../../components/standard/P';
import Div from '../../components/standard/Div';

export default function Request() {

    const history = useHistory();
    const { getRequest, getPending, getInprogress } = useAuthorization();
    const [dataRequest, setDataRequest] = useState<any>();
    const [dataPending, setDataPending] = useState<any>();
    const [dataInprogess, setDataInprogess] = useState<any>();
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
            var data3 = await getInprogress();
            if (data3) {
                setDataInprogess(data3);
            }
        }
        init();
    }, [])

    const [component, setComponent] = useState(1);
    const [selectComponent, setSelectComponent] = useState(request_data);
    const [show, hide] = useLoading();
    function handleComponent(status: any) {
        setComponent(status)
        if (status == 1) {
            setSelectComponent(request_data);
        } else if (status == 2) {
            setSelectComponent(pending_data)
        } else if (status == 3) {
            setSelectComponent(inprogress_data)
        }
    }
    var request_data: any;
    var pending_data: any;
    var inprogress_data: any;
    if (dataRequest) {
        request_data = dataRequest.map((data: any, index: any) => {
            return <RequestBlock data={data} status={0} key={index} />;
        })
    }
    if (dataPending) {
        pending_data = dataPending.map((data: any, index: any) => {
            return <RequestBlock data={data} status={1} key={index} />;
        })
    }
    if (dataInprogess) {
        inprogress_data = dataInprogess.map((data: any, index: any) => {
            return <RequestBlock data={data} status={2} key={index} />;
        })
    }

    useEffect(() => {
        if (request_data) {
            setSelectComponent(request_data);
        }
    }, [dataRequest])

    if (dataRequest && dataPending && dataInprogess) {
        hide();
        return (
            <Background>
                <div>
                    <Navbar />
                    <Block height="50px">
                        <Div dynamicPair={["#ffffff", "#212121"]} className="my-4 py-3 px-4">
                            <div className="mb-3 d-flex flex-row topic-request">
                                <P className={component == 1 ? "p-1 fs-4 currenttap" : "p-1 fs-4"} onClick={() => handleComponent(1)}>Requested to you</P>
                                <P className={component == 2 ? "p-1 fs-4 currenttap" : "p-1 fs-4"} onClick={() => handleComponent(2)}>Pending</P>
                                <P className={component == 3 ? "p-1 fs-4 currenttap" : "p-1 fs-4"} onClick={() => handleComponent(3)}>In progress</P>
                            </div>
                            <div style={{ minHeight: "350px" }}>
                                {selectComponent}
                            </div>
                        </Div>
                    </Block>
                    <Footer />
                </div>
            </Background>
        );
    } else {
        show();
        return (
            <div>
            </div>
        );
    }
}
