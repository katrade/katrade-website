import { useState , useRef } from 'react';

function UploadImg({positionPic}:any) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    // const [ image, SetImage ] = useState("https://toppng.com/uploads/preview/file-upload-image-icon-115632290507ftgixivqp.png");
    const [ image, SetImage ] = useState("https://via.placeholder.com/120")

    const handleImage = (e:any) => {
        const file = e.target.files;
        const fileURL = URL.createObjectURL(file[0]);
        SetImage(fileURL);
    }
    return (
        <div className="">
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImage} style={{display:"none"}}/>
            <img src={image} style={{width:"120px",height:"120px",cursor:"pointer"}}
            onClick={() => {
                fileInputRef.current?.click();
            }}
            ></img>
            <p className="d-flex justify-content-center mb-0 mt-2">{positionPic}</p>
            {/* <button onClick={() => {
                SetImage("https://toppng.com/uploads/preview/file-upload-image-icon-115632290507ftgixivqp.png");
            }}>delete</button> */}
        </div>
    );
}



export default UploadImg;