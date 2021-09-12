import { useState , useEffect} from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Block from '../components/Block';
import Accountbar from "../components/Account/Accountbar";
import AccountMenu from "../components/Account/AccountMenu";

interface propsInterface {
    children: JSX.Element | JSX.Element[] | never[] | null | undefined;
    data?: any
}

function MenuAccount({ children, data }: propsInterface) {

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
        return <MobileMenuAccount children={children} data={data}/>
    }
    return (
        <div>
            <Navbar image={data.profilePic} />
                <Block height="50" backgroundColor="#f7fafc">
                    <div>
                        <div>
                            <Accountbar data={data}/>
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
        </div>
    );
}

function MobileMenuAccount({ children , data}: propsInterface) {
    return (
        <div>
            <Navbar image={data.profilePic}  />
                <Block height="50" backgroundColor="#f7fafc">
                    <div>
                        <div>
                            <Accountbar data={data} />
                            <div style={{height:"auto"}}>
                                {children}
                            </div>
                        </div>
                    </div>
                </Block>
            <Footer/>
        </div>
    );
}

export default MenuAccount;