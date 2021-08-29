import React from "react";

import './ProfileContact.css'

import profilePic from '../../pics/facebook.png';


export default function ProfileContact() {

    const account = {
        username: "FranKydeSU",
        firstname: "Napasin",
        lastname: "Saengthong",
        following: "1066",
        followers: "2",
        email: "frankydesu@hotmail.com",
        mobile: "08********",
    }

    return (
            <div className="container-profile-contact">
                <div className="row-profile-contact">
                    <div className="column-proifle">
                        <h5>Profile</h5>
                        <div className="profile-box1">
                            <h5 className="float-tmp1">Username</h5>
                            <h5 className="box-tmp1">{account.username}</h5>
                        </div>
                        <div className="clear"></div>
                        <div className="profile-box2">
                            <h5 className="float-tmp1">lastname</h5>
                            <h5 className="box-tmp1">{account.lastname}</h5>
                        </div>
                        <div className="clear"></div>

                        <h4>Contact</h4>
                        <div className="contact">
                            <h6 >Email Address</h6>
                            <h6 >{account.email}</h6>
                            <a href="/" ><p>change</p></a>
                            <div className="clear"></div>
                            <h6 >Mobile</h6>
                            <h6 >{account.mobile}</h6>
                            <a href="/" ><p>change</p></a>
                        </div>
                        <input className="profile-btn" type="submit" placeholder="Save changes" />
                    </div>
                    <div className="column-picture">
                        <img src={profilePic} />
                        <p>file size: Maximum 1 MB</p>
                        <p>supported files: .JPEG, .PNG</p>
                    </div>

                </div>
            </div>
    );
}