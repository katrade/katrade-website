import "./Accountbar.css";

import profilePic from "../../pics/facebook.png";

const ProfilePic = () => {
  return (
    <>
      <br />
      <div className="">
        <img width="142" height="142" src={profilePic} />
      </div>
      <br />
      <div className="alert-msg">
        <div>*File size: Maximum 1 MB</div>
        <div>*Supported files: JPEG, PNG</div>
      </div>
    </>
  );
};

export default ProfilePic;
