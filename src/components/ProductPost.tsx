export default function ProductPost({onBgClick , photoLink}:any) {
    return (
        // <div className="position-fixed " style={{zIndex:99,top:"0",bottom:"0",right:"0",left:"0"}}>
        //     <div className="product-post-bg position-absolute" onClick={onBgClick} style={{backgroundColor:"rgba(0,0,0,0.8)",top:"0",bottom:"0",right:"0",left:"0"}} />
        //     <div className="product-post-content position-relative bg-dark"  style={{width:"100%",height:"auto",margin:"auto",marginTop:"80px"}}>
        //         <img className="d-block mx-auto" src={photoLink} style={{width:"auto",height:"500px"}}/>
        //     </div>
        // </div>
        <div className="position-fixed" style={{zIndex:99,top:"0",bottom:"0",right:"0",left:"0"}}>
        <div className="product-post-bg position-absolute" onClick={onBgClick} style={{backgroundColor:"rgba(0,0,0,0.8)",top:"0",bottom:"0",right:"0",left:"0"}} />
        <div className="product-post-content position-relative bg-dark"  style={{maxWidth:"500px",height:"auto",margin:"auto",marginTop:"80px"}}>
            <img className="d-block mx-auto" src={photoLink} style={{width:"auto",maxHeight:"500px"}}/>
        </div>
    </div>
    );
}