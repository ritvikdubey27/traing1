import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

function Login() {

    var url = process.env.REACT_APP_API_URL;
    var navigate = useNavigate()
    var user = {}
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

    // form Validation
    function validate() {
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var sm2 = document.getElementById("emailError")
        var sm3 = document.getElementById("passwordError")
        if (email != "") {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (re.test(email)) {
                if (password != "") {
                    loginProcess()
                    return true
                }
                else {
                    var message = "Enter Password"
                    sm3.textContent = message
                    return false
                }
            }
            else if (email != "" && password == "") {
                var message = "Enter valid e-mail"
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
        else if (email == "" && password == "") {
            var message = "Enter  e-mail"
            sm2.textContent = message

            var message = "Enter Password"
            sm3.textContent = message
            return false
        }
        else {
            var message = "Enter  e-mail"
            sm2.textContent = message
            return false
        }
    }
    function loginProcess() {
        axios({
            url: url + "users/login",
            method: "post",
            data: { userEmail: user.email, userPassword: user.password }
        }).then((response) => {
            console.log(response.data.user)
            if (response.data.token) {
                var getToken = response.data.token;
                document.cookie = `token=${getToken}; Expires=${2 * 60 * 60};`
                localStorage.setItem("userData", JSON.stringify(response.data.user))
                navigate("/navbar/loginsuccess")
            }
            else {
                alert('invalid password')
            }
        }, (error) => {
            console.log(error)
            alert('Login Failed Try Again')
        })
    }

    return (
        <div>
            <h2 className="h2-for-main-heading">Login</h2>
            <table cellSpacing="0" cellPadding="3" className="table-login-edit">
                <tbody>
                    <tr>
                        <td><label htmlFor="email" className="same-font ft-w-300 fl-rt mt-20">Email</label></td>
                        <td><input type="text" name="email" placeholder="Enter Email" className="w-200 h-30 mt-20 ml-10 br-5 br-bl" id="email" onChange={getEmail} /></td>
                    </tr>
                    <tr><td></td><td><small id="emailError"></small></td></tr>
                    <tr>
                        <td><label htmlFor="password" className="same-font ft-w-300 fl-rt mt-20">Password</label></td>
                        <td><input type="password" name="password" placeholder="Enter Password" className="w-200 h-30 mt-20 ml-10 br-5 br-bl" id="password" onChange={getPassword} /></td>
                        <td><small id="passError"></small></td>
                    </tr>
                    <tr><td></td><td><small id="passwordError"></small></td></tr>
                    <tr>
                        <td></td>
                        <td colSpan="2"><input type="button" value="Login" className="btn-login-reg-page pointer-cursor" onClick={validate} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Login