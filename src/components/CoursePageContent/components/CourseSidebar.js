import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import urlJoin from '../../../modules/url-join';

const CourseSidebar = (props) => {
  const { match } = props;
  return (
    <Nav variant="pills" className="flex-column mt-md-5">
      <Nav.Item>
        <NavLink
          to={urlJoin(match.url, 'outline')}
          className="nav-link"
          activeClassName="active"
        >
          Outline
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to={urlJoin(match.url, 'live')}
          className="nav-link"
          activeClassName="active"
        >
          Live
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to={urlJoin(match.url, 'forum')}
          className="nav-link"
          activeClassName="active"
        >
          Forum
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to={urlJoin(match.url, 'resources')}
          className="nav-link"
          activeClassName="active"
        >
          Resources
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          to={urlJoin(match.url, 'about')}
          className="nav-link"
          activeClassName="active"
        >
          About
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

CourseSidebar.propTypes = {
  match: PropTypes.object,
};
export default CourseSidebar;
