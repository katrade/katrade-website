// import { useEffect, useState } from "react";
// import axios from 'axios'
// import { API } from '../../app.setting.json'
import './Accountbar.css'
// import useLoading from '../../hooks/useLoading';

export default function Profilebar({ data: account }: any) {
    console.log(account);
    return (
        <div className="container-profile">
            <h5>Prosonal Profile</h5>
            <div className="container-profile-data">
                <div className="full-width d-flex justify-content-center align-items-center p-5 flex-wrap">
                    <img width="142" height="142" src={account.profilePic == "" ? "https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" : account.profilePic } className="mx-5" style={{borderRadius: '50%', boxShadow: '0 0 20px rgba(0,0,0,0.1)'}}/>
                    <div>
                        <h3 style={{ color: "#4a5659" }}>{account.firstname} {account.lastname}</h3>
                        <p style={{ color: "#86979c" }}>@{account.username}</p>
                    </div>
                </div>
                <div className="full-width d-flex justify-content-center align-items-center px-5 mb-3 flex-wrap">
                    <div className="d-flex justify-content-center align-items-center followers mx-2 px-5 py-3 my-2">
                        <b className="mx-2 number">{account.followers.length} </b> followers
                    </div>
                    <div className="d-flex justify-content-center align-items-center following mx-2 px-5 py-3 my-2">
                        <b className="mx-2 number">{account.following.length} </b> following
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