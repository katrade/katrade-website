export default function ProductPost({ onBgClick, photoLink }: any) {
  return (
    <div
      className="d-flex position-fixed"
      style={{ zIndex: 99, top: "0", bottom: "0", right: "0", left: "0" }}
    >
      <div
        className="product-post-bg position-absolute"
        onClick={onBgClick}
        style={{
          backgroundColor: "rgba(0,0,0,0.8)",
          top: "0",
          bottom: "0",
          right: "0",
          left: "0",
        }}
      />
      {/* <div className="product-post-content position-relative bg-info" onClick={onBgClick} style={{maxWidth:"700px",height:"auto",margin:"auto",marginTop:"80px"}}> */}
      <img
        className="d-block mx-auto my-auto position-relative bg-white"
        src={photoLink}
        style={{
          maxWidth: "700px",
          width: "100%",
          maxHeight: "500px",
          backgroundColor: "878787",
          marginTop: "100px",
        }}
      />
      {/* </div> */}
    </div>
  );
}
