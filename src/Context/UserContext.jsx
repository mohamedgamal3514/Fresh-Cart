import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)
export default function UserContextProdider({ children }) {
    const [token, setToken] = useState(null)
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setToken(localStorage.getItem('token'))
        }
    }, [])
    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}
