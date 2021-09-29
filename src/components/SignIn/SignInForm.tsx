import { useState } from 'react';
import { useForm } from '../../utils/useForm';
import { useHistory } from 'react-router-dom';
import logo from '../../pics/logo_dark_green.png';
import Icon from '../../components/Icon';
import axios from 'axios';

import eye_open from '../../pics/red-eye.png'
import eye_close from '../../pics/hide.png'
import { API } from '../../app.setting.json'
import useLoading from '../../hooks/useLoading';
import { useCookies } from 'react-cookie';



// const eye1: string = "https://cdn.discordapp.com/attachments/858916776029323274/863822479667363851/image0.jpg"
// const eye2: string = "https://media.discordapp.net/attachments/858916776029323274/863825153997799435/image0.jpg?width=273&height=485"

// interface paramsInterface {
//     lang: string
// }


const SignInForm = () => {
    const [showPassword, setShowPassword] = useState<number>(1);
    const history = useHistory();
    const [form, handleForm] = useForm();
    const [show, hide] = useLoading();
    const [cookie, setCookie, removeCookies] = useCookies(['DaveTheHornyDuck']);
    
    document.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            onFormSubmit();
        }
    });

    const onFormSubmit = async () => { // แก้ submit ให้เป็น tag form
        show("We're bringing you in");
        // console.log(form.email, form.password);
        await axios.post(`${API}/auth/signin`, {
            email: form.email,
            password: form.password
        }, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            hide()
            // console.log(res.data)
            if (res.data.verifyEmail === true) {
                setCookie('DaveTheHornyDuck', res.data.DaveTheHornyDuck, {path: '/' , sameSite: 'none' , secure: true});
                history.push("/app/market");
            }
            else {
                axios.get(`${API}/auth/resendVerifyEmail`, {
                    headers: {
                        'Authorization': `Bearer ${res.data.DaveTheHornyDuck}`
                    }
                })
                alert('We have resend the verification link to your email.')
            }
        }).catch(() => {
            hide()
            alert("You email or password is wrong.");
        })
    }

    return (
        <>
            <div className="bgColor-white mx-2 mb-5 round-window py-5">
                <div className="text-center pt-4">
                    <Icon src={logo} width="200px" onClick={() => history.push(`/`)} />
                </div>
                <br />
                <div>
                    <div className="d-flex justify-content-center">
                        <div style={{ width: "90%", maxWidth: "500px" }}>
                            <p>Email or username</p>
                            <input
                                className={"input-register w-100 px-2"}
                                value={form.email || ""}
                                name="email"
                                onChange={handleForm}
                                type="text"
                                placeholder="Enter your email or username"
                            />
                            <br />
                            <p className="mt-2">Password</p>
                            <div className="input-container">
                                <input
                                    value={form.password || ""}
                                    onChange={handleForm}
                                    name="password"
                                    className="input-none px-2" type={showPassword === 1 ? "password" : "text"}
                                    placeholder="Your password">
                                </input>
                                <img src={showPassword === 1 ? eye_open : eye_close} width="20" onClick={() => setShowPassword(showPassword * -1)} className="pointer" />
                            </div>
                            <div className="row mt-2">
                                <div className="col m-0 p-0">
                                    <label className="ml-1">
                                        <input className="mr-2" type="checkbox" />
                                        Remember me
                                    </label>
                                </div>
                                <div className="col text-end p-0">
                                    <label className="blue-font-link" >Forgot Password?</label>
                                </div>
                            </div>
                            <div className="text-center mb-5">
                                <input type="submit" onClick={onFormSubmit} className="mybutton-grey pl-5 pr-5 mt-3" value="Sign in" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignInForm;