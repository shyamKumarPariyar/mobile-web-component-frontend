import { Col, Container, Nav, NavDropdown, Navbar, Offcanvas, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faClipboardList, faFileVideo, faGamepad, faHome, faLayerGroup, faList, faUsers } from "@fortawesome/free-solid-svg-icons";
import { APP_NAME } from "../../constraints/constant";

const SideNavBar = ({setHeader, setTitle}) => {
	return (
		<>
			<Row className="px-1 px-lg-2 py-lg-4 py-3">
				<Col xs={9} md={12} className=" text-start text-md-center">
					<img
						src={"/assets/images/gti.png"}
						alt="GTI Logo"
						className="main-logo"
					/>
					<div className="pt-2 pb-1 pt-md-4 px-1 fs-5 text-capitalize text fw-medium">Admin</div>
				</Col>
				{/* <div className="col-12 white-divider"></div> */}
				<Col xs={3} md={12} className="my-md-4 my-2 ps-0 ps-md-1">
					<Navbar collapseOnSelect expand="lg">
						<Container>
							<Navbar.Toggle aria-controls="responsive-navbar-nav" className=" text-white" />
							<Navbar.Offcanvas 
							id="responsive-navbar-nav"
							aria-labelledby="offcanvasNavbarLabel-expand-lg"
							placement="start" 
							className="px-0"
							>
								<Offcanvas.Header closeButton className="text-white">
									<Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
									DKN
									</Offcanvas.Title>
								</Offcanvas.Header>
								<Nav defaultActiveKey="/admin/dashboard" className="flex-column nav-width-full">
									<NavLink to='/admin/dashboard' className="text-decoration-none align-items-start nav-link" onClick={() => {setHeader('Dashboard'); setTitle(`${APP_NAME} | ADMIN | DASHBOARD`)}} >
										<FontAwesomeIcon className="px-1 nav-icons"  icon={faHome} style={{width: '20px'}} /> Dashboard
									</NavLink>
									<NavLink to='/admin/client' className="text-decoration-none align-items-start nav-link" onClick={() => {setHeader('Clients'); setTitle(`${APP_NAME} | ADMIN | CLIENTS`)}} >
										<FontAwesomeIcon className="px-1 nav-icons"  icon={faHome} style={{width: '20px'}} /> Clients
									</NavLink>
									<NavLink to='/admin/consultant' className="text-decoration-none align-items-start nav-link" onClick={() => {setHeader('Consultant'); setTitle(`${APP_NAME} | ADMIN | CONSULTANTS`)}} >
										<FontAwesomeIcon className="px-1 nav-icons"  icon={faHome} style={{width: '20px'}} /> Consultant
									</NavLink>
								</Nav>
							</Navbar.Offcanvas>
						</Container>
					</Navbar>
				</Col>
			</Row>
		</>
	);
};

export default SideNavBar;
