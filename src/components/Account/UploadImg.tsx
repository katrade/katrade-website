import { useState , useRef } from 'react';
// import { useCookies } from 'react-cookie';
// import useLoading from '../../hooks/useLoading';
// import React , { useContext } from 'react';
// import ImageUploading from 'react-images-uploading';
// import { pictureContext } from '../../pages/AccountPages/AddItem';

export default function UploadImg({positionPic}:any) {

    // const { productPic , setProductPic } = useContext(pictureContext);
    // console.log(productPic);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [ image, SetImage ] = useState("https://via.placeholder.com/120")

    const handleImage = (e:any) => {
        const file = e.target.files[0];
        // productPic.push(file);
        // setProductPic(productPic);
        const fileURL = URL.createObjectURL(file);
        SetImage(fileURL);
    }

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