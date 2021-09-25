//import './EditItem.css';

import Block from '../../components/Block';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function EditItem() {
    return (
        <>
            <Navbar />
                <Block height="200px" backgroundColor="rgb(244,244,252)">
                    <div className="container-edititem">
                        <h4>Edit Item</h4>
                    </div>
                </Block>
            <Footer />
        </>
    );
}