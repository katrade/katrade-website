import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Recommend from '../components/Recommend';
import Block from '../components/Block';


function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export default function Search() {

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

    // สร้างตัวอย่างมาโชว์ Search page
    const rec_item = id_item.map((item, index) => {
        return <Recommend item={item} key={index} />;
    });
    
    return (
        <div>
            <Navbar />
            <Block  height="200" backgroundColor="#f7fafc">
                <div className="my-4">
                    <h5 className="mb-3">Search "Something".</h5>
                    <div className="d-flex justify-content-between full-width">
                        <div className="d-flex justify-content-between flex-wrap">
                            {rec_item.slice(0, 50)}
                        </div>
                    </div>
                </div>
            </Block>

            <Footer />
        </div>
    );
}