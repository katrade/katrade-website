import React from "react";

import './Accountbar.css'

// import profilePic from '../../pics/facebook.png';
import { MdAccountBalance } from "react-icons/md";

const profilePic = "https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"

export default function Profilebar() {

    const account = {
        username: "pornmaster69",
        firstname: "Nik",
        lastname: "Watchporn",
        following: "69",
        followers: "2",
    }

    return (
        <div className="container-profile">
            <h5>Prosonal Profile</h5>
            {/* <div className="container-profile-data">
                <div className="row">
                    <div className="profile-column1">
                        <img width="142" height="142" src={profilePic} />
                    </div>
                    <div className="profile-column2">
                        <br /><br />
                        <p>Username</p>
                        <p>Firstname</p>
                        <p>Following</p>
                    </div>
                    <div className="profile-column3">
                        <br /><br />
                        <h5>{account.username}</h5>
                        <h5>{account.firstname}</h5>
                        <h5>{account.following}</h5>

                    </div>
                    <div className="profile-column4">
                        <br /><br />
                        <p>hidden</p>
                        <p>Lastname</p>
                        <p>Followers</p>
                    </div>
                    <div className="profile-column5">
                        <br /><br />
                        <h5>hidden</h5>
                        <h5>{account.lastname}</h5>
                        <h5>{account.followers}</h5>
                    </div>

                </div>
            </div> */}
            <div className="container-profile-data">
                <div className="full-width d-flex justify-content-center align-items-center p-5 flex-wrap">
                    <img width="142" height="142" src={profilePic} className="mx-5" />
                    <div>
                        <h3 style={{ color: "#4a5659" }}>{account.firstname} {account.lastname}</h3>
                        <p style={{ color: "#86979c" }}>@{account.username}</p>
                    </div>
                </div>
                <div className="full-width d-flex justify-content-center align-items-center px-5 mb-3 flex-wrap">
                    <div className="d-flex justify-content-center align-items-center followers mx-2 px-5 py-3 my-2">
                        <b className="mx-2 number">{account.followers} </b> followers
                    </div>
                    <div className="d-flex justify-content-center align-items-center following mx-2 px-5 py-3 my-2">
                        <b className="mx-2 number">{account.following} </b> following
                    </div>
                </div>
            </div>

        </div>
    );
}

interface labelProps {
    name: string
    value: string
}

function Label({ name, value }: labelProps) {
    return (
        <div className="row full-width label">
            <div className="col" style={{ color: "#35db93" }}>{name}</div>
            <div className="col">{value}</div>
        </div>
    )
}