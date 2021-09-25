import React , { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components'

import './Market.css';

import Navbar from '../components/Navbar';
import NavbarSpare from '../components/NavbarSpare';
import Footer from '../components/Footer';
import Recommend from '../components/Recommend';
import Interest from '../components/Interest';
import Block from '../components/Block';
import axios from 'axios';
import { API } from '../app.setting.json';
import { IAccount, defaultEmptyAccount } from '../interfaces/IUser';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';
import useLoading from '../hooks/useLoading';
import useAuthorization from '../hooks/useAuthorization';
import { type } from 'os';
import { ContactSupportOutlined } from '@material-ui/icons';



function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const SeeMore = styled.button`
    width: auto;
    height: 40px;
    border: 1px solid grey;
    background-color: white;
    padding: 0px 20px;
    font-size: 18px;
`

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

function Market() {

    // const [ destCompState , destCompDispatch] = useReducer(reducer, "Account");

    const id_item = [
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
        {
            name_item: "Cats, a weird creature",
            photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
        },
    ]

    // สร้างตัวอย่างมาโชว์ Just For You
    const rec_item = id_item.map((item, index) => {
        return <Recommend item={item} key={index} />;
    });
    // สร้างตัวอย่างมาโชว์ Suggestion
    // const interest_item = id_item.map((item, index) => {
    //     return <Interest item={item} key={index} />;
    // });

    const [ mobile , setMobile ] = useState(false);
    const [ account , setAccount ] = useState<IAccount>(defaultEmptyAccount);
    const [ allInventory , setAllInventory ] = useState<any>();
    const history = useHistory();
    const [ cookies ] = useCookies(['DaveTheHornyDuck']);
    const [ show , hide ] = useLoading();
    const { getUserData , getAllInventory } = useAuthorization();

    window.addEventListener("resize", resize)
    useEffect(() => {
        resize();
        async function init() {
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
        }
        init();
    }, []);

    function resize() {
        if (window.innerWidth < 530) {
            return setMobile(true);
        }
        return setMobile(false)
    }

    if(allInventory){
        const tmpInventory = allInventory.map((item:any, index:any) => {
            if( item.owner != account._id){
            return <Interest item={item} key={index} />;
            }
        });

        return (
            // <DestCompContext.Provider value={{ destCompState , destCompDispatch }}>
            <div >
                <Navbar image={account.profilePic}/>
                <Block height="700" backgroundColor="#f7fafc">
                    <div className="my-4">
                        <h5 className="mb-3">Match with you</h5>
                        <div className="full-width">
                            <div>
                                <div className="d-flex justify-content-start flex-wrap">
                                    {rec_item.length <= 10 ? rec_item : rec_item.slice(0, 10)}
                                </div>
                                <div className="d-flex justify-content-center align-items-center my-3">
                                    <SeeMore className="mx-1">Page number or see more? </SeeMore>
                                </div>
                                
                            </div>
                        </div>

                        <div className="category">
                            <h5>Category</h5>
                            <div className="category-box">
                            </div>
                        </div>

                        <h5 className="mb-3">Popular</h5>
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
        );
        // </DestCompContext.Provider>
    }else{
        return (
            <div>
                <p>แสดงหน้าโหลดดิ้ง</p>
            </div>
        );
    }
}

// export { DestCompContext };
export default Market;


