import { Container, Dropdown, Image, Nav, Navbar } from "react-bootstrap";
import { useHeader } from "./HeaderContext";
import { useAuth } from "../../utils/useAuth";

const AdminHeader = ({name}) => {
    const {logout} = useAuth()
    const { header } = useHeader();

    return (
        <Navbar bg="light" expand="lg" className="border-bottom px-3">
        <Container fluid>

            {/* Left side */}
            <Navbar.Brand className="fw-semibold">
            {header}
            </Navbar.Brand>

            {/* Right side */}
            <Nav className="ms-auto align-items-center gap-3">

            {/* Profile Dropdown */}
            <Dropdown align="end">
                <Dropdown.Toggle
                variant="light"
                className="d-flex align-items-center gap-2 border-0"
                >
                <Image
                    src="/profile.jpg"
                    roundedCircle
                    width={32}
                    height={32}
                />
                <span className="fw-medium text-capitalize">{name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} className="text-danger">
                    Logout
                </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            </Nav>
        </Container>
        </Navbar>
    );
};

export default AdminHeader;
