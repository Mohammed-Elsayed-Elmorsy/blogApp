import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userID, setUserID] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const GetUser = async () => {
        const { data } = await axios.get('http://localhost:5000/profile', { withCredentials: true })
        if (data) {
            setUser(data.username)
            setUserEmail(data.email)
            setUserID(data.id)
        }
    }
    GetUser()

    return <UserContext.Provider value={{ user, setUser, userEmail, userID }}>
        {children}
    </UserContext.Provider>
}

