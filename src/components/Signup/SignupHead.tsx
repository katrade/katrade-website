export default function SignupHead() {
    return (
        <>
            <div className="row m-0 pt-5 pl-3 full-width d-flex">
                    <div 
                        style={{justifyContent: 'flex-end'}} 
                        className="col-8"
                    >
                        <h4>Create your Katrade Account</h4>
                    </div>
                    <div 
                        style={{justifyContent: 'flex-end' , paddingLeft: '180px'}} 
                        className="col-4 mt-4"
                    >
                        <p>Already member? <a href="/app/signin" className="ml-1 mr-1 blue-font-link">Login</a> here.</p>
                    </div>
            </div>
        </>
    );
}