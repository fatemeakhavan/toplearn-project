import{createContext} from "react";

export const ContactContext= createContext({
    loading:false,
    setLoading:()=>{},
    contact:{
        fullName:"",
        photo:"",
        mobile:"",
       email:"",
        job:"",
        group:""

    },
    contacts:[],
    setContacts:()=>{},
    setContact:()=>{},
    filterContacts:[],
    setFilterContacts:()=>{},
    contactQuery:{},
    groups:[],
    onContactChange:()=>{},
    deleteContact:()=>{},
    updateContact:()=>{},
    createContact:()=>{},
    contactSearch:()=>{}
});