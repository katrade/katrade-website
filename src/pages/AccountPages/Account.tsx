import { useState, useEffect } from "react";

import MenuAccount from "../../templates/MenuAccount";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import useAuthorization from "../../hooks/useAuthorization";
import { API } from "../../app.setting";
import { TransparentButton } from "../../components/standard/Button";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { ContactSupportOutlined } from "@material-ui/icons";
import axios from "axios";
import useLoading from "../../hooks/useLoading";

interface IAccount {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  address: string;
  email: string;
  phoneNumber: string;
  profilePic: string;
  verifyEmail: number;
  favourite: string;
  followers: string[];
  following: string[];
  inventories: string[];
}

const defaultEmptyAccount: IAccount = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  address: "",
  email: "",
  phoneNumber: "",
  profilePic: "",
  verifyEmail: 0,
  favourite: "",
  followers: [],
  following: [],
  inventories: [],
};

function Account() {
  const [account, setAccount] = useState<IAccount>(defaultEmptyAccount);
  // const [ account , setAccount ] = useState<IAccount>(defaultEmptyAccount);
  const [pic, setPic] = useState([]);
  const { getUserData, updateProfilePic } = useAuthorization();
  const history = useHistory();

  useEffect(() => {
    async function init() {
      var userData = await getUserData();
      if (userData) {
        setAccount(userData);
      } else {
        console.clear();
        history.push("/app/signin");
      }
    }
    init();
  }, []);
  // console.log(account)

  return (
    <div>
      <MenuAccount data={account}>
        <div className="bg-white row mx-auto mb-4" style={{ width: "100%" }}>
          {/* ส่วนของรูปโปรไฟล์ */}
          <div className="col-md-4 order-md-2 p-3 text-center">
            <div className="d-flex justify-content-center mt-2 mb-3">
              <div
                style={{
                  backgroundImage: account.profilePic
                    ? `url(${account.profilePic})`
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
            <UploadProfilePic />
            <p className="m-0 ">file size: Maximum 1 MB</p>
            <p className="m-0">supported files: .JPEG, .PNG</p>
          </div>

          {/* ส่วนของข้อมูล */}
          <div className="col-md-8 order-md-1 p-3">
            <h4 className="mb-4">Profile</h4>
            <div className="row" style={{ width: "100%" }}>
              <p className="col-md-3">Username</p>
              <input
                className="col-md-8 border border-secondary rounded-3 mx-3"
                style={{ color: "black" }}
              >
                {account.username}
              </input>
            </div>
            <div className="row" style={{ width: "100%" }}>
              <p className="col-md-3">Firstname</p>
              <p
                className="col-md-8 border border-secondary rounded-3 mx-3"
                style={{ color: "black" }}
              >
                {account.firstname}
              </p>
            </div>
            <div className="row" style={{ width: "100%" }}>
              <p className="col-md-3">Lastname</p>
              <p
                className="col-md-8 border border-secondary rounded-3 mx-3"
                style={{ color: "black" }}
              >
                {account.lastname}
              </p>
            </div>

            <h4 className="mb-3 mt-4">Contact</h4>
            <div className="row" style={{ width: "100%" }}>
              <p className="col-md-3">Email</p>
              <p
                className="col-md-8 border border-secondary rounded-3 mx-3"
                style={{ color: "black" }}
              >
                {account.email}
              </p>
            </div>
            <div className="row" style={{ width: "100%" }}>
              <p className="col-md-3">Mobile</p>
              <p
                className="col-md-8 border border-secondary rounded-3 mx-3"
                style={{ color: "black" }}
              >
                {account.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </MenuAccount>
    </div>
  );
}

function UploadProfilePic() {
  // const [images, setImages] = useState<ImageListType>([]);
  // const { updateProfilePic } = useAuthorization();
  // const maxNumber = 1;
  // const onChange = (
  //     imageList: ImageListType,
  //     addUpdateIndex: number[] | undefined
  // ) => {
  //     // data for submit
  //     console.log(imageList, addUpdateIndex);
  //     setImages(imageList as never[]);
  // };
  // if (images.length === 1) {
  //     // console.log(images[0].dataURL);
  //     updateProfilePic(images[0].dataURL);
  //     setImages([]);
  // }
  // return (
  //     <ImageUploading
  //         multiple
  //         value={images}
  //         onChange={onChange}
  //         maxNumber={maxNumber}
  //     >
  //         {({
  //             imageList,
  //             onImageUpload,
  //             onImageRemoveAll,
  //             onImageUpdate,
  //             onImageRemove,
  //             isDragging,
  //             dragProps
  //         }) => (
  //             // write your building UI
  //             <TransparentButton onClick={onImageUpload}>Upload image</TransparentButton>
  //             //   <div className="upload__image-wrapper">
  //             //     <button
  //             //       style={isDragging ? { color: "red" } : undefined}
  //             //       onClick={onImageUpload}
  //             //       {...dragProps}
  //             //     >
  //             //       Click or Drop here
  //             //     </button>
  //             //     &nbsp;
  //             //     <button onClick={onImageRemoveAll}>Remove all images</button>
  //             //     {imageList.map((image, index) => (
  //             //       <div key={index} className="image-item">
  //             //         <img src={image.dataURL} alt="" width="100" />
  //             //         <div className="image-item__btn-wrapper">
  //             //           <button onClick={() => onImageUpdate(index)}>Update</button>
  //             //           <button onClick={() => onImageRemove(index)}>Remove</button>
  //             //         </div>
  //             //       </div>
  //             //     ))}
  //             //   </div>
  //         )}
  // //     </ImageUploading>
  // )

  const [cookies] = useCookies(["DaveTheHornyDuck"]);
  const [show, hide] = useLoading();
  function handleFileUpload(e: any) {
    show("Uploading");
    const bodyFormData = new FormData();
    const imagedata = e.target.files[0];
    bodyFormData.append("file", imagedata);
    if (!imagedata.type.includes("image/")) {
      alert("File type not supported");
      return hide();
    }
    axios({
      method: "post",
      url: `${API}/user/updateProfilePic`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies.DaveTheHornyDuck}`,
      },
    })
      .then(function (response) {
        //handle success
        // console.log(response);
        window.location.reload();
      })
      .catch(function (response) {
        //handle error
        // console.log(response);
        alert("Can not update profile picture.");
        hide();
      });
  }
  return (
    <input type="file" accept="image/jpg" onChange={handleFileUpload}></input>
  );
}

export default Account;
