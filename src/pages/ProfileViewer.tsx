import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import useAuthorization from '../hooks/useAuthorization';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Block from '../components/Block';
import Recommend from '../components/Recommend';

const queryString = require('query-string');

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export default function ProfileViewer() {

    const { search } = useLocation();
    const { user_id } = queryString.parse(search);

    const { getAnotherUser} = useAuthorization(); 
    
    const [ anotherUserData , setAnotherUserData ] = useState<any>(null);

    useEffect(() => {
        async function init() {
            var data = await getAnotherUser(user_id);
            if (data) {
                setAnotherUserData(data);
            }            
        }
        init();
    }, [])

    // const id_item = [
    //     {
    //         name_item: "Cats, a weird creature",
    //         photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
    //     },
    //     {
    //         name_item: "Cats, a weird creature",
    //         photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
    //     },
    //     {
    //         name_item: "Cats, a weird creature",
    //         photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
    //     },
    //     {
    //         name_item: "Cats, a weird creature",
    //         photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
    //     },
    //     {
    //         name_item: "Cats, a weird creature",
    //         photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
    //     },
    //     {
    //         name_item: "Cats, a weird creature",
    //         photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
    //     },
    //     {
    //         name_item: "Cats, a weird creature",
    //         photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
    //     },
    //     {
    //         name_item: "Cats, a weird creature",
    //         photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
    //     },
    //     {
    //         name_item: "Cats, a weird creature",
    //         photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
    //     },
    //     {
    //         name_item: "Cats, a weird creature",
    //         photo_src: `https://source.unsplash.com/random?sig=${getRandomInt(700)}`,
    //     },
    // ]

    if(anotherUserData) {
        console.log(anotherUserData)

        const inventory_item = anotherUserData.inventories.map((item:any, index:any) => {
            return <Recommend item={item} key={index} />;
        });

        return (
            <div>
                <Navbar />
                <Block height="auto" backgroundColor="#f7fafc">
                    {/* ส่วนของข้อมูลผู้ใช้ */}
                    <div className="container-profile">
                        <div className="container-profile-data">
                            <div className="full-width d-flex justify-content-center align-items-center p-5 flex-wrap">
                                <div className="d-flex justify-content-center mt-2 mb-3">
                                    <div style={{
                                        backgroundImage: `url(https://asset.vg247.com/genshin-impact-yoimiya-build.jpg/BROK/thumbnail/1200x1200/quality/100/genshin-impact-yoimiya-build.jpg)`, backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        minWidth: '130px',
                                        minHeight: '130px',
                                        borderRadius: '50%',
                                        margin: '0px 50px',
                                    }}></div>
                                </div>
                                <div>
                                    <h3 style={{ color: "#4a5659" }}>{anotherUserData.firstname} {anotherUserData.lastname}</h3>
                                    <p style={{ color: "#86979c" }}>@{anotherUserData.username}</p>
                                </div>
                            </div>
                            <div className="full-width d-flex justify-content-center align-items-center px-5 mb-3 flex-wrap">
                                <div className="d-flex justify-content-center align-items-center followers mx-2 px-5 py-3 my-2">
                                    <b className="mx-2 number">{anotherUserData.followers.length} </b> followers
                                </div>
                                <div className="d-flex justify-content-center align-items-center following mx-2 px-5 py-3 my-2">
                                    <b className="mx-2 number">{anotherUserData.following.length} </b> following
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Inventory ของผู้ใช้ */}
                    <div className="my-4">
                        <h5 className="mb-3">Inventory</h5>
                        <hr></hr>
                        <div className="full-width">
                            <div>
                                <div className="d-flex flex-wrap">
                                    {inventory_item.length <= 10 ? inventory_item : inventory_item.slice(0, 10)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Block>
                <Footer />
            </div>
        )
    }else{
        return (
            <div>

            </div>
        );
    }



  
}
