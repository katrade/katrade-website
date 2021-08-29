
import './Following.css'

import MenuAccount from '../../templates/MenuAccount';

import FollowingBlock from '../../components/Account/FollowingBlock';

export default function Following() {
    
    const following = [
        {
            name: "bon",
            img: "",
        },
        {
            name: "franky",
            img: "",
        },
        {
            name: "bon",
            img: "",
        },
        {
            name: "Nikky พริตตี้เงินล้าน",
            img: "",
        },
        {
            name: "per",
            img: "",
        },
        {
            name: "dave",
            img: "",
        },
        {
            name: "beam",
            img: "",
        },
        {
            name: "ryu",
            img: "",
        },
        {
            name: "palm",
            img: "",
        },
        {
            name: "aim",
            img: "",
        },
        {
            name: "dan",
            img: "",
        },
        {
            name: "M150",
            img: "",
        },
        {
            name: "nat",
            img: "",
        },
    ]

    const following_data = following.map((data, index) => {
        return <FollowingBlock data={data} key={index} />;
    });

    return (
        <>
            <MenuAccount>
                <div className="container-following">
                    <h4>Following</h4>
                    <h5>({following.length})</h5>
                    <p>ยังไม่เสร็จเรียบร้อย รอหน่อยได้มั้ยละ?</p>
                    <div className="following-grid">
                        {following_data}
                    </div>
                </div>
            </MenuAccount>
        </>
    );
}