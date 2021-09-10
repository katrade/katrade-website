import { useState , useRef } from 'react';

function UploadImg() {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [ image, SetImage ] = useState("https://toppng.com/uploads/preview/file-upload-image-icon-115632290507ftgixivqp.png");

    const handleImage = (e:any) => {
        const file = e.target.files;
        const fileURL = URL.createObjectURL(file[0]);
        SetImage(fileURL);
    }
    return (
        <div>
            <form action="">
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImage} style={{display:"none"}}/>
                {/* <button>Upload Image</button> */}
                <img src={image} style={{width:"150px",height:"150px",cursor:"pointer"}}
                onClick={() => {
                    fileInputRef.current?.click();
                }}
                ></img>
                <p>Picture</p>
                <button onClick={() => {
                    SetImage("https://toppng.com/uploads/preview/file-upload-image-icon-115632290507ftgixivqp.png");
                }}>delete</button>
            </form>
        </div>
    );
}



export default UploadImg;