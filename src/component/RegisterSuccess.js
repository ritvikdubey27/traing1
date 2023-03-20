import { Link } from "react-router-dom"

function RegisterSuccess() {
    return (
        <div>
            <h2 className="text-center same-font mt-10">Registration Successful</h2>
            <p className="text-center same-font mb-5">Thank you for your registration</p>
            <Link to="/" className="text-center same-font blue-color">Click to return to home page</Link>
        </div>
    )
}

export default RegisterSuccess