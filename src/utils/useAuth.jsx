import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children, userData }) => {
    const [user, setUser] = useLocalStorage("session", userData);
    const navigate = useNavigate();
   
    const login = async (data) => {
        setUser(data);
        const {role} = jwtDecode(data)
     
        switch (role) {
            case 'superadmin':
                navigate('/admin/dashboard', {state:{pageHeader: 'Dashboard'}} );
                break;
            
            case 'admin':
                navigate(`/admin/dashboard`, {state:{pageHeader: 'Admin Dashboard'}});
                break;

            case 'newconsultant':
                navigate(`/consultant/dashboard`, {state:{pageHeader: 'New Consultant'}});
                break;

            case 'seniorconsultant':
                navigate(`/consultant/dashboard`, {state:{pageHeader: 'Senior Consultant'}});
                break;

            case 'generalconsultant':
                navigate(`/consultant/dashboard`, {state:{pageHeader: 'Consultant'}});
                break;

            case 'client':
                navigate(`/client/dashboard`, {state:{pageHeader: 'Client'}});
                break;

            default:
                navigate(`/login`);
                break;
        }

    };

    const logout = () => {
        setUser();
        localStorage.clear()
        return navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
        user,
        login,
        logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext);
};
