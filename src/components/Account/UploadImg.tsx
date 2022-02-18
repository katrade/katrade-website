import { useState, useRef } from "react";

export default function UploadImg({ positionPic }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, SetImage] = useState("https://via.placeholder.com/120");

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    SetImage(fileURL);
  };

  return (
    <div className="">
      <input
        type="file"
        ref={fileInputRef}
        name={positionPic == "Cover Picture" ? "CoverImage" : "image"}
        accept="image/*"
        onChange={handleImage}
        style={{ display: "none" }}
      />
      <img
        src={image}
        style={{ width: "120px", height: "120px", cursor: "pointer" }}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      ></img>
      <p className="d-flex justify-content-center mb-0 mt-2">{positionPic}</p>
    </div>
  );
}
