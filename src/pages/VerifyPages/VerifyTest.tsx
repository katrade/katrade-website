import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { API } from '../../app.setting.json'
import axios from 'axios';

import { useLocation } from 'react-router';
import {
    AfterSignUp,
    EmailComplete,
    EmailResetPass,
    AfterEmailResetPass,
    ResetPass,
    ResetPassComplete,
    SetUsername
} from '../../components/Verify/Verify';
import Block from '../../components/Block';
import StaticNav from '../../components/StaticNav';
import Footer from '../../components/Footer';
import { verify } from 'crypto';

const queryString = require('query-string');

export function VerifyEmailPending() {
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

export function VerifyEmailSuccess() {
    return (
        <div>
            <StaticNav />
            <Block height="60vh" backgroundColor="#f7fafc" darkBackgroundColor="#141414">
                <div className="d-flex" style={{}}>
                    {/* <AfterSignUp /> */}
                    <EmailComplete />
                    {/* <EmailResetPass/>
                    <AfterEmailResetPass/>
                    <ResetPass/>
                    <ResetPassComplete/> */}
                </div>
            </Block>
            <Footer />
        </div>
    );
}

export function SetUsernamePage() {
    return (
        <div>
            <StaticNav />
            <Block height="60vh" backgroundColor="#f7fafc" darkBackgroundColor="#141414">
                <div className="d-flex" style={{}}>
                    <SetUsername />
                </div>
            </Block>
            <Footer />
        </div>
    );
}

export function Verify() {
    const [isVerified, setIsVerified] = useState(false);
    const { search } = useLocation();
    const { token } = queryString.parse(search);
    const history = useHistory();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }

    }
    useEffect(() => {
        axios.get(`${API}/auth/verify`, config)
            .then(response => {
                if (response.data.message === 'verify') {
                    setIsVerified(true);
                    setTimeout(() => {
                        history.push('/app/signin')
                    }, 2000)
                }
            })
    }, []);
    return (
        <div className="fix-screen-size d-flex justify-content-center align-items-center">
            <p>{isVerified ? 'Complete! We are bringing you back.' : "Verifying your email..."}</p>
        </div>
    )
}