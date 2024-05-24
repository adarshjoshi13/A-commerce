import { createContext, useContext, useState } from 'react';
import axios from "axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [UserId, setUserId] = useState(null);

    const UserVerification = async (id) => {

        setUserId(id)
        return true
    }

    return (
        <AuthContext.Provider value={{ UserId, UserVerification }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};


