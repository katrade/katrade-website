import { useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Block from '../components/Block';
import ProductPost from '../components/ProductPost';

import { BsStarFill } from "react-icons/bs";
import { SolidButton , TransparentButton } from '../components/standard/Button';

function Product() {

    const requireTag = "ใส่ค่าตัวแปร";

    const photoLink = {
        namePhoto:"Katom ทรงพลัง",
        link:["https://www.aljazeera.com/wp-content/uploads/2021/08/2021-08-27T152656Z_298019127_RC2KMA70M1Q8_RTRMADP_3_SOCCER-ENGLAND-MUN-RONALDO.jpg?resize=1200%2C630",
        "https://static.posttoday.com/media/content/2017/07/28/812D33C6776043039F06467A946D474B.jpg",   
        ],
    }

    console.log(typeof(photoLink.link))

    const [selectPhoto , setSelectPhoto] = useState(null);

    function clickPhoto(photoLink:any) {
        setSelectPhoto(photoLink);
    }

    function closePhoto() {
        setSelectPhoto(null);
    }

    let photoPost = null;
    if (!!selectPhoto) {
        photoPost = <ProductPost onBgClick={closePhoto} photoLink={photoLink.link} />
    }

    return (
        <div>
            {photoPost}
            <Navbar />
            <Block height="auto" backgroundColor="#f7fafc">
                <div className="py-3 px-5 my-3 bg-white">
                    <div className="d-flex justify-content-between flex-wrap">
                        {/* <div className="bg-info" style={{width:"40%",minWidth:"250px"}}> */}
                        <div className="py-3" style={{width:"38%"}}>
                            <div className="mb-3 d-flex justify-content-center" style={{height:"auto"}}>
                                <div style={{width:"350px",height:"auto",backgroundColor:"#F1F1F1",padding:"30px 10px"}}>
                                    <img className="my-auto" src="https://static.posttoday.com/media/content/2017/07/28/812D33C6776043039F06467A946D474B.jpg" style={{width:"100%",height:"170px",cursor:"zoom-in"}} onClick={() => {clickPhoto(photoLink)}}/>
                                </div>
                            </div>
                            <div className="">
                                <div className="d-flex align-items-center justify-content-center" style={{width:"auto",height:"100px",backgroundColor:"gray"}}>
                                    <h4>พื้นที่ใส่สไลด์รูปภาพ</h4>
                                </div>
                            </div>
                        </div>

                        {/* <div className="bg-white" style={{width:"60%",minWidth:"450px"}}> */}
                        <div className="bg-white" style={{width:"60%"}}>
                            <h4 className="m-0">Katom</h4>
                            <div className="d-flex align-items-center">
                                <BsStarFill />
                                <p className="m-0 mx-2">24019</p>
                                <p className="m-0">Favorites</p>
                            </div>
                            <div className="d-flex mt-3 border border-secondary rounded-3">
                                <p className="m-0 rounded-left px-4 fw-bold" style={{color:"white",backgroundColor:"#F66464"}}>Require</p>
                                {requireTag}
                            </div>
                            <div className="mt-2 p-2 border border-secondary rounded-3">
                                <p className="mb-1 fw-bold" style={{color:"black"}}>Requirement Deatail</p>
                                <p className="m-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus animi ducimus pariatur deleniti, atque numquam a quaerat accusamus sequi asperiores quo ex.</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-around mt-3" style={{backgroundColor:"#F1F1F1"}}>
                                <img className="rounded-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" style={{width:"70px",height:"70px"}}/>
                                <div>
                                    <p className="m-0 fs-3 fw-bold" style={{color:"black"}}>Franky</p>
                                    <p className="m-0" style={{color:"black"}}>2 Follow</p>
                                </div>
                                <div className="d-block">
                                    <TransparentButton width="80px" height="30px" buttonColor="blue" padding="0" margin="10px 0">Chat</TransparentButton>
                                    <TransparentButton width="80px" height="30px" buttonColor="blue" padding="0" margin="10px 0">Follow</TransparentButton>
                                </div>
                            </div>
                            <div className="d-flex flew-wrap justify-content-around mt-3">
                                <SolidButton width="132px" fontSize="24px" buttonColor="red" padding="5px" margin="0">Add to Favorite</SolidButton>
                                <SolidButton width="132px" fontSize="24px" buttonColor="limegreen" padding="5px" margin="0">Request Trading</SolidButton>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="d-flex mt-3 border border-secondary rounded-3">
                            <p className="m-0 rounded-left px-4 fw-bold" style={{color:"white",backgroundColor:"#64B9F6"}}>Category</p>
                            {requireTag}
                        </div>
                        <div className="mt-3 p-3 border border-secondary rounded-3">
                            <p className="mb-1 fw-bold fs-3" style={{color:"black"}}>Details</p>
                            <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque eveniet molestias recusandae? Asperiores, suscipit voluptatem molestiae mollitia dolor odit perspiciatis corrupti perferendis dolores sequi unde pariatur magni numquam quaerat porro non natus hic nulla impedit. Culpa error cupiditate eveniet, recusandae unde placeat ducimus soluta? Est quam voluptatibus ad dicta praesentium facilis eaque autem nam. Sit deleniti, illo quia voluptate cupiditate a aliquam molestiae harum commodi distinctio dolorem dicta nesciunt recusandae vero labore necessitatibus qui, tempore veritatis maxime maiores optio quam ad? Tenetur, nobis laborum molestiae perferendis nesciunt itaque quidem nemo quis minus facere quas ipsum sint, explicabo incidunt. Accusamus distinctio eaque, repellendus voluptate, quidem fugit at odit ut a recusandae esse officiis sunt laudantium magnam exercitationem veritatis nisi sapiente obcaecati! Accusantium reiciendis veritatis praesentium vel, adipisci ducimus obcaecati quo optio modi accusamus tempora nisi, ratione aut repellat eos blanditiis ipsa odit placeat est magnam voluptates voluptatibus! Unde cupiditate praesentium autem deserunt tenetur blanditiis nihil sapiente, repellat consequuntur possimus voluptatum eaque dolor totam a voluptatem? Quasi voluptatem illum quisquam consectetur commodi, maxime dolorum labore repudiandae, ab deserunt rem itaque officia? Numquam, ad maxime totam a ducimus eum ipsam omnis dolores quam quis dignissimos rerum, facilis harum ea mollitia voluptatum consectetur est quod eligendi porro temporibus inventore. Iste tempora placeat minima explicabo numquam illo quam voluptate magnam perspiciatis nobis ad deserunt accusamus architecto esse consectetur obcaecati labore aperiam totam minus eaque, commodi corporis voluptatum facilis! Debitis autem blanditiis voluptatem esse ab doloremque praesentium nulla perspiciatis laborum dicta eum reprehenderit, officiis amet fuga sit. Excepturi pariatur vel fugiat doloribus corrupti a mollitia voluptatibus, ratione est vero, fuga provident incidunt neque facilis voluptates! Eligendi, iste amet debitis voluptate, vel voluptatum repudiandae, ea voluptates accusamus ex deserunt nobis totam? Dolor ratione maiores velit quidem omnis illo repellendus esse! Expedita minus architecto dignissimos corrupti, nulla ipsum!</p>
                        </div>
                    </div>
                </div>
            </Block>
            <Footer />
        </div>
    );
}

export default Product;