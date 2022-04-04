/* jsx-a11y no-static-element-interactions: 0 */
/* jsx-a11y click-events-have-key-events: 0  */
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

// https://bootsnipp.com/snippets/90QO4
import './styles.scss';

class Pricing extends Component {
  state = { active: 2 };

  toggleClass(id) {
    this.setState({ active: id });
  }

  render() {
    const { active } = this.state;
    const activePricing = 'pricing pricing-active hover-effect';
    const inactivePricing = 'pricing hover-effect';
    const activeHead = 'pricing-head pricing-head-active';
    const inactiveHead = 'pricing-head';
    return (
      <Row>
        <Col md={3}>
          <div
            className={active === 0 ? activePricing : inactivePricing}
            onClick={() => this.toggleClass(0)}
          >
            <div className={active === 0 ? activeHead : inactiveHead}>
              <h3>
                Begginer <span>Officia deserunt mollitia </span>
              </h3>
              <h4>
                <i>$</i>5<i>.49</i>
                <span>Per Month </span>
              </h4>
            </div>
            <ul className="pricing-content list-unstyled">
              <li>At vero eos</li>
              <li>No Support</li>
              <li>Fusce condimentum</li>
              <li>Ut non libero</li>
              <li>Consecte adiping elit</li>
            </ul>
            <div className="pricing-footer">
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non
                libero magna psum olor .
              </div>
              <a href="#top" className="btn yellow-crusta">Sign Up</a>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div
            className={active === 1 ? activePricing : inactivePricing}
            onClick={() => this.toggleClass(1)}
          >
            <div className={active === 1 ? activeHead : inactiveHead}>
              <h3>
                Pro <span>Officia deserunt mollitia </span>
              </h3>
              <h4>
                <i>$</i>
                15
                <i>.49</i>
                <span>Per Month </span>
              </h4>
            </div>
            <ul className="pricing-content list-unstyled">
              <li>At vero eos</li>
              <li>No Support</li>
              <li>Ut non libero</li>
              <li>Consecte adiping elit</li>
            </ul>
            <div className="pricing-footer">
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non
                libero magna psum olor .
              </div>
              <a href="#top" className="btn yellow-crusta">Sign Up</a>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div
            className={active === 2 ? activePricing : inactivePricing}
            onClick={() => this.toggleClass(2)}
          >
            <div className={active === 2 ? activeHead : inactiveHead}>
              <h3>
                Expert <span>Officia deserunt mollitia </span>
              </h3>
              <h4>
                <i>$</i>
                18
                <i>.49</i>
                <span>Per Month </span>
              </h4>
            </div>
            <ul className="pricing-content list-unstyled">
              <li>At vero eos</li>
              <li>No Support</li>
              <li>Fusce condimentum</li>
              <li>Ut non libero</li>
              <li>Consecte adiping elit</li>
            </ul>
            <div className="pricing-footer">
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non
                libero magna psum olor .
              </div>
              <a href="#top" className="btn yellow-crusta">Sign Up</a>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Pricing;
