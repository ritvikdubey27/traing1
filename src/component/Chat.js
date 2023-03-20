import axios from 'axios'
import { useEffect, useState } from 'react'

function Chat() {


    var url = process.env.REACT_APP_API_URL;
    var chats = {}

    // to GET all chats
    var [chat, setChat] = useState([]);
    var isCancelled;
    useEffect(() => {
        isCancelled = false;
        axios({
            url: url + "chats",
            method: "get"
        }).then((response) => {
            setChat(response.data);
            refreshMessages();
        }, (error) => {
            console.log(error);
        });
        return () => {
            isCancelled = true;
        }
    }, [])

    var sendMessageData;

    var element = document.getElementById("messageField");
    if (element != null) {
        sendMessageData = element.value;
    }
    else {
        sendMessageData = "Khali message";
    }


    function validate() {
        var message = document.getElementById("messageField").value;
        if (message != "") {
            sendMessage();
            return true
        }
        else {
            alert("Enter  message text");
            return false
        }
    }

    // Getting Sender Name from local storage
    if (window.localStorage.length != 0) {
        chats.sender = JSON.parse(localStorage.getItem("userData")).userName;
    }
    else {
        chats.sender = "";
    }
    // to POST new message
    function sendMessage() {
        console.log("message data", sendMessageData);
        axios({
            url: url + "chats",
            method: "post",
            data: { date: new Date, sender: chats.sender, message: sendMessageData }
        }).then((response) => {
            console.log(response);
            document.getElementById("messageField").value = "";
            setChat(response.data);
            //window.location.reload();
        }, (error) => {
            console.log(error);
        })
    }

    // for refreshing chat
    function refreshChat() {
        axios({
            url: url + "chats",
            method: "get"
        }).then((response) => {
            console.log("Refresh me chla");
            setChat(response.data);
        }, (error) => {
            console.log(error);
        })
    }


    function refreshMessages() {
        if (!isCancelled) {
            axios({
                url: url + "chats",
                method: "get"
            }).then((response) => {
                setChat(response.data);
                setTimeout(() => { refreshMessages() }, 1000);
            }, (error) => {
                console.log(error);
            })
        }
    }

    return (
        <>
            <div className="chat-page-container1">
                <h6 className="same-font mt-auto ml-47 pd-5 text-center ft-w-l">Group Chat</h6>
                <button className="btn-cross">X</button>
            </div>
            <div className="chat-page-container2 h-auto">
                {chat.map((e, index) => {
                    return <p key={index} className="ft-w-l same-font fl ml-10 mt-neg-10">[{e.date}] {e.sender} : {e.message}</p>
                })}
            </div>
            <div className="chat-page-container3">
                <form className="chat-form">
                    {window.localStorage.length != 0 && <label htmlFor="name" className="ft-w-300 same-font mtb-rl-5" id="name">{JSON.parse(localStorage.getItem("userData")).userName} : </label>}
                    <input type="text" name="msg" placeholder="Enter Your Message Here..." className="chat-text-field" id="messageField" />
                    {/* <input type="text" name="msg" placeholder="Enter Your Message Here..." className="chat-text-field" id="message" onChange={getMessage} /> */}
                    <input type="button" value="Send" className="pointer-cursor chat-buttons" onClick={validate} />
                    <input type="button" value="Refresh" className="pointer-cursor chat-buttons" onClick={refreshChat} />
                </form>
            </div>
        </>
    )
}

export default Chat