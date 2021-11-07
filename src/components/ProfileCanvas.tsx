import { useContext } from 'react'
import { ThemeContext } from '../contexts/Theme';
import { useHistory } from "react-router";
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
    background-image: url(https://cdn.discordapp.com/attachments/858916776029323274/864017674770317352/NFT2.gif);
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

                            <Profile
                                name="Chalanthorn Aenguthaivadt"
                                img="https://scontent.fbkk5-8.fna.fbcdn.net/v/t1.6435-9/253219901_1789702971228362_837928978607209626_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeFbmyqS1MtREMPTlxrGFu6q4Ejp1dybaIjgSOnV3JtoiOcZTIwe-jaErffuoX5RwtHpLDt4jfjYHoGeEMlB--IR&_nc_ohc=p2E5-0UsEH4AX93ZAqO&_nc_ht=scontent.fbkk5-8.fna&oh=1f80435ca5977885c3746e1a2ae666d4&oe=61AC701E"
                                label="Developer"
                                fb="https://www.facebook.com/chalantorn.aenguthaivadt.1/"
                                ig="https://www.instagram.com/palm_aenguthaivadt/"
                                git="https://github.com/ChalanthornA"
                            />
                            <Profile
                                name="Chonchanat Tubtiang"
                                img="https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.15752-9/254072032_939577723315500_659662443586134755_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=ae9488&_nc_ohc=f8B8cfU22SkAX9kfIJ7&tn=xAJSmbmbiInJf8Zt&_nc_ht=scontent.fbkk5-1.fna&oh=20b50a153d5de331d8bdccaff02553d6&oe=61A8FFDA"
                                label="Developer"
                                fb="https://www.facebook.com/profile.php?id=100005067424673"
                                ig="https://www.instagram.com/p.chonchanat/"
                                git="https://github.com/chonchanat"
                            />
                            <Profile
                                name="Nutchanon Chantrasup"
                                img="https://cdn.discordapp.com/attachments/866358992674619432/906207987381723176/IMG_1563.png"
                                label="Developer"
                                fb="https://www.facebook.com/beammnc"
                                ig="https://www.instagram.com/beamuuuu/"
                                git="https://github.com/nutchanonc"
                            />
                            <Profile
                                name="Napasin Saengthong"
                                img="https://scontent.fbkk22-7.fna.fbcdn.net/v/t1.6435-1/p320x320/211360014_1169341693598638_9088511854271659223_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=7206a8&_nc_ohc=Xik1In3bKPYAX95YLCw&_nc_pt=1&_nc_ht=scontent.fbkk22-7.fna&oh=c166aded6597ed677ad3805c6d8e0c9e&oe=61AB9DB4"
                                label="Developer"
                                fb="https://www.facebook.com/FranKydeSU/"
                                ig="https://www.instagram.com/franky_desu/"
                                git="https://github.com/FranKydeSU"
                            />
                            <Profile
                                name="Pokpong Noppakhun"
                                img="https://avatars.githubusercontent.com/u/74798166?v=4"
                                label="Developer"
                                fb="https://www.facebook.com/dave.noppakhun/"
                                ig="https://www.instagram.com/dave_pokpong/"
                                git="https://github.com/davepokpong"
                            />
                            <Profile
                                name="Sorrawich Supmee"
                                img="https://cdn.discordapp.com/attachments/866358992674619432/906221221664948234/bond.jpg"
                                label="Developer"
                                fb="https://www.facebook.com/bonsupmee"
                                ig="https://www.instagram.com/ryuoh_bon"
                                git="https://github.com/RyuohNagito" />
                            <Profile
                                name="Jirat Wangman"
                                img="https://cdn.discordapp.com/attachments/866358992674619432/906220282249879592/20211105_233529.jpg"
                                label="Developer"
                                fb="https://www.facebook.com/jirat.wangman/"
                                ig="https://www.instagram.com/aimsomer/"
                                git="https://github.com/aimsomer"
                            />
                            <Profile
                                name="Nathawat Mianlamai"
                                img="https://media-exp1.licdn.com/dms/image/C4D03AQG_YJOMg3Qsxw/profile-displayphoto-shrink_800_800/0/1634955182523?e=1641427200&v=beta&t=fD_ymvGmY289G_kGrFtGuT6iixq9CO2jRz7OWxoQvMU"
                                label="Developer"
                                fb="https://www.facebook.com/nat.mianlamai"
                                ig="https://www.instagram.com/nathawat.m/"
                                git="https://github.com/nathawat1008"
                            />
                            <Profile
                                name="Nik Kunraho Struyf"
                                img="https://media-exp1.licdn.com/dms/image/C4E03AQEOAM6lyBcSzg/profile-displayphoto-shrink_800_800/0/1635187633392?e=1641427200&v=beta&t=NMwerfrSuQZxmME1UdZO_0rg8iVUSZF4F8_he8TGu0Q"
                                label="UX/UI Designer"
                                fb="https://www.facebook.com/profile.php?id=100011701389794"
                                ig="https://www.instagram.com/nik.nks/"
                                git="https://github.com/nikstruyf"
                            />
                            <Profile
                                name="Pandin Lailert"
                                img="https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.15752-9/253497211_281035580516264_1313280695369541646_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=C986ba_Qe6wAX8QoZ_w&_nc_oc=AQma3rimx5UU_deeCmrAe1Taxnc2oFnt3WMThZln4KvWtNpLPZ6cEkxalgxpu9AzwhoPVXP-P10YmLug_H3RM0DU&_nc_ht=scontent.fbkk22-3.fna&oh=a2e3560fcf70ef42dc95a0a36e53f3f0&oe=61AA8CF6"
                                label="UX/UI Designer"
                                fb="https://www.facebook.com/PandinFalcon"
                                ig="https://www.instagram.com/dandinlion/"
                                git="https://github.com/DanCPE"
                            />
                            <Profile
                                name="Passawit Sungtoop"
                                img="https://cdn.discordapp.com/attachments/866358992674619432/906217792615890954/245505696_4496868017072643_4714610721154475658_n.jpg"
                                label="Product Analyst"
                                fb="https://www.facebook.com/profile.php?id=100002484674760"
                                ig="https://www.instagram.com/ryupunipuni/"
                                git="https://github.com/PassawitRyu"
                            />
                            <Profile
                                name="Teeratat Pisarnsint"
                                img="https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.15752-9/253575660_690041568636108_3490688804313451652_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=ae9488&_nc_ohc=WTc1EN6yRUIAX8dl-Mr&tn=gA4ckqsxHkq0wYE1&_nc_ht=scontent.fbkk22-1.fna&oh=ffb7e924052e6fce65d2cea80a0cca37&oe=61A966A4"
                                label="Product Analyst"
                                fb="https://www.facebook.com/teeratat.pisarnsint/"
                                ig="https://www.instagram.com/mteeratat/"
                                git="https://github.com/mteeratat"
                            />
                            <Profile
                                name="Thanaphol Ovatvoravarunyou"
                                img="https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.6435-9/80799169_3280701942001249_1449720250319765504_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=1RLJAOMbUasAX9EuBB9&tn=SMhMyTwwCtzMROpY&_nc_ht=scontent.fbkk29-1.fna&oh=31cfc01609a50ef45ac77d223b05ae65&oe=61A9D1C4"
                                label="Product Analyst"
                                fb="https://www.facebook.com/thanapol.ovatvoravarunyou/"
                                ig="https://www.instagram.com/s_thanaphol_/"
                                git="https://github.com/s-thanaphol"
                            />

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
    fb?: string
    ig?: string
    git?: string
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


function Profile({ name, img, label, fb, ig, git }: boxPropsInterface) {

    const { theme } = useContext(ThemeContext);
    const history = useHistory();

    return (
        <>
            <div className="col-lg m-0 p-4 d-flex">
                <Embed style={{ backgroundColor: theme === "light" ? "#f2f4f7" : "#2a2c2e" }}>
                    <div className="d-flex justify-content-center">
                        <div style={{
                            minWidth: "131px",
                            minHeight: "131px",
                            maxWidth: "131px",
                            maxHeight: "131px",
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: "50%",
                            backgroundPosition: "center",
                            cursor: "pointer"
                        }}></div>
                    </div>
                    <H6 className="mt-3">{name}</H6>
                    <P>{label}</P>
                    <Icon src={facebookForDark} onClick={() => window.location.href = `${fb}`} width="30px" />
                    <Icon src={instagramForDark} onClick={() => window.location.href = `${ig}`} width="30px" />
                    <Icon src={theme === "light" ? github : githubForDark} onClick={() => window.location.href = `${git}`} width="30px" />
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