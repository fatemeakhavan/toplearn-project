import {PURPLE} from'../../helpers/colors';

const Searchcontact = ()=> {
    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" id="basic-addont" style={{backgroundColor: "PURPLE"}}>
                <i className="fa fa-search"></i>
            </span>
            <input dir="rtl" type="text" style={{backgroundColor: 'PURPLE'}} className='form-control'
                   placeholder='جستجوی مخاطب' aria-label="search" aria-describedby="basic-addon1"/>
        </div>
    )
}
export default Searchcontact;