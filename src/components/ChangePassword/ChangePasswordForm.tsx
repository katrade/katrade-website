import "./ChangePasswordForm.css";

const ChangePasswordForm = () => {
  return (
    <>
      <div className="container-white">
        <div className="row mb-3">
          <h5>Change Password</h5>
        </div>
        <div className="row mb-0">
          <div className="col-3">
            <span>Current Password</span>
          </div>
          <div className="col-9">
            <input
              className="input-register"
              type="password"
              placeholder=" Enter current password."
            />
            <br />
            <a href="">Forgot Password?</a>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-3">
            <span>New Password</span>
          </div>
          <div className="col-9">
            <input
              className="input-register"
              type="password"
              placeholder=" Enter new password."
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-3">
            <span>Corfirm New Password</span>
          </div>
          <div className="col-9">
            <input
              className="input-register"
              type="password"
              placeholder=" Confirm new password."
            />
            <br />
            <button className="mybutton mt-4 px-5">Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForm;
