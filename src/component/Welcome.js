import { Link } from "react-router-dom"

function Welcome() {

    return (
        <div>
            <h2 className="h2-for-main-heading same-font">Welcome to Users Module</h2>
            <br />
            <h3 className="text-center same-font ft-w-200">Existing Users</h3>
            <br />
            <br />
            <Link to="/login"><button className="btn-welcome-page pointer-cursor">Login</button></Link>
            <br />
            <br />
            <h3 className="text-center same-font ft-w-200">New Users</h3>
            <br />
            <br />
            <Link to="/register"><button className="btn-welcome-page pointer-cursor">Register</button></Link>
        </div>
    )
}

export default Welcome