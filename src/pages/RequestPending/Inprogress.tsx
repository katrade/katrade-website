import Block from '../../components/Block'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Inprogress() {
    return(
        <div>
            <Navbar/>
                <Block height="auto">
                    <div className="row">
                        <div className="col-lg bg-dark">
                            <p>Hello</p>
                        </div>
                    </div>
                </Block>
            <Footer/>
        </div>
    );
}

// export default Inprogress();