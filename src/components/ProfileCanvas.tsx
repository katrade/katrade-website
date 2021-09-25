import { useContext } from 'react'
import { ThemeContext } from '../contexts/Theme';
import styled from 'styled-components';
import Background from './Background';
import { H6 } from './standard/H';
import P from './standard/P';
import Icon from './Icon';
import StaticNav from './StaticNav';
import { BlockWithImageAttachment } from './Block';
import Footer from './Footer'

import wallpaper from '../pics/katrade-wallpaper3.png';

import facebookForDark from '../pics/facebook.png';
import instagramForDark from '../pics/instagram.png';
import githubForDark from '../pics/github-white.png';
import github from '../pics/github-dark.png';


const HeadTab = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #137a63;
    min-height: 400px;
    background-image: url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29tcHV0ZXIlMjB3b3JraW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`


export default function ProfileCanvas() {
    return (
        <>
            <Background>
                <StaticNav />
                <BlockWithImageAttachment height="200px" backgroundImage={wallpaper} className="mt-5 pb-5">
                    <HeadTab><h3 className="white">Our developers</h3></HeadTab>
                    <div className="my-5" />
                    <div className="full-width d-flex justify-content-center">
                        <div className="row m-0 p-0" style={{ width: "80%" }}>

                            <Profile name="Chalanthorn Aengaguga" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU" label="Developer"/>
                            <Profile name="Chonchanat Tubtiang" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7NIFM8QiRrDJqNRJ9xj-_b09MQwQK0Io5xg3Ge9z2wnmdglim2PCOzHdWsjq0qT_Y8v4&usqp=CAU" label="Chef"/>
                            <Profile name="Jirat Wangslae" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3aDHlzgAfDG4_gGi4P2MKfwY-dqaqLwH-kPuyfU240-BZd32D5NsX_NSbdj6l1gg0OQU&usqp=CAU" label="Developer"/>
                            <Profile name="Napasin Saengthong" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuiaJ3au5xztqR3mOekUEnNHdnI1l_BxfiDQ7M4CX1QRKz59NFFWPNkfRY2tmRHlzUyUk&usqp=CAU" label="Developer"/>
                            <Profile name="Nattawat Mmmm" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBlT6tWFRvqh1_3Y59fCt0Ml7kQaCECCCHt7IvZRfy3wWwqFW3_EP2qF_nkcKfYgD-rnU&usqp=CAU" label="Developer"/>
                            <Profile name="Nik Watchporn" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNeNr1-vSeAA27f-UXwXKfkNy-7QoGz4QmjPCabheZURu4j8_qoySTOKzIJr7RP4oPx2I&usqp=CAU" label="UX/UI Designer"/>
                            <Profile name="Nutchanon Chalalalala" img="https://www.shareicon.net/data/2016/07/05/791214_man_512x512.png" label="Developer"/>
                            <Profile name="Pandin Lewewe" img="https://image.flaticon.com/icons/png/512/168/168726.png" label="UX/UI Designer"/>
                            <Profile name="Passawit Sanggrab" img="https://image.flaticon.com/icons/png/512/168/168723.png" label="Product Analyst"/>
                            <Profile name="Pokpong Nopakhun" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJcSqgPOCILzq4SGOHxKr6Iv7S9FwELMDJujbyfQXLSF_1NJ03WH4X7crOnJevYEoIvco&usqp=CAU" label="Developer"/>
                            <Profile name="Sorrawich Supbro" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqmLEM7M9WzpqFLYb7GhrP76gpZ4gFK1mdvJL2MGMDJBhxTD8tEB9fLoHaMN87fxYQbJs&usqp=CAU" label="Developer"/>
                            <Profile name="Teratat Uvuvwevwevwe" img="https://previews.123rf.com/images/yuzach/yuzach1607/yuzach160700007/60379520-cute-black-cat-in-flat-style-with-funny-cartoon-square-head.jpg" label="Product Analyst"/>
                            <Profile name="Thanapon Omg" img="https://i.imgflip.com/4/db5xf.jpg" label="Product Analyst"/>           
                            
                            <ProfilePlaceHolder />
                            <ProfilePlaceHolder />
         
                        </div>


                    </div>

                </BlockWithImageAttachment>
                <Footer />
            </Background>
        </>
    )
}


interface boxPropsInterface {
    img?: string
    name?: string
    label?: string
}

const Embed = styled.div`
    width: 100%;
    height: 100%;
    min-width: 260px;
    min-height: 340px;
    background-color: #f2f4f7;
    border-radius: 10px;
    padding-top: 7%;
    padding-botton: 7%;
    padding-left: 50px;
    padding-right: 50px;
    text-align: center;
    transition: 400ms ease;

    
    &:hover {
        transform: scale(1.2);
        cursor: pointer;
    }
`


function Profile({ name , img , label }: boxPropsInterface) {

    const { theme } = useContext(ThemeContext);

    return (
        <>
            <div className="col-lg m-0 p-4">
                <Embed style={{ backgroundColor: theme === "light" ? "#f2f4f7" : "#2a2c2e"}}>
                    <img className="round" src={img} width="66%"/>
                    <H6 className="mt-3">{name}</H6>
                    <P>{label}</P>
                    <Icon src={facebookForDark} width="30px"/>
                    <Icon src={instagramForDark} width="30px"/>
                    <Icon src={theme === "light" ? github : githubForDark} width="30px"/>
                </Embed>
            </div>
        </>
    )
}
function ProfilePlaceHolder() {
    return (
        <>
            <div className="col-lg m-0 p-4">
            </div>
        </>
    )
}