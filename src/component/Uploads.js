import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/uploads.css'
import axios from 'axios'

function Uploads() {

    var url = process.env.REACT_APP_API_URL;
    var uploadsData = {}
    var uploadsDataDb = {}
    var modalClass = "modal modal-design modal-2 modal-design-desc"
    // for getting label name
    function getLabel(e) {
        uploadsDataDb.fileLabel = e.target.value;
        console.log(uploadsDataDb.fileLabel)
    }
    function handleChange(e) {
        uploadsData.file = e.target.files[0]
        console.log(uploadsData.file)
    }

    function validateUpload() {
        document.getElementById("exampleModal-3").style.display = "block";
        var labelUpload = document.getElementById("descriptionUpload").value;
        var fileUpload = document.getElementById("fileUpload").value;
        if (labelUpload != "") {
            if (fileUpload != "") {
                uploadFile()
            }
            else {
                alert("Please Choose File!")
            }
        }
        else {
            alert("Enter Description!")
        }
    }
    function cancelUpload() {
        document.getElementById("exampleModal-3").style.display = "none";
    }

    // for adding file to folder in backend
    function uploadFile(e) {
        const formData = new FormData();
        formData.append('file', uploadsData.file)
        console.log(formData)
        axios({
            url: url + "uploads/fileuploads",
            method: "post",
            data: formData
        }).then((response) => {
            console.log(response.data.path)
            uploadsDataDb.path = response.data.path
            uploadsDataDb.filename = response.data.filename
            // for adding data to database 
            axios({
                url: url + "uploads",
                method: "post",
                data: { label: uploadsDataDb.fileLabel, fileName: uploadsDataDb.filename, filePath: uploadsDataDb.path }
            }).then((response) => {
                document.getElementById("exampleModal-3").style.display = "none";
                console.log(response.data)
                window.location.reload()
            }, (error) => {
                console.log(error)
            })
        }, (error) => {
            console.log(error)
        })
    }

    // for getting all documents uploads
    var [upload, setUpload] = useState([])
    useEffect(() => {
        axios({
            url: url + "uploads",
            method: "get"
        }).then((response) => {
            setUpload(response.data)
        }, (error) => {
            console.log(error)
        })
    }, [])

    // getting and setting id for deleting file from database
    var getId = ""
    var index = 0
    function setId(id, i) {
        getId = id;
        index = i;
    }
    // for deleting file from database
    function removeDoc() {
        upload.splice(index, 1)
        axios({
            url: url + "uploads/" + getId,
            method: "delete"
        }).then((response) => {
            setUpload([...upload])
        }, (error) => {
            console.log(error)
        })
    }

    // Update document
    // setting description in modal for edit using individual id
    var getDescId = ""
    var descIndex = 0
    function setDescId(id, i) {
        getDescId = id;
        descIndex = i;
        axios({
            url: url + "uploads/" + id,
            method: "get"
        }).then((response) => {
            document.getElementById("descriptionUpdate").value = response.data.label;
        }, (error) => {
            console.log(error)
        })
    }
    function validateUpdate() {
        document.getElementById("exampleModal-2").style.display = "block";
        var labelDesc = document.getElementById("descriptionUpdate").value;
        if (labelDesc != "") {
            updateDoc();
        }
        else {
            alert("Enter Description");
        }
    }

    // chnaging and updating file name 
    function updateDoc() {
        uploadsDataDb.fileLabel = document.getElementById("descriptionUpdate").value;
        axios({
            url: url + "uploads/" + getDescId,
            method: "put",
            data: {
                label: uploadsDataDb.fileLabel
            }
        }).then((response) => {
            console.log(response)
            upload[descIndex].label = response.data.label
            document.getElementById("descriptionUpdate").value = ""
            setUpload([...upload])
            document.getElementById("exampleModal-2").style.display = "none";
        }, (error) => {
            console.log(error)
        })
    }
    function cancelUpdate() {
        document.getElementById("exampleModal-2").style.display = "none";
    }

    return (
        <div>
            <div>
                <div className="container-for-table h-auto">
                    <h2 className="same-font ft-w-500 pd-20 fl">My Uploads</h2>
                    <table border="1" cellSpacing="0" cellPadding="3" className="w-100per h-auto br-10 br-bl">
                        <tbody>
                            <tr>
                                <th className="th-for-table th-c1">Label</th>
                                <th className="th-for-table th-c2">File Name</th>
                                <th className="th-for-table th-c3 text-center">Action</th>
                            </tr>
                            {upload.map((e, index) => {
                                return <tr key={index} className="tr2">
                                    <td className="td2 td2-c1">{e.label}</td>
                                    <td className="td2">{e.fileName}</td>
                                    <td className="td2"><a href="" className="for-non-nav-a" data-bs-toggle="modal" data-bs-target="#exampleModal-2" onClick={() => setDescId(e._id, index)}  >Edit</a> | <a href="" className="for-non-nav-a" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setId(e._id, index)} >Delete</a> |
                                        <Link to="/navbar/share" className="td2-a">Share</Link></td>
                                </tr>
                            })}
                            <tr className="tr2">
                                <td className="td2"></td>
                                <td className="td2"></td>
                                <td className="td2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container-for-table h-auto">
                    <h2 className="same-font ft-w-500 pd-20 fl">Shared Uploads</h2>
                    <table border="1" cellSpacing="0" cellPadding="3" className="w-100per h-auto br-10 br-bl">
                        <tbody>
                            <tr>
                                <th className="th-for-table th-c1">Label</th>
                                <th className="th-for-table th-c2">File Name</th>
                                <th className="th-for-table th-c3">Shared by</th>
                            </tr>
                            <tr className="tr2">
                                <td className="td2 td2-c1">Sales team Attendance Sept 2014</td>
                                <td className="td2">Sale-Attend-Sep2014.xls</td>
                                <td className="td2">anne.hunter@mail.com</td>
                            </tr>
                            <tr className="tr2">
                                <td className="td2 td2-c1">Office Rules</td>
                                <td className="td2">OfficeRule.doc</td>
                                <td className="td2">hr@office.com</td>
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
                    <button className="upload-btn" data-bs-toggle="modal" data-bs-target="#exampleModal-3">+ Add Upload</button>
                </div>
            </div>

            {/* //  Modal for delete */}
            <div className="modal fade modal-design" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirm File Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img src="./../questionMark.jpg" alt="" />
                            <p>Are you sure ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary modal-btn-design" data-bs-dismiss="modal" onClick={removeDoc}>Ok</button>
                            <button type="button" className="btn btn-secondary modal-btn-design" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Modal for edit--> */}
            <div className="modal modal-design modal-2 modal-design-desc" id="exampleModal-2" tabIndex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content modal-content-desc">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form >
                            <div className="modal-body modal-body-desc">
                                <label htmlFor="desc" className="label-desc">File Description</label>
                                <input type="text" name="desc" className="input-desc" placeholder="Enter File Description" id="descriptionUpdate" onChange={getLabel} />
                            </div>
                            <div className="modal-footer modal-footer-desc">
                                <input type="button" value="Save" className="btn btn-primary modal-btn-design modal-btn-design-desc" data-bs-dismiss="modal" onClick={validateUpdate} />
                                <button type="button"
                                    className="btn btn-secondary modal-btn-design modal-btn-design-desc modal-btn-design-desc-cancel"
                                    data-bs-dismiss="modal" onClick={cancelUpdate}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <Modal for upload */}
            <div className={modalClass} id="exampleModal-3" tabIndex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content modal-content-upload">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Upload</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body modal-body-upload">
                            <form encType="multipart/form-data">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><label htmlFor="desc" className="label-desc">File Description</label></td>
                                            <td><input type="text" name="desc" className="upload-file-desc"
                                                placeholder="Enter File Description" id="descriptionUpload" onChange={getLabel} /></td>
                                        </tr>
                                        <tr>
                                            <td><label htmlFor="desc" className="label-desc">File Upload</label></td>
                                            <td><input type="file" name="upload" id="fileUpload" onChange={handleChange} /></td>
                                        </tr>
                                        <tr>
                                            <td><input type="button" value="Upload Now" className="btn btn-primary modal-btn-design modal-btn-design-upload" data-bs-dismiss="modal" onClick={validateUpload} /></td>
                                            <td><button type="button" className="btn btn-secondary modal-btn-design modal-btn-design-upload" data-bs-dismiss="modal" onClick={cancelUpload}>Cancel</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Uploads