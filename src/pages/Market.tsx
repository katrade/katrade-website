import { useEffect, useState } from 'react'
import styled from 'styled-components'

import './Market.css';

import Navbar from '../components/Navbar';
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

async function getRandomWord(): Promise<string> {
    return new Promise(async (resolve,reject) => {
        const a = await axios.get('https://random-word-api.herokuapp.com/word?number=1')
        resolve(a.data)
    })

}

export default function Market() {
    
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
    const interest_item = id_item.map((item, index) => {
        return <Interest item={item} key={index} />;
    });

    const [mobile, setMobile] = useState(false);
    const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
    const history = useHistory();
    const [cookies] = useCookies(['DaveTheHornyDuck']);
    const [show, hide] = useLoading();
    const [getUserData] = useAuthorization();    
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
        }
        init();
        
    }, []);

    function resize() {
        if (window.innerWidth < 530) {
            return setMobile(true);
        }
        return setMobile(false)
    }
    

    return (
        <div >
            <Navbar image={account.profilePic}/>
            {/* <SearchMenu /> */}
            <Block height="700" backgroundColor="#f7fafc">
                <div className="my-4">
                    <h5 className="mb-3">Match with you</h5>
                    <div className="full-width">
                        <div>
                            <div className="d-flex justify-content-around flex-wrap">
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
                        <div className="d-flex justify-content-around flex-wrap">
                            {interest_item.length <= 35 ? interest_item : interest_item.slice(0, 30)}
                        </div>
                    </div>
                </div>
            </Block>

            <br /><br />

            <Footer />
        </div>
    )
}


