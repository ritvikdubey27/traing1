import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from 'react'

function Edituser() {


    var url = process.env.REACT_APP_API_URL;
    // to GET and set the name of selected user
    var user = ""
    var params = useParams()
    var userId = params.id;
    useEffect(() => {
        axios({
            url: url + "users/" + userId,
            method: "get"
        }).then((response) => {
            console.log(response.data)
            document.getElementById("name").value = response.data.userName;
            document.getElementById("email").value = response.data.userEmail;
        }, (error) => {
            console.log(error)
        })
    }, [])

    var navigate = useNavigate()
    var user = {}
    function getName(e) {
        user.name = e.target.value
        var sm = document.getElementById("nameError")
        var message = ""
        sm.textContent = message
    }
    function getEmail(e) {
        user.email = e.target.value
        var sm = document.getElementById("emailError")
        var message = ""
        sm.textContent = message
    }
    function validate() {
        var name = document.getElementById("name").value
        var email = document.getElementById("email").value
        var sm1 = document.getElementById("nameError")
        var sm2 = document.getElementById("emailError")
        if (name != "") {
            if (email != "") {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (re.test(email)) {
                    editUserProcess()
                    return true
                }
                else {
                    var message = "Enter valid e-mail"
                    sm2.textContent = message
                    return false
                }
            }
            if (email == "") {
                var message = "Enter Email"
                sm2.textContent = message
                return false
            }
        }
        if (name == "" && email == "") {
            var message = "Enter Name"
            sm1.textContent = message

            var message = "Enter Email"
            sm2.textContent = message
            return false
        }
        if (email == "") {
            var message = "Enter Email"
            sm2.textContent = message
            return false
        }
        if (name == "") {
            var message = "Enter Name"
            sm1.textContent = message
            return false
        }
    }


    // to UPDATE user information
    function editUserProcess() {
        axios({
            url: url + "users/" + userId,
            method: "put",
            data: {
                userName: user.name,
                userEmail: user.email
            }
        }).then((response) => {
            console.log(response)
            navigate("/navbar/users")
        }, (error) => {
            console.log("Error: ", error)
        })
    }

    return (
        <div className="container-edit-user">
            <h2 className="h2-for-main-heading">Edit User Information</h2>
            <form >
                <table cellSpacing="0" cellPadding="3" className="table-login-edit">
                    <tbody>
                        <tr>
                            <td><label htmlFor="name" className="same-font ft-w-300 fl-rt mt-20">Full Name</label></td>
                            <td><input type="text" name="name" placeholder="Enter Full Name" className="w-200 h-30 mt-20 ml-10 br-5 br-bl" id="name" onChange={getName} /></td>
                        </tr>
                        <tr><td></td><td><small id="nameError"></small></td></tr>
                        <tr>
                            <td><label htmlFor="email" className="same-font ft-w-300 fl-rt mt-20">Email</label></td>
                            <td><input type="text" name="email" placeholder="Enter Email" className="w-200 h-30 mt-20 ml-10 br-5 br-bl" id="email" onChange={getEmail} /></td>
                        </tr>
                        <tr><td></td><td><small id="emailError"></small></td></tr>
                        <tr>
                            <td></td>
                            <td colSpan="2"><input type="button" value="Save" className="btn-login-reg-page pointer-cursor" onClick={validate} /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Edituser