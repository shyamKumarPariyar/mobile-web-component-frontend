import { faClipboardUser, faHome, faProjectDiagram, faUser, faUserAlt, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Offcanvas, Nav, Button } from "react-bootstrap";
import { FaBars, FaHome, FaUser, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useHeader } from "./HeaderContext";

const Sidebar = ({role}) => {
    const [show, setShow] = useState(false);
    const {setHeader, setTitle} = useHeader()
    const linkStyle = ({ isActive }) =>
        isActive
        ? "nav-link text-white bg-secondary rounded mb-1"
        : "nav-link text-white mb-1";
    return (
        <>
        {/* Mobile Toggle Button */}
        <Button
            variant="dark"
            className="d-md-none m-2"
            onClick={() => setShow(true)}
            style={{height:'fit-content'}}
        >
            <FaBars />
        </Button>

        {/* Sidebar for Desktop */}
        <div className="d-none d-md-block text-white vh-100 p-3" style={{ width: "250px", backgroundColor:'#0c174aa8' }}>
            <h1 className="my-4 text-center fw-bold">DKN</h1>
            <h5 className="text-center text-white fst-italic text-capitalize" >{role} portal</h5>
            {/* <img src="/dkn.png" alt="Company Logo" className="img-fluid mb-2"/> */}
                <Nav defaultActiveKey="/admin/dashboard" className="flex-column nav-width-full">
                
                    <NavLink to={`/${role}/dashboard`} className={linkStyle} onClick={() => {setShow(false)}} >
                        <FontAwesomeIcon className="px-1 nav-icons"  icon={faHome} style={{width: '20px'}} /> Dashboard
                    </NavLink>
                    {(role === 'admin') &&
                    <>
                        <NavLink to='/admin/client' className={linkStyle} onClick={() => {setShow(false)}} >
                            <FontAwesomeIcon className="px-1 nav-icons"  icon={faClipboardUser} style={{width: '20px'}} /> Clients
                        </NavLink>
                        
                        <NavLink to='/admin/consultant' className={linkStyle} onClick={() => {setShow(false)}} >
                            <FontAwesomeIcon className="px-1 nav-icons"  icon={faUserAlt} style={{width: '20px'}} /> Consultant
                        </NavLink>
                        <NavLink to='/admin/project' className={linkStyle} onClick={() => {setShow(false)}} >
                            <FontAwesomeIcon className="px-1 nav-icons"  icon={faProjectDiagram} style={{width: '20px'}} /> Project
                        </NavLink>
                    </>

                    }
                </Nav>
        </div>

        {/* Sidebar for Mobile (Offcanvas) */}
        <Offcanvas show={show} onHide={() => setShow(false)} className="bg-dark text-white">
            <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title className="px-4 f-5 text-center fw-bold">DKN</Offcanvas.Title>
            
            </Offcanvas.Header>
            <small className="pl-4 ml-3 text-white fst-italic text-capitalize" >{role} portal</small>
            <Offcanvas.Body>
                <Nav defaultActiveKey="/admin/dashboard" className="flex-column nav-width-full">
                    <NavLink to='/admin/dashboard' className={linkStyle} onClick={() => {setShow(false)}} >
                        <FontAwesomeIcon className="px-1 nav-icons"  icon={faHome} style={{width: '20px'}} /> Dashboard
                    </NavLink>
                    <NavLink to='/admin/client' className={linkStyle} onClick={() => {setShow(false)}} >
                        <FontAwesomeIcon className="px-1 nav-icons"  icon={faClipboardUser} style={{width: '20px'}} /> Clients
                    </NavLink>
                    <NavLink to='/admin/consultant' className={linkStyle} onClick={() => {setShow(false)}} >
                        <FontAwesomeIcon className="px-1 nav-icons"  icon={faUserAlt} style={{width: '20px'}} /> Consultant
                    </NavLink>
                    <NavLink to='/admin/project' className={linkStyle} onClick={() => {setShow(false)}} >
                        <FontAwesomeIcon className="px-1 nav-icons"  icon={faProjectDiagram} style={{width: '20px'}} /> Project
                    </NavLink>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
};

export default Sidebar;
