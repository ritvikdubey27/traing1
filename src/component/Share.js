import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../css/share.css'

function Share() {
    return (
        <div>
            <div className="container-for-table h-auto">
                <h3 className="same-font ft-w-500 pd-20 fl">Upload Sharing : <span>Sample.txt</span></h3>
                <table border="1" cellSpacing="0" cellPadding="3" className="w-100per h-auto br-10 br-bl">
                    <thead>
                        <tr>
                            <th className="th-for-table th-c1">Shared User</th>
                            <th className="th-for-table th-c2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="tr2">
                            <td className="td2 td2-c1">Anne Hunter</td>
                            <td className="td2"><a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">Remove</a></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2 td2-c1">Text User</td>
                            <td className="td2"><a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">Remove</a></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                        <tr className="tr2">
                            <td className="td2"></td>
                            <td className="td2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 className="same-font ft-w-500 pd-20 fl">Add Sharing</h3>
            <div className="container2">
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="user" className="share-label">Choose User : </label></td>
                            <td>
                                <select name="name" className="share-select">
                                    <option value="J Bose">J Bose</option>
                                    <option value="J Bose">HR</option>
                                    <option value="J Bose">Harsh Zaveri</option>
                                </select>
                            </td>
                            <td><button className="share-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Share</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>


            {/* Modal for Share*/}
            <div className="modal fade modal-design" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirm From Web Page</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img src="./../questionMark.jpg" alt="" />
                            <p>Are you sure ?</p>
                        </div>
                        <div className="modal-footer">
                            <a href=""><button type="button"
                                className="btn btn-primary modal-btn-design">Ok</button></a>
                            <button type="button" className="btn btn-secondary modal-btn-design"
                                data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share