import axios from 'axios';

const SERVICES_URL = "http://localhost:9000";

export const getAllContacts = async () => {
    const url = `${SERVICES_URL}/contacts`;
    return await axios.get(url);
};
export const getContact = async (contactId) => {
    const url = `${SERVICES_URL}/contacts/${contactId}`;
    return await axios.get(url)
};

export const getAllGroups = async () => {
    const url = `${SERVICES_URL}/group`;
    return await axios.get(url);
};
export const getGroup = async (groupId) => {
    const url = `${SERVICES_URL}/group/${groupId}`;
    return await axios.get(url);
};


export const createContacts = async (contact) => {
    const url = `${SERVICES_URL}/contacts`;
    return await axios.post(url, contact);
};
export const updateContacts = async (contact, contactId) => {
    const url = `${SERVICES_URL}/contacts/${contactId}`;
    return await axios.put(url, contact);
};
export const deleteContacts = async (contactId) => {
    const url = `${SERVICES_URL}/contacts/${contactId}`;
    return await axios.delete(url);
};