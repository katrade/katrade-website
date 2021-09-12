export default function SignupHead() {
    return (
        <>
            <h4 className="mt-5">Create your Katrade Account</h4>
            <div className="text-end">
                <p>Already member? <a href="/app/signin" className="ml-1 mr-1 blue-font-link">Login</a> here.</p>
            </div>
        </>
    );
}