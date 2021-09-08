import { AfterSignUp , 
    EmailComplete , 
    EmailResetPass , 
    AfterEmailResetPass ,
    ResetPass ,
    ResetPassComplete } from '../../components/Verify/Verify'
import Block from '../../components/Block';

import StaticNav from '../../components/StaticNav'


export default function VerifyTest() {
    return (
        <div>
            <StaticNav/>
            <Block height="90vh" backgroundColor="#f7fafc">
                <div className="d-flex" style={{}}>
                    <AfterSignUp/>
                    {/* <EmailComplete/>
                    <EmailResetPass/>
                    <AfterEmailResetPass/>
                    <ResetPass/>
                    <ResetPassComplete/> */}
                </div>
            </Block>
        </div>
    );
}