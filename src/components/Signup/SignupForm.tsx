import { useState } from 'react'
import { useHistory } from 'react-router';
import { SolidButton } from '../../components/standard/Button';
import { useForm } from '../../utils/useForm';
import { useEffect } from 'react';
import { API } from '../../app.setting.json'
import useLoading from '../../hooks/useLoading';
import eye_open from '../../pics/red-eye.png'
import eye_close from '../../pics/hide.png'
interface p {
    pw: number;
    setPw: any
}

export default function SignupForm({ pw, setPw }: p) {
    const history = useHistory();
    const [form, handleForm] = useForm();
    const [show, hide] = useLoading();
    const [showPassword, setShowPassword] = useState(1);
    // const checkSame = async () => {
    //     let result = await fetch(`${API}/user/checkUn?username=${form.username}`).then(res => res.json());
    //     if(result.message === "AU"){
    //         console.log("This username is already in use.")
    //     }
    //     else{
    //         console.log("OK")
    //     }  
    // }

    var read: any = document.getElementById("readTerms");

    document.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            onFormSubmit();
        }
    });

    useEffect(() => {
        // console.log('render');
        // let timeoutid:any = setTimeout(() => {
        //     checkSame();
        // },2000)
        // return () => clearTimeout(timeoutid);
    }, [form.username]);



    const onFormSubmit = async () => {
        let data: any = {
            firstname: form.firstname,
            lastname: form.surname,
            username: form.username,
            password: form.password,
            address: "",
            email: form.email,
            phoneNumber: form.phone,
            profilePic: "",
            verifyEmail: 0,
        }
        if(data.firstname != null && data.lastname != null && data.email != null && data.password != null && data.phoneNumber != null) {
            if (read.checked == false) {
                alert("please confirm terms of service.") 
            }
            else {
                show("Creating you account...")
                let result: any = await fetch(`${API}/auth/signup`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(data)
                }).then(res => res.json());

                console.clear();
                console.log(result);

                hide();
                if (result.message === "Please check your email to verify") {
                    // alert("Your account has been created, please check your email inbox and visit the verification link.")
                    history.push(`/app/verify/pending?email=${form.email}&firstname=${form.firstname}&lastname=${form.surname}`)
                }
                else {
                    alert("Error");
                }
            }
        }
        else {
            alert("please confirm all of your information.") 
        }
    }

    return (
        <>
            <div className="bgColor-white mb-5 py-3 round-window" style={{ padding: "0 4%" }}>
                <div className="row">
                    <div className="col-lg mb-3">
                        <p className="mb-1">Firstname</p>
                        <input
                            className="input-register"
                            type="text"
                            placeholder="Please enter your firstname."
                            name="firstname"
                            value={form.firstname || ""}
                            onChange={handleForm}
                        />
                    </div>
                    <div className="col-lg mb-3">
                        <p className="mb-1">Surname</p>
                        <input
                            className="input-register"
                            type="text"
                            placeholder="Please enter your surname."
                            name="surname"
                            value={form.surname || ""}
                            onChange={handleForm}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg mb-3">
                        <p className="mb-1">Email</p>
                        <input
                            className="input-register"
                            type="text"
                            placeholder="Please enter your e-mail."
                            name="email"
                            value={form.email || ""}
                            onChange={handleForm}
                        />
                    </div>
                    <div className="col-lg mb-3">
                        <p className="mb-1">Password</p>
                        <div className="input-container">
                            <input
                                value={form.password || ""}
                                onChange={handleForm}
                                name="password"
                                className="input-none" type={showPassword === 1 ? "password" : "text"}
                                placeholder="Your password">
                            </input>
                            <img src={showPassword === 1 ? eye_open : eye_close} width="20" onClick={() => setShowPassword(showPassword * -1)} className="pointer" />
                        </div>
                        {pw === 1 ? null : <p>*password must be contained with 8-16 characters</p>}
                    </div>
                </div>
                <div className="row">
                    
                    <div className="col-lg mb-3">
                        <p className="mb-1">Phone number</p>
                        <input
                            className="input-register"
                            type="text"
                            placeholder="Please enter your phone number."
                            name="phone"
                            value={form.phone || ""}
                            onChange={handleForm}
                        />
                    </div>
                    <div className="col-lg mb-3">
                        
                    </div>
                </div>
                
                <div className="text-center">
                    <br />
                    <label className="mx-2"><input id="readTerms" value="confirmTerms" className="mr-2" type="checkbox" />Accept the Terms of Service.</label>
                    <a href="/articles/termsofservice" target="_blank" className="blue-font-link mx-1">learn more</a>
                    <br />
                    <SolidButton type="button" className="mybutton-grey pl-5 pr-5 mt-3" margin="0 auto" onClick={onFormSubmit}>Sign up</SolidButton>
                </div>
                <br /><br />
            </div>
            <br /><br />
        </>
    );
}