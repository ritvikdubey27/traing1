function LoginSuccess() {
    if (localStorage.getItem("userData"))
        return (
            <div>
                <h2 className="h2-for-main-heading">Login Successful</h2>
                <p className="text-center mt-5 ft-w-l ft-cambria"><span className="ft-w-500 same-font">Welcome !</span>{JSON.parse(localStorage.getItem("userData")).userEmail}</p>
            </div>
        )
}

export default LoginSuccess