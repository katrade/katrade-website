import { useState , useEffect} from 'react';

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
    // resize();
    function resize() {

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

    useEffect(() => {
        resize();
    }, [])

    if (mobile) {
        return <MobileMenuAccount children={children} />
    }

    return (
        <>
            <Navbar />
                <Block height="50" backgroundColor="#f7fafc">
                    <div>
                        <div>
                            <Accountbar />
                            <div className="d-flex">
                                <div style={{minWidth:"180px"}}>
                                    <AccountMenu />
                                </div>
                                <div style={{width:"100%"}}>
                                    {children}
                                </div>
                            </div>
                        </div>
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
                            <div style={{height:"auto"}}>
                                {children}
                            </div>
                        </div>
                    </div>
                </Block>
            <Footer/>
        </>
    );
}

export default MenuAccount;