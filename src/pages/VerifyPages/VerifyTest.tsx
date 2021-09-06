import { AfterSignUp , 
    EmailComplete , 
    EmailResetPass , 
    AfterEmailResetPass ,
    ResetPass ,
    ResetPassComplete } from '../../components/Verify/Verify'
import Block from '../../components/Block';

import Logo from '../../pics/logo_dark_green.png';

export default function VerifyTest() {
    return (
        <div>
            <Block height="100vh">
                <div className="pt-4" style={{}} ><img style={{width:"200px"}} src={Logo} /></div>
                <div className="d-flex" style={{}}>
                    <AfterSignUp/>
                    <EmailComplete/>
                    <EmailResetPass/>
                    <AfterEmailResetPass/>
                    <ResetPass/>
                    <ResetPassComplete/>
                </div>
            </Block>
        </div>
    );
}