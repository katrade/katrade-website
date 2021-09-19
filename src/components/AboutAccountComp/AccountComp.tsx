import { TransparentButton } from '../../components/standard/Button';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import useAuthorization from '../../hooks/useAuthorization';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import useLoading from '../../hooks/useLoading';
import axios from 'axios';
import { API } from '../../app.setting.json'
import { DynamicSolidButton } from '../standard/Button';

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
    }, [data])

    return (
        <div>
            <div className="bg-white row mx-auto mb-4" style={{ width: "100%" }}>

                {/* ส่วนของรูปโปรไฟล์ */}
                <div className="col-md-4 order-md-2 p-3 text-center">
                    <div className="d-flex justify-content-center mt-2 mb-3">
                        <div style={{
                            backgroundImage: accountData.profilePic ? `url(${accountData.profilePic})` : `url(https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg)`, backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            minWidth: '150px',
                            minHeight: '150px',
                            borderRadius: '50%'
                        }}></div>
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
                        <p className="col-md-8" style={{ color: "black" }}>{accountData.username}</p>
                    </div>
                    <div className="row" style={{ width: "100%" }}>
                        <p className="col-md-3">Firstname</p>
                        <input
                            type="text"
                            className="col-md-8 form-control border border-secondary rounded-3 mx-3"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="row" style={{ width: "100%" }}>
                        <p className="col-md-3">Lastname</p>
                        <input
                            type="text"
                            className="col-md-8 form-control border border-secondary rounded-3 mx-3"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <h4 className="mb-3 mt-4">Contact</h4>
                    <div className="row" style={{ width: "100%" }}>
                        <p className="col-md-3">Email</p>
                        <p className="col-md-8" style={{ color: "black" }}>{accountData.email}</p>
                    </div>
                    <div className="row" style={{ width: "100%" }}>
                        <p className="col-md-3">Mobile</p>
                        <div className="col-md-8">
                            <p style={{ color: "black" }}>{accountData.phoneNumber}</p>
                            <button type="button" onClick={() => changeProfile({ firstname: firstname, lastname: lastname })} className="btn btn-success">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UploadProfilePic() {
    const [cookies] = useCookies(['DaveTheHornyDuck']);
    const [show, hide] = useLoading();
    function handleFileUpload(e: any) {
        show("Uploading");
        const bodyFormData = new FormData();
        const imagedata = e.target.files[0];
        bodyFormData.append('file', imagedata);
        if (!imagedata.type.includes('image/')) {
            alert("File type not supported");
            return hide();
        }
        axios({
            method: "post",
            url: `${API}/user/updateProfilePic`,
            data: bodyFormData,
            headers:
            {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${cookies.DaveTheHornyDuck}`
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
                alert('Can not update profile picture.')
                hide();
            });
    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <input type="file" accept="image/jpg" onChange={handleFileUpload} id="img" style={{ display: "none" }}></input>
            <label htmlFor="img" className="pointer d-flex justify-content-center align-items-center" style={{
                backgroundColor: "#3086ff",
                padding: "0 20px",
                color: "#fff",
                margin: "10px 0",
                borderRadius: "5px",
                height: "40px",
                maxWidth: "200px"
            }}>
                Upload image
            </label>
        </div>
    )
}
