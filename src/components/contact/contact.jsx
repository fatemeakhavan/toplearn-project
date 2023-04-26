import {CURRENTLINE,PURPLE,CYAN,ORANGE,RED} from "../../helpers/colors";


const Contact =({contact})=>{
    return(
        <div className="col-md-6">
            <div style={{backgroundColor:CURRENTLINE}} className="card my-2">
                <div className="card-body">
                    <div className="row align-items-center d-flex justify-content-around">
                        <div className="col-md-3 col-sm-4">
                            <img className="img-fluid rounded" style={{border:"1px solid ${PURPLE}"}} src={contact.photo} alt={contact.fullname}/>
                        </div>
                        <div className="col-md-7 col-sm-7">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    نام نام خانوادگی:{" "}
                                    <span className="fw-bold">contact.fullname</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    شماره موبایل:{" "}
                                    <span className="fw-bold">{contact.mobile}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    آدرس ایمیل:{" "}
                                    <span className="fw-bold">contact.email</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-2 col-sm-1  flex-colum align-items-center">
                            <button className="btn my-1" style={{backgroundColor:"ORANGE"}}>
                                <i className="fa fa-eye"></i>
                            </button>
                            <button className="btn my-1" style={{backgroundColor:"CYAN"}}>
                                <i className="fa fa-eye"></i>
                            </button>
                            <button className="btn my-1" style={{backgroundColor:"RED"}}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}
export default  Contact;