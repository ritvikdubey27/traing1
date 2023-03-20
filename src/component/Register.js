import { useNavigate } from "react-router-dom"
import axios from 'axios'

function Register() {

    var url = process.env.REACT_APP_API_URL;
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
    function getPassword(e) {
        user.password = e.target.value
        var sm = document.getElementById("passwordError")
        var message = ""
        sm.textContent = message
    }
    function getConfirmPassword(e) {
        user.confrimPassword = e.target.value
        var sm = document.getElementById("confirmPassword")
        var message = ""
        sm.textContent = message
    }
    function emptyAll() {
        document.getElementById("name").value = ""
        document.getElementById("email").value = ""
        document.getElementById("password").value = ""
        document.getElementById("confirmPassword").value = ""
    }

    // form Validation
    var navigate = useNavigate()
    function validate() {
        var name = document.getElementById("name").value
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var confirmPassword = document.getElementById("confirmPassword").value
        var sm1 = document.getElementById("nameError")
        var sm2 = document.getElementById("emailError")
        var sm3 = document.getElementById("passwordError")
        var sm4 = document.getElementById("confirmError")
        if (name != "") {
            if (email != "") {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (re.test(email)) {
                    if (password != "") {
                        var re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                        if (re.test(password)) {
                            if (confirmPassword != "") {
                                if (confirmPassword == password) {
                                    registerProcess()
                                    return true
                                }
                                else {
                                    var message = "Confirm Password and Password did not match"
                                    sm4.textContent = message
                                    return false
                                }
                            }
                            if (confirmPassword == "") {
                                var message = "Enter Confirm Password andar wala"
                                sm4.textContent = message
                                return false
                            }
                        }
                        else {
                            var message = "Password must have One uppercase, One lowercase, One special character, One numerical and length must be equal or more than 8"
                            sm3.textContent = message
                            return false
                        }
                    }
                    if (password == "") {
                        var message = "Enter Password"
                        sm3.textContent = message
                        return false
                    }
                }
                if (name == "" && password == "") {
                    var message = "Enter Email"
                    sm2.textContent = message

                    var message = "Enter Password"
                    sm3.textContent = message
                    return false
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
        if (name == "" && email == "" && password == "" && confirmPassword == "") {
            var message = "Enter Name"
            sm1.textContent = message

            var message = "Enter Email"
            sm2.textContent = message

            var message = "Enter Password"
            sm3.textContent = message

            var message = "Enter Confirm Password"
            sm4.textContent = message
            return false
        }
        if (email == "") {

            var message = "Enter Email"
            sm2.textContent = message

            var message = "Enter Password"
            sm3.textContent = message
            return false
        }
    }

    // to POST new user
    function registerProcess() {
        axios({
            url: url + "users",
            method: "post",
            data: { userName: user.name, userEmail: user.email, userPassword: user.password }
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
                emptyAll()
            }
            else {
                console.log(response)
                navigate("/registersuccess")
            }

        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div >
            <h2 className="h2-for-main-heading">Register</h2>
            <table cellSpacing="0" cellPadding="3" className="table-reg">
                <tbody>
                    <tr>
                        <td><label htmlFor="name" className="same-font ft-w-300 fl-rt mt-20">Full Name</label></td>
                        <td><input type="text" name="name" placeholder="Enter Name" className="w-200 h-30 mt-20 ml-10 br-5 br-bl" id="name" onChange={getName} /></td>
                    </tr>
                    <tr><td></td><td><small id="nameError"></small></td></tr>
                    <tr>
                        <td><label htmlFor="email" className="same-font ft-w-300 fl-rt mt-20">Email</label></td>
                        <td><input type="text" name="email" placeholder="Enter Email" className="w-200 h-30 mt-20 ml-10 br-5 br-bl" id="email" onChange={getEmail} /></td>
                    </tr>
                    <tr><td></td><td><small id="emailError"></small></td></tr>
                    <tr>
                        <td><label htmlFor="password" className="same-font ft-w-300 fl-rt mt-20">Password</label></td>
                        <td><input type="password" name="password" placeholder="Enter Password" className="w-200 h-30 mt-20 ml-10 br-5 br-bl" id="password" onChange={getPassword} /></td>                </tr>
                    <tr><td></td><td><small id="passwordError"></small></td></tr>
                    <tr>
                        <td><label htmlFor="password" className="same-font ft-w-300 fl-rt mt-20">Confirm Password</label></td>
                        <td><input type="password" name="password" placeholder="Confirm Password" className="w-200 h-30 mt-20 ml-10 br-5 br-bl" id="confirmPassword" onChange={getConfirmPassword} /></td>
                    </tr>
                    <tr><td></td><td><small id="confirmError"></small></td></tr>
                    <tr>
                        <td></td>
                        <td colSpan="2"><input type="button" value="Register" className="btn-login-reg-page" onClick={validate} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Register