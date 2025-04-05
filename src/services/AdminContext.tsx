import React, { FC, createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
    isAdmin: boolean;
    toggleAdmin: () => void;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdmin, setAdmin] = useState<boolean>(false);

    const toggleAdmin = () => {
        setAdmin((prevState) => (!prevState));
    };

    return (
        <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};