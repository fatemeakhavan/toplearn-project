import {Contacts, Navbar} from './components/index';
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import Contact from "./components/contact/contact";
import {EditContact, ViewContact} from "./components";
import {getAllContacts, getAllGroups,createContacts} from '../src/services/contactServices';
import AddContact from "./components/contact/AddCountact";

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
    const navigate=useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();
                setContacts(contactsData);
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
    }


    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Navigate to="/contacts"/>}/>
                <Route path="/contacts" element={<Contacts contacts={getContacts} loading={loading}/>}/>
                <Route path="/contacts/add"
                       element={< AddContact loading={loading} setContactInfo={setContactInfo} contact={Contact}
                                            createContactForm={createContactForm} groups={getGroups}/>}/>
                <Route path="/contacts/contact/:contactId" element={<ViewContact/>}/>
                <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>


            </Routes>

        </div>
    )
}
export default App;