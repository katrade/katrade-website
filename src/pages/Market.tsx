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



// function getRandomInt(max: number) {
//     return Math.floor(Math.random() * max);
// }

// const SeeMore = styled.button`
//     width: auto;
//     height: 40px;
//     border: 1px solid grey;
//     background-color: white;
//     padding: 0px 20px;
//     font-size: 18px;
// `

// type DestCompContextType = {
//     destCompState: any,
//     destCompDispatch: any,
// }

// const DestCompContext = React.createContext<DestCompContextType  | any >(null);

// function reducer(state:any, action:any) {
//     if (action.type === "Account") {
//         return { dest: "Account" };
//     }else if (action.type === "ChangePassword") {
//         return { dest: "ChangePassword" };
//     }else if (action.type === "Following") {
//         return { dest: "Following" };
//     }else if (action.type === "Followers") {
//         return { dest: "Followers" };
//     }else if (action.type === "Favorite") {
//         return { dest: "Favorite" };
//     }else if (action.type === "Inventory") {
//         return { dest: "Inventory" };
//     }else if (action.type === "History") {
//         return { dest: "History" };
//     }
//     return state;
// }

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

    // const [ destCompState , destCompDispatch] = useReducer(reducer, "Account");

    // สร้างตัวอย่างมาโชว์ Just For You
    // const rec_item = null;
    // สร้างตัวอย่างมาโชว์ Suggestion
    // const interest_item = id_item.map((item, index) => {
    //     return <Interest item={item} key={index} />;
    // });

    const [mobile, setMobile] = useState(false);
    const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
    const [allInventory, setAllInventory] = useState<any>();
    const history = useHistory();
    const [cookies] = useCookies(['DaveTheHornyDuck']);
    const [show, hide] = useLoading();
    const { getUserData, getAllInventory } = useAuthorization();
    const [displayContent, setDisplayContent] = useState<string[]>(th);
    const { lang } = useContext(ThemeContext);
    
    window.addEventListener("resize", resize)
    useEffect(() => {
        resize();
        async function init() {
            show()
            var userData = await getUserData();
            if (userData) {
                setAccount(userData);
            }
            else {
                console.clear();
                history.push('/app/signin');
            }
            var allInventoryData = await getAllInventory();
            setAllInventory(allInventoryData);
            hide()
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
    }, [lang])
    if (allInventory) {
        const tmpInventory = allInventory.map((item: any, index: any) => {
            if (item.owner != account._id) {
                return <Interest item={item} key={index} />;
            }
        });
        hide();
        return (
            // <DestCompContext.Provider value={{ destCompState , destCompDispatch }}>
            <Background>
                <div>
                    <Navbar image={account.profilePic} />
                    <Block height="700" backgroundColor="#f7fafc" darkBackgroundColor="#1c1c1f">
                        <div className="my-4">
                            <H5 className="mb-3">{displayContent[0]}</H5>
                            <div className="full-width">
                                <div>
                                    <div className="d-flex justify-content-start flex-wrap">
                                        <P>{displayContent[1]}</P>
                                        {/* {rec_item.length <= 10 ? rec_item : rec_item.slice(0, 10)} */}
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center my-3">
                                        {/* <SeeMore className="mx-1">Page number or see more? </SeeMore> */}
                                    </div>

                                </div>
                            </div>

                            <div className="category">
                                <H5>{displayContent[2]}</H5>
                                <div className="category-box">
                                </div>
                            </div>

                            <H5 className="mb-3">{displayContent[3]}</H5>
                            <div className="full-width">
                                <div className="d-flex justify-content-start flex-wrap">
                                    {/* {interest_item.length <= 35 ? interest_item : interest_item.slice(0, 30)} */}
                                    {tmpInventory}
                                </div>
                            </div>
                        </div>
                    </Block>
                    <br /><br />
                    <Footer />
                </div>
            </Background>
        );
        // </DestCompContext.Provider>
    } else {
        show()
        return null;
    }
}

// export { DestCompContext };
export default Market;


