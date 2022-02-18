import { useState } from "react";
import { useHistory } from "react-router";
import { SolidButton, SubmitButton } from "../../components/standard/Button";
import { useForm } from "../../utils/useForm";
import { useEffect } from "react";
import { API } from "../../app.setting.json";
import useLoading from "../../hooks/useLoading";
import eye_open from "../../pics/red-eye.png";
import eye_close from "../../pics/hide.png";
import InputValidation from "../InputValidation";

interface p {
  pw: number;
  setPw: any;
}

export default function SignupForm({ pw, setPw }: p) {
  const history = useHistory();
  const [form, handleForm] = useForm();
  const [show, hide] = useLoading();
  const [showPassword, setShowPassword] = useState(1);
  const [validType, setValidType] = useState("0");
  const [showAlert1, setShowAlert1] = useState("0");
  const [showAlert2, setShowAlert2] = useState("0");
  const [showAlert3, setShowAlert3] = useState("0");
  const [showAlert4, setShowAlert4] = useState("0");
  const [showAlert5, setShowAlert5] = useState("0");

  var read: any = document.getElementById("readTerms");

  useEffect(() => {}, [form.username]);

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
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
    };
    // console.log(data.email.includes("@ku"));
    if (
      data.firstname != null &&
      data.lastname != null &&
      data.email != null &&
      data.password != null &&
      data.phoneNumber != null
    ) {
      if (read.checked == false) {
        alert("please confirm terms of service.");
      } else if (
        !(data.email.includes("@ku.") || data.email.includes("@live.ku."))
      ) {
        alert("Please use KU account email.");
      } else {
        show("Creating you account...");
        let result: any = await fetch(`${API}/auth/signup`, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data),
        }).then((res) => res.json());

        console.clear();

        hide();
        if (result.message === "Please check your email to verify") {
          // alert("Your account has been created, please check your email inbox and visit the verification link.")
          history.push(
            `/app/verify/pending?email=${form.email}&firstname=${form.firstname}&lastname=${form.surname}`
          );
        } else {
          // alert("Error");
          setValidType("alreadyused");
          setShowAlert3("1");
        }
      }
    } else {
      // alert("please confirm all of your information.")
      setValidType("empty");
      if (data.firstname == null) {
        setShowAlert1("1");
      }
      if (data.lastname == null) {
        setShowAlert2("1");
      }
      if (data.email == null) {
        setShowAlert3("1");
      }
      if (data.password == null) {
        setShowAlert4("1");
      }
      if (data.phoneNumber == null) {
        setShowAlert5("1");
      }
      if (data.firstname != null) {
        setShowAlert1("0");
      }
      if (data.lastname != null) {
        setShowAlert2("0");
      }
      if (data.email != null) {
        setShowAlert3("0");
      }
      if (data.password != null) {
        setShowAlert4("0");
      }
      if (data.phoneNumber != null) {
        setShowAlert5("0");
      }
    }
  };

  useEffect(() => {
    if (form.firstname == "") {
      setShowAlert1("1");
      setValidType("empty");
    }
    if (form.surname == "") {
      setShowAlert2("1");
      setValidType("empty");
    }
    if (form.email == "") {
      setShowAlert3("1");
      setValidType("empty");
    }
    if (form.password == "") {
      setShowAlert4("1");
      setValidType("empty");
    }
    if (form.phone == "") {
      setShowAlert5("1");
      setValidType("empty");
    }
    if (form.firstname != null && form.firstname != "") {
      setShowAlert1("0");
    }
    if (form.surname != null && form.surname != "") {
      setShowAlert2("0");
    }
    if (form.email != null && form.email != "") {
      setShowAlert3("0");
    }
    if (form.password != null && form.password != "") {
      setShowAlert4("0");
    }
    if (form.phone != null && form.phone != "") {
      setShowAlert5("0");
    }
  }, [form.firstname, form.surname, form.email, form.password, form.phone]);

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <div
          className="bgColor-white mb-5 py-3 round-window"
          style={{ padding: "0 4%" }}
        >
          <div className="row">
            <div className="col-lg mb-3">
              <p className="mb-1">Firstname</p>
              <input
                className="input-register"
                type="text"
                placeholder="Please enter your firstname."
                name="firstname"
                value={form.firstname}
                onChange={handleForm}
              />
              <InputValidation
                valid={validType}
                name="firstname"
                showMes={showAlert1}
              />
            </div>
            <div className="col-lg mb-3">
              <p className="mb-1">Surname</p>
              <input
                className="input-register"
                type="text"
                placeholder="Please enter your surname."
                name="surname"
                value={form.surname}
                onChange={handleForm}
              />
              <InputValidation
                valid={validType}
                name="surname"
                showMes={showAlert2}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg mb-3">
              <p className="mb-1">Email</p>
              <input
                className="input-register"
                type="email"
                placeholder="Please enter your e-mail."
                name="email"
                value={form.email}
                onChange={handleForm}
              />
              <InputValidation
                valid={validType}
                name="email"
                showMes={showAlert3}
              />
            </div>
            <div className="col-lg mb-3">
              <p className="mb-1">Password</p>
              <div className="input-container">
                <input
                  value={form.password}
                  onChange={handleForm}
                  name="password"
                  className="input-none"
                  type={showPassword === 1 ? "password" : "text"}
                  placeholder="Your password"
                ></input>
                <img
                  src={showPassword === 1 ? eye_open : eye_close}
                  width="20"
                  onClick={() => setShowPassword(showPassword * -1)}
                  className="pointer"
                />
              </div>
              {pw === 1 ? null : (
                <p>*password must be contained with 8-16 characters</p>
              )}
              <InputValidation
                valid={validType}
                name="password"
                showMes={showAlert4}
              />
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
                value={form.phone}
                onChange={handleForm}
              />
              <InputValidation
                valid={validType}
                name="phone number"
                showMes={showAlert5}
              />
            </div>
            <div className="col-lg mb-3"></div>
          </div>

          <div className="text-center">
            <br />
            <label className="mx-2">
              <input
                id="readTerms"
                value="confirmTerms"
                className="mr-2"
                type="checkbox"
              />
              Accept the Terms of Service.
            </label>
            <a
              href="/articles/termsofservice"
              target="_blank"
              className="blue-font-link mx-1"
            >
              learn more
            </a>
            <br />
            <SubmitButton
              type="submit"
              className="mybutton-grey pl-5 pr-5 mt-3"
              margin="0 auto"
              value="Sign up"
            ></SubmitButton>
          </div>
          <br />
          <br />
        </div>
        <br />
        <br />
      </form>
    </>
  );
}
