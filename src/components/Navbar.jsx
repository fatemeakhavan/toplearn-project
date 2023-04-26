import Searchcontact from './contact/searchContact';
import {PURPLE}  from '../helpers/colors';

const Navbar=()=>{
    return(
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg">
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fa fa-id-badge" style={{color:"PURPLE"}}></i>{"  "}
                            وب اپلیکیشن مدیریت{" "}
                            <span style={{color:"PURPLE"}}>مخاطبین</span>
                        </div>

                    </div>
                    <div className="col">
                        <Searchcontact/>
                    </div>
                </div>

            </div>
        </nav>
    )
}
export default Navbar;