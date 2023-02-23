import { TransparentButton } from "../../components/standard/Button";
import ImageUploading, { ImageListType } from "react-images-uploading";
import useAuthorization from "../../hooks/useAuthorization";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useLoading from "../../hooks/useLoading";
import axios from "axios";
import { API } from "../../app.setting";
import { useHistory } from "react-router";
import { DynamicSolidButton } from "../standard/Button";
import { uploadProfilePic } from "../../utils/storage";
import { profile } from "console";
import Div from "../standard/Div";
import P from "../standard/P";
import { H4 } from "../standard/H";
import Input from "../standard/Input";

export default function AccountComp(data: any) {
  const accountData = data.data;
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>(accountData.lastname);
  const { changeProfile } = useAuthorization();
  useEffect(() => {
    if (data.data.email) {
      setFirstname(data.data.firstname);
      setLastname(data.data.lastname);
    }
  }, [data]);

  return (
    <div>
      <Div
        dynamicPair={["#fff", "#212121"]}
        className="row mx-auto mb-4 p-3"
        style={{ width: "100%" }}
      >
        {/* ส่วนของรูปโปรไฟล์ */}
        <div className="col-md-4 order-md-2 text-center">
          <div className="d-flex justify-content-center mt-2 mb-3">
            <div
              style={{
                backgroundImage: accountData.profilePic
                  ? `url(${accountData.profilePic})`
                  : `url(https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minWidth: "150px",
                minHeight: "150px",
                borderRadius: "50%",
              }}
            ></div>
          </div>
          <UploadProfilePic id={accountData._id} />
          <P className="m-0 ">file size: Maximum 1 MB</P>
          <P className="m-0">supported files: .JPEG, .PNG</P>
        </div>

        {/* ส่วนของข้อมูล */}
        <div className="col-md-8 order-md-1">
          <H4 className="mb-4">Profile</H4>
          <div
            className="row"
            style={{ width: "100%", height: "38px", margin: "0 0 8px 0" }}
          >
            <P className="col-md-3 ps-0">Username</P>
            <P className="col-md-8 ps-0">{accountData.username}</P>
          </div>
          <div className="row mb-2" style={{ width: "100%" }}>
            <P className="col-md-3">Firstname</P>
            <Input
              type="text"
              className="col-md-8 form-control rounded-3 mx-3"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="row mb-2" style={{ width: "100%" }}>
            <P className="col-md-3">Lastname</P>
            <Input
              type="text"
              className="col-md-8 form-control rounded-3 mx-3"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <H4 className="mb-3 mt-4">Contact</H4>
          <div className="row" style={{ width: "100%" }}>
            <P className="col-md-3">Email</P>
            <P className="col-md-8">{accountData.email}</P>
          </div>
          <div className="row mb-4" style={{ width: "100%" }}>
            <P className="col-md-3">Mobile</P>
            <div className="col-md-8">
              <P>{accountData.phoneNumber}</P>
            </div>
          </div>
          <div className="row mb-3" style={{ width: "100%" }}>
            <div className="offset-lg-3">
              <button
                type="button"
                onClick={() =>
                  changeProfile({ firstname: firstname, lastname: lastname })
                }
                className="btn btn-success px-2 mx-1"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Div>
    </div>
  );
}

interface IUpload {
  id: any;
}
function UploadProfilePic({ id }: IUpload) {
  const [cookies] = useCookies(["DaveTheHornyDuck"]);
  const [show, hide] = useLoading();
  const history = useHistory();

  async function handleFileUpload(e: any) {
    show("Uploading");
    const profileUrl = await uploadProfilePic(e.target.files, id).catch(
      (err) => {
        alert(err);
      }
    );
    if (!profileUrl) {
      window.location.reload();
    }
    const body = {
      profilePic: profileUrl,
    };
    axios({
      method: "post",
      url: `${API}/user/updateProfilePic`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.DaveTheHornyDuck}`,
      },
    })
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (response) {
        alert("Can not update profile picture.");
        hide();
      });
  }
  return (
    <div className="d-flex justify-content-center align-items-center">
      <input
        type="file"
        accept="image/jpg"
        onChange={handleFileUpload}
        id="img"
        style={{ display: "none" }}
      ></input>
      <label
        htmlFor="img"
        className="pointer d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#3086ff",
          padding: "0 20px",
          color: "#fff",
          margin: "10px 0",
          borderRadius: "5px",
          height: "40px",
          maxWidth: "200px",
        }}
      >
        Upload image
      </label>
    </div>
  );
}
