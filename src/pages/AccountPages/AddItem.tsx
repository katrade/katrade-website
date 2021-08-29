import './AddItem.css';

import Block from '../../components/Block';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AddItem() {
    return (
        <>
            <Navbar />
                <Block height="200px" backgroundColor="rgb(244,244,252)">
                    <div className="container-additem">
                        <h4>Add New Item</h4>
                    </div>
                </Block>
            <Footer />
        </>
    );
}