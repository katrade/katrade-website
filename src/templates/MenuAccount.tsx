import { useState } from 'react';

import '../pages/AccountPages/Account.css'

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Block from '../components/Block';
import Accountbar from "../components/Account/Accountbar";
import AccountMenu from "../components/Account/AccountMenu";

interface propsInterface {
    children: JSX.Element | JSX.Element[] | never[] | null | undefined;
}

function MenuAccount({ children }: propsInterface) {

    const [mobile, setMobile] = useState(false);

    window.addEventListener("resize", resize);

    function resize() {
        console.log(window.innerWidth)
        if (window.innerWidth < 600) {
            if (mobile) {
                return
            }
            return setMobile(true) 
        }
        else {
            if (!mobile) {
                return
            }
            return setMobile(false)
        }
    }

    if (mobile) {
        return <MobileMenuAccount />
    }

    return (
        <>
            <Navbar />
                <Block height="50" backgroundColor="#f7fafc">
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

function MobileMenuAccount({ children }: propsInterface) {
    return (
        <>
            <Navbar />
                <Block height="50" backgroundColor="#f7fafc">
                    <div>
                        <div>
                            <Accountbar />

                            <div className="area">
                                <div className="menu-area-mobile">
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

export default MenuAccount;