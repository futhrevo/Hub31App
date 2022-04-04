import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import logo from '../assets/logo.png';
import { asStudent } from '../redux/accounts';
import { RootState } from '../redux/store';


const teacherNavs = [
  // {
  //   route: '/acca',
  //   name: 'ACCA',
  //   eventKey: 2,
  // },
  {
    route: '/catalog',
    name: 'CATALOG',
    eventKey: 2.1,
  },
  // {
  //   route: '/myclass',
  //   name: 'My Class',
  //   eventKey: 2.2,
  // },
];

const AuthenticatedNavigation = ({ onLogout }: { onLogout: () => void }) => {
  const { isTeacher, isStudent, userName } = useSelector((state: RootState) => ({
    isTeacher: state.Accounts.isTeacher,
    isStudent: state.Accounts.isStudent,
    userName: state.Accounts.dname || 'USER'
  }))

  const dispatch = useDispatch();

  return (
    <>
      <Navbar className="hub31-nav" collapseOnSelect variant="dark" expand="md">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              height="40"
              width="40"
              style={{ backgroundColor: 'white' }}
            />
            {process.env.REACT_APP_WEBSITE_NAME || 'HUB 31'}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {teacherNavs.map(menus => (
              <LinkContainer to={menus.route} key={menus.eventKey}>
                <Nav.Link>{menus.name}</Nav.Link>
              </LinkContainer>
            ))}
            {isTeacher ? (
              <LinkContainer to="/courses" key="4.6">
                <Nav.Link>MY COURSES</Nav.Link>
              </LinkContainer>
            ) : (
              ''
            )}
          </Nav>
          <Nav>

            <NavDropdown title={userName} id="basic-nav-dropdown" drop="left">
              <LinkContainer to="/profile" key="3.1">
                <NavDropdown.Item>PROFILE</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => dispatch(asStudent(!isStudent))}>
                {isStudent ? 'As Teacher' : 'As Student'}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={onLogout}>
                LOGOUT
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {(isTeacher && isStudent) ? <small className="line-height-1 bg-warning text-center" onClick={() => dispatch(asStudent(false))}>Viewing as Student</small> : null}

    </>
  )
};

export default AuthenticatedNavigation;
