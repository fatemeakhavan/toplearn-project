import {Contacts, Navbar} from './components/index';
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import {EditContact, ViewContact} from "./components";
import {getAllContacts, getAllGroups, createContacts, deleteContacts} from '../src/services/contactServices';
import AddContact from "./components/contact/AddCountact";
import {confirmAlert} from "react-confirm-alert";
import {COMMENT, CURRENTLINE, CYAN, PURPLE} from "./helpers/colors";

import {ContactContext} from "./ContextApi/contactContext";

const App = () => {

    const [contact, setContact] = useState({});
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [contactQuery, setContactQuery] = useState({text: ""});
    const [filterContacts, setFilterContacts] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();
                setContacts(contactsData);
                setFilterContacts(contactsData);
                setGroups(groupsData);
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);

            }
        }
        fetchData();
    }, []);

    const onContactChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value,

        })
    }
    const createContactForm = async (event) => {
        event.preventDefault();
        try {
            setLoading((prevLoading) => !prevLoading);
            const {status, data} = await createContacts(contact);

            if (status === 201) {
                const allContact = [...contacts, data];

                setContacts(allContact);
                setFilterContacts(allContact);

                setContact({});
                setLoading((prevLoading) => !prevLoading);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            setLoading((prevLoading) => !prevLoading);
        }
    };


    const contactSearch = (event) => {
        setContactQuery({...contactQuery, text: event.target.value});
        const allContact = contacts.filter((contact) => {
            return contact.fullName
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
        });
        setFilterContacts(allContact);


    }

    const confirmDelete = (contactId, contactFullName) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div
                        dir="rtl"
                        style={{
                            backgroundColor: CURRENTLINE,
                            border: `1px solid ${PURPLE}`,
                            borderRadius: "1rem"
                        }}
                        className="p-4"
                    >
                        <h1 style={{backgroundColor: CYAN}}>حذف مخاطب</h1>
                        <p style={{backgroundColor: PURPLE}}>
                            آیا میخواهید مخاطب{contactFullName}حدف کنید؟
                        </p>
                        <button className="btn mx-2" style={{backgroundColor: PURPLE}}
                                onClick={() => {
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

    const removeContact = async (contactId) => {
        const allContacts=[...contacts];
        try {
            const updateContact= allContacts.filter(c=> c.id !== contactId);
            setContacts(updateContact);
            setFilterContacts(updateContact);

            const {status} = await deleteContacts(contactId);

            if (status !== 200) {

                setContacts(allContacts);
                setFilterContacts(allContacts);

            }
        } catch (err) {
            console.log(err.message);
            setContacts(allContacts);
            setFilterContacts(allContacts);

        }
    }


    return (
        <ContactContext.Provider
            value={{
                loading,
                setLoading,
                contact,
                setContact,
                setContacts,
                contacts,
                filterContacts,
                setFilterContacts,
                groups,
                onContactChange,
                deleteContact: confirmDelete,
                createContact: createContactForm,
                contactSearch,
                contactQuery,
            }}>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts"/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/contacts/add" element={< AddContact/>}/>
                    <Route path="/contacts/contact/:contactId" element={<ViewContact/>}/>
                    <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>


                </Routes>

            </div>

        </ContactContext.Provider>
    )

}
export default App;