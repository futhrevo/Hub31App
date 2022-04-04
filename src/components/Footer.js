import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-4 hub31-footer">
      <Container fluid>
        <Row>
          <Col md={6} className="mt-md-0 mt-3 text-center">
            <h6 className="text-uppercase">Contact</h6>
            <p><a href="mailto:info@hub31.com">info@hub31.com</a></p>
          </Col>
          <hr className="clearfix w-100 d-md-none pb-3" />
          <Col md={3} className="mb-md-0 mb-3">
            <h6 className="text-uppercase">Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                Teachers Policy
              </li>
              <li>
                Terms of Service
              </li>
              <li>
                <a href="https://hedera.in">Hedera.in</a>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-md-0 mb-3">
            <h6 className="text-uppercase">Social</h6>
            <ul className="list-unstyled">
              <li><a href="https://www.facebook.com/FFT143/">Facebook</a></li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-copyright text-center py-3">© 2018 Copyright:
    <a href="https://hedera.in/"> Hedera Technology (OPC) Pvt Ltd</a>
      </div>
    </footer>
  );
}

export default Footer;
