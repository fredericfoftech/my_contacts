import axios from "axios";
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAccount = defineStore('api', () => {

    const api = axios.create({
  baseURL: "https://api-contact.zoul.dev/api",
});


const login = async (email: string, password: string) => {
    try {
        const response = await api.post("/users/login", {
            email: email,
            password: password
        });
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

const register = async (name: string, email: string, password: string, confirm_password: string) => {
    try {
        const response = await api.post("/users", {
            name: name,
            email: email,
            password: password,
            confirm_password: password
        });
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};
const getAllUsers = async (token: string) => {
    try {
        const response = await api.get("/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Fetching users failed:", error);
        throw error;
    }
};

const getLoggerProfile = async (token: string) => {
    try {
        const response = await api.get("/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Fetching profile failed:", error);
        throw error;
    }
};

const updateProfile = async (token: string, name: string, email: string, password: string) => {
    try {
        const response = await api.put("/users/me", {
            name: name,
            email: email,
            password: password
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Updating profile failed:", error);
        throw error;
    }
};

const changeLoggerPassword = async (token: string, currentPassword: string, newPassword: string) => {
    try {
        const response = await api.put("/users/me/password", {
            currentPassword: currentPassword,
            new_password: newPassword,
            confirm_password: newPassword
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Changing password failed:", error);
        throw error;
    }
};

const createContact = async (token: string, firstname: string, lastname: string, phone: string, email: string, gender: string, birthdate: string, position: string, company: string) => {
    try {
        const response = await api.post("/contacts", {
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            gender: gender,
            birthdate: birthdate,
            position: position,
            company: company
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Creating contact failed:", error);
        throw error;
    }
};

const getAllContacts = async (token: string) => {
    try {
        const response = await api.get("/contacts", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Fetching contacts failed:", error);
        throw error;
    }
};

const getLoggedContact = async (token: string) => {
    try {
        const response = await api.get("/contacts/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Fetching logged contact failed:", error);
        throw error;
    }
};

const getSpecificContact = async (token: string, id: string) => {
    try {
        const response = await api.get(`/contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Fetching specific contact failed:", error);
        throw error;
    }
};

const updateContact = async (token: string, id: string, firstname: string, lastname: string, phone: string, email: string, gender: string, birthdate: string, position: string, company: string) => {
    try {
        const response = await api.put(`/contacts/${id}`, {
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            gender: gender,
            birthdate: birthdate,
            position: position,
            company: company
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Updating contact failed:", error);
        throw error;
    }
};

const deleteContact = async (token: string, id: string) => {
    try {        const response = await api.delete(`/contacts/${id}`, {         headers: {           Authorization: `Bearer ${token}`       }       });       return response.data;     } catch (error) {       console.error("Deleting contact failed:", error);       throw error;     }   };



  return {login,
    register,
    getAllUsers,
    getLoggerProfile,
    updateProfile,
    changeLoggerPassword,
    createContact,
    getAllContacts,
    getLoggedContact,
    getSpecificContact,
    updateContact,
    deleteContact};
})