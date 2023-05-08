import {contact, Contacts, Navbar} from './components/index';
import {Route, Routes, Navigate, useNavigate, Link} from "react-router-dom";
import {useState, useEffect} from 'react';
import Contact from "./components/contact/contact";
import {EditContact, ViewContact} from "./components";
import {getAllContacts, getAllGroups, createContacts, deleteContacts} from '../src/services/contactServices';
import AddContact from "./components/contact/AddCountact";
import {confirmAlert} from "react-confirm-alert";
import {COMMENT, CURRENTLINE, CYAN, PURPLE} from "./helpers/colors";

const App = () => {

    const [getContact, setContact] = useState({
        fullName: "",
        photo: "",
        mobile: "",
        email: "",
        job: "",
        group: "",
    });
    const [loading, setLoading] = useState(false);
    const [getGroups, setGroups] = useState([]);
    const [getContacts, setContacts] = useState([]);
    const[forceRender,setForceRender]=useState(false);
    const[query,setQuery]=useState({text:""});
    const[filterContact,setFilterContact]=useState();

    const navigate=useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();
                setContacts(contactsData);
                setFilterContact(contactsData);
                setGroups(groupsData);
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);

            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const {data: contactsData} = await getAllContacts();
                setContacts(contactsData);
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);

            }
        }
        fetchData();
    }, [forceRender]);


    const setContactInfo = (event) => {
        setContact({
            ...getContact,
            [event.target.name]: event.target.value,

        })
    }
    const createContactForm = async event => {
        event.preventDefault();
        try {
            const {status} = await createContacts(getContact);
            if (status === 201) {
                setContact({});
                setForceRender(!forceRender);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message())
        }
    };
    const contactSearch= (event)=>{
        setQuery({...query,text:event.target.value});
        const allContact=getContacts.filter((contact)=>{
            return contact.fullName
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
        });
        setFilterContact(allContact);


    }

    const confirm=(contactId,contactFullName)=>{
        confirmAlert({
            customUI:({onClose})=>{
                return(
                    <div
                        dir="rtl"
                        style={{backgroundColor:CURRENTLINE,
                            border:`1px solid ${PURPLE}`,
                            borderRadius:"1rem"}}
                        className="p-4"
                    >
                        <h1 style={{backgroundColor:CYAN}}>حذف مخاطب</h1>
                        <p style={{backgroundColor:PURPLE}}>
                            آیا میخواهید مخاطب{contact.FullName}حدف کنید؟
                        </p>
                        <button className="btn mx-2" style={{backgroundColor:PURPLE}}
                                onClick={()=>{
                                removeContact(contactId);
                                 onClose();
                                }}>
                            مطمعن هستم
                        </button>
                        <button className="btn"
                                style={{backgroundColor: COMMENT}}
                                onClick={onClose}>
                            انصراف
                        </button>


                    </div>

                );
            }
        });
    };

    const removeContact=async (contactId)=>{
        try{
            setLoading(true)
            const response =await deleteContacts(contactId);
            if(response){
                const{data:contactData}=await getAllContacts( );
                setContact(contactData);
                setLoading(false)
            }
        }
        catch(err){
            console.log(err.message);
            setLoading(false);
        }
    }


    return (
        <div>
            <Navbar query={query} search={contactSearch}/>
            <Routes>
                <Route path="/" element={<Navigate to="/contacts"/>}/>
                <Route path="/contacts" element={<Contacts contacts={filterContact} loading={loading} confirmDelete={confirm}/>}/>
                <Route path="/contacts/add"
                       element={< AddContact loading={loading} setContactInfo={setContactInfo} contact={Contact}
                                            createContactForm={createContactForm} groups={getGroups}/>}/>
                <Route path="/contacts/contact/:contactId" element={<ViewContact/>}/>
                <Route path="/contacts/edit/:contactId" element={<EditContact forceRender={forceRender} setForceRender={setForceRender}/>}/>


            </Routes>

        </div>
    )
}
export default App;