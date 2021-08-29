import '../pages/AccountPages/Account.css'

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Block from '../components/Block';
import Accountbar from "../components/Account/Accountbar";
import AccountMenu from "../components/Account/AccountMenu";

interface propsInterface {
    children: JSX.Element | JSX.Element[] | never[] | null | undefined;
}

export default function Favorite({ children }: propsInterface) {
    return (
        <>
            <Navbar />
                <Block height="200" backgroundColor="#f7fafc">
                    <div>
                        <div>
                            <Accountbar />

                            <div className="area">
                                <div className="menu-area">
                                    <AccountMenu />
                                </div>
                                <div className="information-area">
                                    {children}
                                </div>
                            </div>
                        </div>
                        
                        <div className="clear"></div>
                    </div>
                </Block>
            <Footer/>
        </>
    );
}