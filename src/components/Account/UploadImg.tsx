import { useState , useRef } from 'react';
import React from 'react';
import ImageUploading from 'react-images-uploading';

export default function UploadImg({positionPic}:any) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [ image, SetImage ] = useState("https://via.placeholder.com/120")

    const handleImage = (e:any) => {
        const file = e.target.files;
        const fileURL = URL.createObjectURL(file[0]);
        console.log(e.target.files[0]);
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

    // console.log();
    // const [images, setImages] = React.useState([]);
    // const maxNumber = 69;

    // const onChange = (imageList:any, addUpdateIndex:any) => {
    // // data for submit
    // console.log(imageList, addUpdateIndex);
    // setImages(imageList);
    // };

    // return (
    // <div className="App">
    //     <ImageUploading
    //     multiple
    //     value={images}
    //     onChange={onChange}
    //     maxNumber={maxNumber}
    //     dataURLKey="data_url"
    //     >
    //     {({
    //         imageList,
    //         onImageUpload,
    //         onImageRemoveAll,
    //         onImageUpdate,
    //         onImageRemove,
    //         isDragging,
    //         dragProps,
    //     }) => (
    //         // write your building UI
    //         <div className="upload__image-wrapper">
    //         <button
    //             style={isDragging ? { color: 'red' } : undefined}
    //             onClick={onImageUpload}
    //             {...dragProps}
    //         >
    //             Click or Drop here
    //         </button>
    //         &nbsp;
    //         <button onClick={onImageRemoveAll}>Remove all images</button>
    //         {imageList.map((image, index) => (
    //             <div key={index} className="image-item">
    //             <img src={image['data_url']} alt="" width="100" />
    //             <div className="image-item__btn-wrapper">
    //                 <button onClick={() => onImageUpdate(index)}>Update</button>
    //                 <button onClick={() => onImageRemove(index)}>Remove</button>
    //             </div>
    //             </div>
    //         ))}
    //         </div>
    //     )}
    //     </ImageUploading>
    // </div>
    // );
    // }