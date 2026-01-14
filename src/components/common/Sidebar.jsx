import { faClipboardUser, faHome, faProjectDiagram, faUser, faUserAlt, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Offcanvas, Nav, Button } from "react-bootstrap";
import { FaBars, FaHome, FaUser, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useHeader } from "./HeaderContext";
import { useEffect } from "react";

const Sidebar = ({role}) => {
    const [show, setShow] = useState(false);

    const [portal, setPortal] = useState('')
    const [link, setLink] = useState('')
    const linkStyle = ({ isActive }) =>
        isActive
        ? "nav-link text-white bg-secondary rounded mb-1"
        : "nav-link text-white mb-1";

        useEffect(() => {
    switch (role) {
        case 'admin':
            setPortal('Admin')
            setLink('admin')
            break;

        case 'seniorconsultant':
            setPortal('Consultant')
            setLink('consultant')
            break;

        case 'newconsultant':
            setPortal('Consultant')
            setLink('consultant')
            break;

        case 'generalconsultant':
            setPortal('Consultant')
            setLink('consultant')
            break;

        case 'external':
            setPortal('External User')
            setLink('external')
            break;

        case 'client':
            setPortal('Client')
            setLink('client')
            break;
    
        default:
            break;
    }
        },[])

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
            <h5 className="text-center text-white fst-italic text-capitalize" >{portal} portal</h5>
            {/* <img src="/dkn.png" alt="Company Logo" className="img-fluid mb-2"/> */}
                <Nav defaultActiveKey="/admin/dashboard" className="flex-column nav-width-full">
                
                    <NavLink to={`/${link}/dashboard`} className={linkStyle} onClick={() => {setShow(false)}} >
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
            <small className="pl-4 ml-3 text-white fst-italic text-capitalize" >{portal} portal</small>
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
