import { useEffect, useState } from 'react';
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
import Div from '../standard/Div';
import InputValidation from "../InputValidation";



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
    const [cookies, setCookie, removeCookies] = useCookies(['DaveTheHornyDuck']);
    const [validType, setValidType] = useState("0")
    const [showAlert1, setShowAlert1] = useState("0")
    const [showAlert2, setShowAlert2] = useState("0")

    // document.addEventListener("keydown", function(event) {
    //     if (event.keyCode === 13) {
    //         document.getElementById("signin")?.click();
    //     }
    // });

    const onFormSubmit = async (e: any) => { // แก้ submit ให้เป็น tag form   
        e.preventDefault();  
        const _email = form.email;
        const _password = form.password;
        if ((_email != null && _password != null) && (_email != "" && _password != "")) {
            signIn(_email, _password);
        }
        else {
            setValidType("empty");
            if (_email == null) {
                setShowAlert1("1")
            }
            if (_password == null) {
                setShowAlert2("1")
            }
            if (_email != null) {
                setShowAlert1("0")
            }
            if (_password != null) {
                setShowAlert2("0")
            }
        }
    }

    async function signIn(_email: string, _password: string) {
        show();
        await axios.post(`${API}/auth/signin`, {
            email: form.email,
            password: form.password
        }, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            
            if (res.data.verifyEmail === true) {
                setCookie('DaveTheHornyDuck', res.data.DaveTheHornyDuck);
                axios.get(`${API}/auth/getUserData`, {
                    headers: {
                        'Authorization': `Bearer ${res.data.DaveTheHornyDuck}`
                    }
                })
                    .then(async (res2) => {
                        window.localStorage.setItem("uimg", res2.data.data.profilePic);
                        window.localStorage.setItem("uid", res2.data.data._id);
                        hide();
                        history.push("/app/market");
                    })
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
            // alert("You email or password is wrong.");
            // window.location.reload();
            history.push(`/app/signin`)
            setValidType("wrong")
            setShowAlert1("1")
            setShowAlert2("1")
        })
    }

    useEffect(() => {
        if (form.email != null && form.email != "") {
            setShowAlert1("0")
        }
        if (form.email == "") {
            setValidType("empty")
            setShowAlert1("1")
        }
        if (form.password != null && form.password != "") {
            setShowAlert2("0")
        }
        if (form.password == "") {
            setValidType("empty")
            setShowAlert2("1")
        }
    }, [form.email, form.password])

    return (
        <>
            <div className="bgColor-white mx-2 mb-5 round-window py-5">
                <div className="text-center pt-4">
                    <Icon src={logo} width="200px" onClick={() => history.push(`/`)} />
                </div>
                <br />
                <form onSubmit={onFormSubmit}>
                    <div className="d-flex justify-content-center">
                        <div style={{ width: "90%", maxWidth: "500px" }}>
                            <p>Email or username</p>
                            <div>
                                <input
                                    className={"input-register w-100 px-2"}
                                    value={form.email}
                                    name="email"
                                    onChange={handleForm}
                                    type="text"
                                    placeholder="Enter your email or username"
                                />
                                <InputValidation valid={validType} name="Email or Username" showMes={showAlert1} />
                            </div>
                            <br />
                            <p className="mt-2">Password</p>
                            <div className="input-container">
                                <input
                                    value={form.password}
                                    onChange={handleForm}
                                    name="password"
                                    className="input-none px-2" type={showPassword === 1 ? "password" : "text"}
                                    placeholder="Your password">
                                </input>
                                <img src={showPassword === 1 ? eye_open : eye_close} width="20" onClick={() => setShowPassword(showPassword * -1)} className="pointer" />
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <InputValidation valid={validType} name="Password" showMes={showAlert2} />
                                    {/* <label className="ml-1">
                                        <input className="mr-2" type="checkbox" />
                                        Remember me
                                    </label> */}
                                </div>
                                <div className="col text-end p-0">
                                    <a className="blue-font-link" href={`/app/forgotpassword`} target="_blank">Forgot Password?</a>
                                </div>
                            </div>
                            <div className="text-center mb-5">
                                <input id="signin" type="submit" className="mybutton-grey pl-5 pr-5 mt-3" value="Sign in" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignInForm;