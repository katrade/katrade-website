import {
    AfterSignUp,
    EmailComplete,
    EmailResetPass,
    AfterEmailResetPass,
    ResetPass,
    ResetPassComplete
} from '../../components/Verify/Verify';
import Block from '../../components/Block';

import StaticNav from '../../components/StaticNav';
import Footer from '../../components/Footer';

export default function VerifyTest() {
    return (
        <div>
            <StaticNav />
            <Block height="60vh" backgroundColor="#f7fafc" darkBackgroundColor="#141414">
                <div className="d-flex" style={{}}>
                    <AfterSignUp />
                    {/* <EmailComplete/>
                    <EmailResetPass/>
                    <AfterEmailResetPass/>
                    <ResetPass/>
                    <ResetPassComplete/> */}
                </div>
            </Block>
            <Footer />
        </div>
    );
}