import { Outlet } from "react-router"
import { Link, useNavigate } from "react-router-dom"
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../css/navbar.css'
import { useEffect } from "react"


function Navbar() {

    var navigate = useNavigate()
    useEffect(() => {
        (document.cookie.length > 30) ? console.log() : navigate("/login")
    }, [])


    function logout() {
        document.cookie = `token=null; Expires=${2 * 60 * 60};`
        localStorage.clear()
        navigate("/")
        window.location.reload()
    }

    const url = window.location.pathname
    const ls = url.split("/").pop();

    var chats = "nav-link btn-nav-bar-cust"
    var users = "nav-link btn-nav-bar-cust"
    var uploads = "nav-link btn-nav-bar-cust"
    var log = "nav-link btn-nav-bar-cust"

    if (ls.localeCompare("chats") == 0) {
        chats = "nav-link btn-nav-bar-cust active"
    }
    if (ls.localeCompare("users") == 0 || ls.localeCompare("editUser") == 0) {
        users = "nav-link btn-nav-bar-cust active"
    }
    if (ls.localeCompare("uploads") == 0) {
        uploads = "nav-link btn-nav-bar-cust active"
    }


    return (
        <div >
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item li-nav-bar-cust" role="presentation">
                    <button id="chats" onClick={(() => { navigate("/navbar/chats") })} className={chats}>Chat</button>
                </li>
                <li className="nav-item li-nav-bar-cust" role="presentation">
                    <button id="users" onClick={(() => { navigate("/navbar/users") })} className={users} >Users</button>
                </li>
                <li className="nav-item li-nav-bar-cust" role="presentation">
                    <button id="uploads" onClick={(() => { navigate("/navbar/uploads") })} className={uploads}>Uploads</button>
                </li>
                <li className="nav-item li-nav-bar-cust" role="presentation" onClick={logout}>
                    <button className={log} onClick={logout}>Logout</button>
                </li>
            </ul>


            {/* Nested Routing here */}
            <div>
                <Outlet />
            </div>
        </div >
    )
}

export default Navbar