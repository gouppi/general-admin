import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import {Link} from '@reach/router';

const Navigation = () => (
    <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
        <Link to="/"><Navbar.Brand>General Admin</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link to="/" as={Link}>Home</Nav.Link>
            <Nav.Link to="/settings" as={Link}>Settings</Nav.Link>
            <Nav.Link to="/users" as={Link}>Users</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link">Logout</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
)

export default Navigation;