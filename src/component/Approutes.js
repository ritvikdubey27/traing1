import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Navbar from "./Navbar"
import Welcome from "./Welcome"
import Login from "./Login";
import Register from "./Register";
import LoginSuccess from "./LoginSuccess";
import RegisterSuccess from "./RegisterSuccess";
import Chat from "./Chat";
import Users from "./Users";
import Uploads from "./Uploads";
import Edituser from "./Edituser";
import Share from "./Share";
import Logout from "./Logout";

function MyRoutes() {
    return (
        <>
            <BrowserRouter >
                {/* <Navbar/> */}
                <ToastContainer
                    position="top-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/loginsuccess" element={<LoginSuccess />} />
                    <Route path="/registersuccess" element={<RegisterSuccess />} />
                    <Route path="/navbar" element={<Navbar />}>
                        <Route path="/navbar/loginsuccess" element={<LoginSuccess />} />
                        <Route path="/navbar/chats" element={<Chat />} />
                        <Route path="/navbar/users" element={<Users />} />
                        <Route path="/navbar/uploads" element={<Uploads />} />
                        <Route path="/navbar/editUser/:id" element={<Edituser />} />
                        <Route path="/navbar/share" element={<Share />} />
                    </Route>
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MyRoutes