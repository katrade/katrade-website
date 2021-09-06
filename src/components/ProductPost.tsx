export default function ProductPost({onBgClick , photoLink}:any) {

    // const link = photoLink.map((link:string , index:any) => {
    //     return <img src={link} style={{width:"100px",height:"100px"}}/>
    //     // return <p>{link}</p>
    // })

    // console.log(typeof(photoLink[0]))

    return (
        <div className="position-fixed " style={{zIndex:30,top:"0",bottom:"0",right:"0",left:"0"}}>
            <div className="product-post-bg position-absolute" onClick={onBgClick} style={{backgroundColor:"rgba(0,0,0,0.8)",top:"0",bottom:"0",right:"0",left:"0"}} />
                <div className="product-post-content position-relative bg-dark"  style={{maxWidth:"800px",height:"auto",margin:"auto",marginTop:"50px"}}>
                    <img className="d-block" src="https://www.aljazeera.com/wp-content/uploads/2021/08/2021-08-27T152656Z_298019127_RC2KMA70M1Q8_RTRMADP_3_SOCCER-ENGLAND-MUN-RONALDO.jpg?resize=1200%2C630" style={{maxWidth:"100%",maxHeight:"calc(100vh-300px)"}}/>
                    {/* <div className="d-flex justify-content-around mt-3">
                        {link}
                    </div> */}
                </div>
            
        </div>
    );
}