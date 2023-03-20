import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/users.css'


function Users() {

    var url = process.env.REACT_APP_API_URL;
    // for getting all users
    var [user, setUser] = useState([])
    useEffect(() => {
        axios({
            url: url + "users",
            method: "get"
        }).then((response) => {
            setUser(response.data)
        }, (error) => {
            console.log(error)
        })
    }, [])
    var getId = ""
    var index = 0
    function setId(id, i) {
        getId = id;
        index = i;
        console.log(user[index].userName)
    }


    // for deleting user from database
    function removeUser() {
        var localUserName = JSON.parse(localStorage.getItem("userData")).userName
        console.log(localUserName)
        if (user[index].userName != localUserName) {
            user.splice(index, 1)
            axios({
                url: url + "users/" + getId,
                method: "delete"
            }).then((response) => {
                setUser([...user])
            }, (error) => {
                console.log(error)
            })
        }
        else {
            alert("Can't Delete logged in user")
        }
    }

    return (
        <div>
            <div className="container-for-table">
                <h2 className="same-font pd-20 fl">Users</h2>
                <table border="1" cellSpacing="0" cellPadding="3" className="w-100per h-auto br-10 br-bl">
                    <tbody>
                        <tr>
                            <th className="th-for-table th-c1">Name</th>
                            <th className="th-for-table th-c2">User Email ID</th>
                            <th className="th-for-table th-c3"></th>
                        </tr>
                        {user.map((e, index) => {
                            return <tr key={index} className="tr2">
                                <td className="td2 td2-c1">{e.userName}</td>
                                <td className="td2">{e.userEmail}</td>
                                <td className="td2"><Link to={"/navbar/editUser/" + e._id} className="for-non-nav-a">Edit</Link> | <a href='delete' className="for-non-nav-a" data-bs-toggle="modal" data-bs-target="#exampleModal" value={e._id} onClick={() => setId(e._id, index)} >Delete</a></td>
                            </tr>
                        })}
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <div className="modal fade modal-design" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirm User Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img src="./../questionMark.jpg" alt="" />
                            <p>Are you sure?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary modal-btn-design" onClick={removeUser} data-bs-dismiss="modal">Ok</button>
                            <button type="button" className="btn btn-secondary modal-btn-design"
                                data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Users