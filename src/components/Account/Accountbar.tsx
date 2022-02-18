// import { useEffect, useState } from "react";
// import axios from 'axios'
// import { API } from '../../app.setting.json'
import Div from "../standard/Div";
import { H3, H5 } from "../standard/H";
import P from "../standard/P";
import "./Accountbar.css";
// import useLoading from '../../hooks/useLoading';

export default function Profilebar({ accountData, followData }: any) {
  if (followData) {
    return (
      <div className="container-profile">
        <H5>Personal Profile</H5>
        <Div
          className="container-profile-data"
          dynamicPair={["#ffffff", "#212121"]}
        >
          <div className="full-width d-flex justify-content-center align-items-center p-5 flex-wrap">
            <div className="d-flex justify-content-center mt-2 mb-3">
              <div
                style={{
                  backgroundImage: accountData.profilePic
                    ? `url(${accountData.profilePic})`
                    : `url(https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg)`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  minWidth: "130px",
                  minHeight: "130px",
                  borderRadius: "50%",
                  margin: "0px 50px",
                }}
              ></div>
            </div>
            <div>
              <H3>
                {accountData.firstname} {accountData.lastname}
              </H3>
              <P>@{accountData.username}</P>
            </div>
          </div>
          <div className="full-width d-flex justify-content-center align-items-center px-5 mb-3 flex-wrap">
            <Div
              dynamicPair={["#fff", "#171717"]}
              className="d-flex justify-content-center align-items-center followers mx-2 px-5 py-3 my-2"
            >
              <P>{followData.follower.length} followers</P>
            </Div>
            <Div
              dynamicPair={["#fff", "#171717"]}
              className="d-flex justify-content-center align-items-center following mx-2 px-5 py-3 my-2"
            >
              <P>{followData.following.length} following</P>
            </Div>
          </div>
        </Div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

interface labelProps {
  name: string;
  value: string;
}

function Label({ name, value }: labelProps) {
  return (
    <div className="row full-width label">
      <div className="col" style={{ color: "#35db93" }}>
        {name}
      </div>
      <div className="col">{value}</div>
    </div>
  );
}
