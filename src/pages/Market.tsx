import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'

import './Market.css';

import Navbar from '../components/Navbar';
// import NavbarSpare from '../components/NavbarSpare';
import Footer from '../components/Footer';
// import Recommend from '../components/Recommend';
import Interest from '../components/Interest';
import Block from '../components/Block';
// import axios from 'axios';
// import { API } from '../app.setting.json';
import { IAccount, defaultEmptyAccount } from '../interfaces/IUser';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import useLoading from '../hooks/useLoading';
import useAuthorization from '../hooks/useAuthorization';
// import { type } from 'os';
// import { ContactSupportOutlined } from '@material-ui/icons';
import Background from '../components/Background';
import { H5 } from "../components/standard/H";
import P from '../components/standard/P';
import { ThemeContext } from '../contexts/Theme';
import SlideCategory from '../components/SlideCategory';
import Recommend from '../components/Recommend';
import { Skeleton } from '@mui/material';

const th: string[] = [
    "ตรงกับคุณ",
    "เศร้าจัง, ไม่มีของที่ึความต้องการตรงกับคุณเลย",
    "หมวดหมู่",
    "ยอดนิยม"
]
const en: string[] = [
    "Match with you",
    "Sadly, no item is matched",
    "Category",
    "Popular",
]
const meow: string[] = [

]

function Market() {

    const history = useHistory();

    const [mobile, setMobile] = useState(false);
    const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
    const [allInventory, setAllInventory] = useState<any>(null);
    const [matchInventory, setMatchInventory] = useState<any>(null);
    const [cookies] = useCookies(['DaveTheHornyDuck']);
    const [show, hide] = useLoading();
    const { getUserData, getAllInventory, getMatchMarket } = useAuthorization();
    const [displayContent, setDisplayContent] = useState<string[]>(th);
    const { lang } = useContext(ThemeContext);

    window.addEventListener("resize", resize)
    useEffect(() => {
        resize();
        async function init() {
            var allInventoryData = await getAllInventory();
            setAllInventory(allInventoryData);
            var matchInventoryData = await getMatchMarket();
            setMatchInventory(matchInventoryData);
        }
        init();
    }, []);

    function resize() {
        if (window.innerWidth < 530) {
            return setMobile(true);
        }
        return setMobile(false)
    }
    useEffect(() => {
        if (lang === "th") {
            setDisplayContent(th);
        }
        else if (lang === "en") {
            setDisplayContent(en);
        }
        else if (lang === "mw") {
            setDisplayContent(meow);
        }
    }, [lang]);

    const tmpMatchInventory = matchInventory === null ? [] : matchInventory.map((item: any, index: any) => {
        if (item.owner != localStorage.getItem("uid")) {
            return <Recommend item={item.match} match={item.matchWith} key={index} />;
        }
    });
    const tmpInventory = allInventory === null ? [] : allInventory.map((item: any, index: any) => {
        if (item.owner != localStorage.getItem("uid")) {
            return <Interest item={item} key={index} />;
        }
    });

    return (
        <Background>
            <div>
                <Navbar image={localStorage.getItem("uid")} />
                <Block height="700" backgroundColor="#f7fafc" darkBackgroundColor="#1c1c1f">
                    <div className="my-4">
                        <H5 className="mb-3">{displayContent[0]}</H5>
                        <div className="full-width">
                            <div>
                                <div className="d-flex justify-content-start flex-wrap">
                                    {
                                        matchInventory !== null ?

                                            (tmpMatchInventory.length == 0 ?
                                                (
                                                    <div className="mx-auto my-5 text-center">
                                                        <p className="notfounditem">ไม่พบสิ่งของที่มีความต้องการตรงกับคุณ</p>
                                                    </div>
                                                )
                                                :
                                                (tmpMatchInventory.length <= 10 ? tmpMatchInventory : tmpMatchInventory.slice(0, 10))
                                            )
                                            :
                                            (
                                                <div className="d-flex">
                                                    <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: "0px 10px" }} />
                                                    <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: "0px 10px" }} />
                                                    <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: "0px 10px" }} />
                                                    <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: "0px 10px" }} />
                                                    <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: "0px 10px" }} />
                                                </div>
                                            )

                                    }

                                </div>
                            
                                {tmpMatchInventory.length > 10 ? 
                                    (
                                        <div className="d-flex justify-content-center align-items-center my-3">
                                            <div className="seemore" onClick={() => history.push(`/app/search/match-byseemore`)} ><p className="text-white font-weight-bold">see more</p></div>
                                        </div>
                                    )
                                    :
                                    (
                                        <></>
                                    )
                                }
                            </div>
                        </div>

                        <hr />

                        <div className="category">
                            <H5 className="mb-3">{displayContent[2]}</H5>
                            <SlideCategory />
                        </div>

                        <hr />

                        <H5 className="mb-3">{displayContent[3]}</H5>
                        <div className="full-width">
                            <div className="d-flex justify-content-start flex-wrap">
                                {
                                    allInventory !== null ?

                                        (tmpInventory.length == 0 ?
                                            (
                                                <div className="mx-auto my-5 text-center">
                                                    <p className="notfounditem">ไม่พบสิ่งของบน katrade marlet เลย</p>
                                                </div>
                                            )
                                            :
                                            (tmpInventory.length > 20 ? tmpInventory.slice(0, 20) : tmpInventory)
                                        )
                                        :
                                        (
                                            <div className="d-flex">
                                                <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: "0px 10px" }} />
                                                <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: "0px 10px" }} />
                                                <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: "0px 10px" }} />
                                                <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: "0px 10px" }} />
                                                <Skeleton variant="rectangular" width={210} height={118} sx={{ margin: "0px 10px" }} />
                                            </div>
                                        )
                                }
                            </div>
                            {tmpInventory.length > 20 ? 
                                    (
                                        <div className="d-flex justify-content-center align-items-center my-3">
                                            <div className="seemore" onClick={() => history.push(`/app/search/favorite-byseemore`)}><p className="text-white font-weight-bold">see more</p></div>
                                        </div>
                                    )
                                    :
                                    (
                                        <></>
                                    )
                            }
                        </div>
                    </div>
                </Block>
                <Footer />
            </div>
        </Background>
    );
}

export default Market;