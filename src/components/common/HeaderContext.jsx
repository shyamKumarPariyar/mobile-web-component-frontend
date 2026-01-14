import { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
    const [header, setHeader] = useState("Dashboard");
    const [title, setTitle] = useState("DKN SYSTEM");
    return (
        <HeaderContext.Provider value={{ header, setHeader, title, setTitle}}>
        {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => useContext(HeaderContext);
