import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PublicNavigation from '../../components/PublicNavigation';
// import { bootstrapUtils } from 'react-bootstrap/lib/utils';

import './styles.scss';

// bootstrapUtils.addStyle(Button, 'hero');

const formatN = n => {
  return ("0" + n).slice(-2);
}

const PublicHome = () => {
  const [day, setDay] = useState(31);

  useEffect(() => {
    let i = 0;
    let timer = setInterval(() => {
      i++;
      setDay(i);
      if (i === 31) {
        clearInterval(timer);
      }
    }, 25);
  }, [])
  return (
    <div className="hero hero-homepage">
      <Helmet>
        <title>Hub 31 Ways to the TOP </title>
      </Helmet>
      <div className="logo-container">
        <PublicNavigation />
        <div className="hub31-logo">
          <strong>HUB</strong>
          <span>{formatN(day)}</span>
        </div>
        <h1 className="hero-header">Ways to the Top</h1>
        <h4 className="text-muted">
          World&apos;s most popular learning hub.
      </h4>
        {/* <Button variant="hero" className="hero-button">Browse Courses</Button> */}
        <div style={{ margin: '25px' }}>Coming Soon for android and ios</div>
      </div>
      <section className="success" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="light">ABOUT</h2>
              <hr className="star-light" />
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4">
                <p className="justifyText">
                  HUB 31 features course materials from
                  subjects taught by world renowned experts to enable learning on any device anytime
              </p>
              </div>
              <div className="col-lg-4">
                <p className="justifyText">
                  Whether you're a student looking to gain knowledge, a
                  professional looking to augment your proficiency, this is the
                  best place to start!
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="primary" id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <h2>OUR PARTNERS</h2>
            <hr className="colorgraph" />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <a
              href="http://www.google.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                className="homepage-grid-icon"
                src="/lipsum.png"
                alt="Lorem Ipsum"
              />
            </a>
            <h5>
              <strong>Lorem Ipsum</strong>
            </h5>
            <p>Your slogan here</p>
          </div>
        </div>
      </div>
    </section> */}
      <section className="primary" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 justify-content-center">
              <h2>FEATURES</h2>
              <hr />
            </div>
          </div>
          <div className="row justify-content-center">
            <ul className="list-unstyled">
              <li>
                <p>Hub 31 enables online access to courses using Web and mobile apps</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
};

export default PublicHome;
