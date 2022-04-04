import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Collapse, Nav } from 'react-bootstrap';
import urlJoin from '../../modules/url-join';

const components = [
  { name: 'Info', path: '', exact: true }, { name: 'Description', path: 'desc' }, { name: 'About', path: 'about' }, { name: 'Resources', path: 'rsc' }, { name: 'Chapters', path: 'chap' }, { name: 'Materials', path: 'mat' }, { name: 'Results', path: 'results' }, { name: 'Forums', path: 'forums' }, { name: 'Sessions', path: 'sess' }, { name: 'Live', path: 'live' }
];

const CourseAdminMenu = ({ pathname }) => {

  const [collapse, setCollapse] = useState(false);

  return (
    <div className="col-xl-2 col-md-3 col-12 d-flex flex-column side-panel">
      <div className="py-3 d-flex align-items-center cursor-pointer" onClick={() => setCollapse(!collapse)}>
        <h5 className="w-100">Admin Menu</h5>
        <div className="p-0 d-md-none ml-3 menu-button" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="30"
            height="30"
            focusable="false"
          >
            <title>Menu</title>
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              d="M4 7h22M4 15h22M4 23h22"
            />
          </svg>
        </div>
      </div>
      <Collapse in={collapse}>
        <div className="overflow-wrapper">
          <nav className="pt-2 pb-4">
            <Nav activeKey={pathname} onSelect={() => { setCollapse(false) }} className="d-block">
              {components.map(({ name, path, exact }) => (
                <Nav.Item key={name}>
                  <LinkContainer exact={exact} to={urlJoin(pathname, path)} key={name}>
                    <Nav.Link>
                      {name}
                    </Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav>
          </nav>
        </div>
      </Collapse>
    </div>
  );
}

export default CourseAdminMenu;
