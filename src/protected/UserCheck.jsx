import { useState, useEffect, useContext, createContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";

export const SelectedUsersContext = createContext([]);

function UserCheck({ children }) {
    const {token} = useContext(AuthContext);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        console.log(token);
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/users/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        
        }).then(response => {
            const users = response.data;
            const chosenUsers = users.slice(0, 3);
            setSelectedUsers(chosenUsers);
            console.log(chosenUsers);
        }).catch(error => {
            console.log(error);
        });
    }, [token]);
    
    return (
        <SelectedUsersContext.Provider value={selectedUsers}>
            {children}
        </SelectedUsersContext.Provider>
    );
}

export default UserCheck;