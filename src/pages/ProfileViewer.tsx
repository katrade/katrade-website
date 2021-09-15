import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Block from '../components/Block';
import Recommend from '../components/Recommend';

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export default function ProfileViewer() {
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
    ]

    // สร้างตัวอย่างมาโชว์ Inventory
    const inventory_item = id_item.map((item, index) => {
        return <Recommend item={item} key={index} />;
    });

    return (
        <div>
            <Navbar />
            <Block height="auto" backgroundColor="#f7fafc">
                <div className="container-profile">
                    <div className="container-profile-data p-3">
                        <div className="row ">
                            <div className="col-lg  text-center justify-content-center align-self-center">
                                <img 
                                    src="https://data.whicdn.com/images/349884984/original.jpg" 
                                    style={{width:"250px",borderRadius:"50%"}}
                                />
                            </div>
                            <div className="col-lg ">
                                <div className="row ">
                                    <span>Username</span><h4>FranKydeSU</h4>
                                </div>
                                <div className="row "><span>
                                    Firstname</span><h4>Napasin</h4>
                                </div>
                                <div className="row ">
                                    <span>Following</span><h4>9999</h4>
                                </div>
                            </div>
                            <div className="col-lg  align-self-end">
                                <div className="row">
                                    <span>Surname</span><h4>Saengmunjaa</h4>
                                </div>
                                <div className="row ">
                                    <span>Followers</span><h4>9999</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <h5 className="mb-3">Inventory</h5>
                    <hr></hr>
                    <div className="full-width">
                        <div>
                            <div className="d-flex justify-content-around flex-wrap">
                                {inventory_item.length <= 10 ? inventory_item : inventory_item.slice(0, 10)}
                            </div>    
                        </div>
                    </div>
                </div>
            </Block>
            <Footer />
        </div>
    )
}
