import { Modal } from "react-bootstrap";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import UpdatePassword from "../components/common/UpdatePassword";
import './../admin.css'
import AdminHeader from "../components/common/AdminHeader";
import Sidebar from "../components/common/Sidebar";
import { useHeader } from "../components/common/HeaderContext";


const ExternalProtectedLayout = ({header, setHeader}) => {
    const {user} = useAuth()
	const location = useLocation()
	const [show, setShow] = useState(false);
	const {title} = useHeader()

    const handleClose = () => setShow(false)

	if(!user){
        return <Navigate to="/login" state={{prevUrl: location.pathname}} />;
    }
    
	const { role, name, id } = jwtDecode(user)

	if(role && (role === 'newconsultant' || role === 'seniorconsultant' || role === 'generalconsultant')) {
        return <Navigate to={`/consultant/dashboard`} replace />
    } else if(role &&  role === 'admin'){
        return <Navigate to={`/admin/dashboard`} replace />
    }else if(role &&  role === 'client'){
        return <Navigate to={`/client/dashboard`} replace />
    }
	
	document.title = title.toUpperCase()

	return (
		<>
			<div className="admin-layout d-flex"> 
				<Sidebar role={role}/>
					<main className="main-content flex-grow-1">
						<AdminHeader header={header} name={name} />
						<section className="content">
							<Outlet />
						</section>
					</main>
			</div>

			<Modal
                size="md"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <UpdatePassword userId={id} handleClose={handleClose} />
            </Modal>
		</>
	);
};

export default ExternalProtectedLayout;
