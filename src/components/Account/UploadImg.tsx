import { useState , useRef } from 'react';

function UploadImg({positionPic}:any) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [ image, SetImage ] = useState("https://via.placeholder.com/120")

    const handleImage = (e:any) => {
        console.log(e);
        const file = e.target.files;
        console.log(file)
        const fileURL = URL.createObjectURL(file[0]);
        SetImage(fileURL);
    }
    console.log(image);
    return (
        <div className="">
            <input type="file" ref={fileInputRef} name={positionPic == "Cover Picture"? "CoverImage" : "image"} accept="image/*" onChange={handleImage} style={{display:"none"}}/>
            <img src={image} style={{width:"120px",height:"120px",cursor:"pointer"}}
            onClick={() => {
                fileInputRef.current?.click();
            }}
            ></img>
            <p className="d-flex justify-content-center mb-0 mt-2">{positionPic}</p>
        </div>
    );
}

export default UploadImg;