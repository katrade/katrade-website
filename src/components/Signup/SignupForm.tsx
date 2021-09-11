import { useHistory } from 'react-router';
import { SolidButton } from '../../components/standard/Button';
import { useForm } from '../../utils/useForm';
import { useEffect } from 'react';
import { API } from '../../app.setting.json'

interface p {
    pw: number;
    setPw: any
}

export default function SignupForm({ pw, setPw }: p) {
    const history = useHistory();
    const [form, handleForm] = useForm();

    // const checkSame = async () => {
    //     let result = await fetch(`${API}/user/checkUn?username=${form.username}`).then(res => res.json());
    //     if(result.message === "AU"){
    //         console.log("This username is already in use.")
    //     }
    //     else{
    //         console.log("OK")
    //     }  
    // }

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
        if (result.message === "Please check your email to verify") {
            alert("Your account has been created, please check your email inbox and visit the verification link.")
            history.push(`/app/verify/pending?email=${form.email}&firstname=${form.firstname}&lastname=${form.surname}`)
        }
        else {
            alert("sw");
        }
    }

    return (
        <>
            <div className="bgColor-white mx-4 mb-5 py-3 round-window">
                <div className="row">
                    <div className="col-lg ml-5">
                        <div className="mb-3">
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
                        <div className="mb-3">
                            <p className="mb-1">Username</p>
                            <input
                                className="input-register"
                                type="text"
                                placeholder="Please enter your username."
                                name="username"
                                value={form.username || ""}
                                onChange={handleForm}
                            />
                        </div >
                        <div className="mb-3">
                            <p className="mb-1">Password</p>
                            <input
                                className="input-register"
                                type="password"
                                placeholder="Please enter your password."
                                name="password"
                                value={form.password || ""}
                                onChange={handleForm}
                            />
                            {pw === 1 ? null : <p>*password must be contained with 8-16 characters</p>}
                        </div>
                    </div>
                    <div className="col-lg p-0">
                        <div className="mb-3">
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
                        <div className="mb-3">
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
                        <div className="mb-3">
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
                    </div>
                </div>
                <div className="text-center">
                    <br />
                    <label className="ml-2"><input className="mr-2" type="checkbox" />Accept the Terms of Service.</label>
                    <a href="https://scontent.fbkk2-4.fna.fbcdn.net/v/t1.6435-9/66231507_109603010346815_7721927349360394240_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=8bfeb9&_nc_eui2=AeGWdC-Ytxlk9-gLJKhLseQIaVrAoqfB6ExpWsCip8HoTInKoJ9RqqEYFzRwvTTX0PdkTqHbQQ2TXOqhR4K2vMBU&_nc_ohc=gpZM0V1ED7MAX_f7NWz&_nc_ht=scontent.fbkk2-4.fna&oh=5ed8b35053a8e690a2c31251063ebf02&oe=612692BE" className="blue-font-link ml-1">learn more</a>
                    <br />
                    <SolidButton type="button" className="mybutton-grey pl-5 pr-5 mt-3" margin="0 auto" onClick={onFormSubmit}>Sign up</SolidButton>
                </div>
                <br /><br />
            </div>
            <br /><br />
        </>
    );
}