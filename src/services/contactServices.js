import axios from 'axios';
const SERVICES_URL ="http://localhost:9000";

export const getAllContacts=()=>{
    const url=`${SERVICES_URL}/contacts`;
    return axios.get(url);
};
export const getContact=(contactId)=>{
    const url=`${SERVICES_URL}/contacts/${contactId}`;
    return axios.get(url)
};

export const getAllGroups=()=>{
    const url=`${SERVICES_URL}/group`;
    return axios.get(url);
};
export const getGroup=(groupId)=>{
    const url=`${SERVICES_URL}/group/${groupId}`;
    return axios.get(url);
};


export const createContacts=(contact)=>{
    const url=`${SERVICES_URL}/contacts`;
    return axios.post(url,contact);
};
export const updateContacts=(contact,contactId)=>{
    const url=`${SERVICES_URL}/contacts/${contactId}`;
    return axios.put(url,contact);
};
export const deleteContacts=(contactId)=>{
    const url=`${SERVICES_URL}/contacts/${contactId}`;
    return axios.delete(url);
};