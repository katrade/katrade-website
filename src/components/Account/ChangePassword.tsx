import React from "react";

import "./ChangePassword.css";

export default function ChangePassword() {
    return (
        <div className="container-changepassword">
            <h4>Change Password</h4>
            <div className="changepassword-current">
                <h6 >Current Password</h6>
                <input type="text" placeholder="Enter your current password."></input>
                <a href="/" ><p>Forget Password?</p></a>

                <div className="clear"></div>

                <h6 >New Password</h6>
                <input type="text" placeholder="Enter your new password."></input>

                <div className="clear"></div>

                <h6 >Confirm New Password</h6>
                <input type="text" placeholder="Confirm your new password."></input>
            </div>
            <input type="submit" className="changepassword-btn" placeholder="save" />
        </div>
    );
}