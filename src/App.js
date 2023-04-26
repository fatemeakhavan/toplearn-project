import {Contacts, Navbar} from './components/index';
import {Route, Routes, Navigate} from "react-router-dom";

import axios from 'axios';
import {useState, useEffect} from 'react';
import Contact from "./components/contact/contact";
import {EditContact} from "./components";
import Addcountact from "./components/contact/AddCountact";
import {getAllContacts, getAllGroups} from '../src/services/contactServices';

const App = () => {


    const [getContact, setContact] = useState({
        fullname: "",
        photo: "",
        mobile: "",
        email: "",
        job: "",
        group: "",
    });
    const [loading, setLoading] = useState(false);
    const [getGroups, setGroups] = useState([]);
    const [getContacts, setContacts] = useState([]);

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


    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Navigate to="/contacts"/>}/>
                <Route path="/contacts" element={<Contacts contacts={getContacts} loading={loading}/>}/>
                <Route path="/contacts/add" element={<Addcountact/>}/>
                <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>


            </Routes>

        </div>
    )
}
export default App;