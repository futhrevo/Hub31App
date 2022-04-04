import React, { useState } from 'react';
import { Row, Col, Form, Button, Container, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import { useDispatch } from 'react-redux';
import PublicNavigation from '../../components/PublicNavigation';
import ErrorBoundary from '../ErrorBoundary';
import { emailRule, passwordRule, nameRule } from '../../modules/forg-rules';
import AppHelmet from '../../components/AppHelmet';
import { onLogin, refreshUserData } from '../../redux/accounts';

const Signup = (props) => {
  const [newUser, setNewUser] = useState(null);
  const [mailId, setMailId] = useState("");
  const [passwd, setPasswd] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();

  function renderSignUp() {
    return (
      <ErrorBoundary>
        <div style={{ margin: '12px' }}>
          <h4 className="centerText">Sign Up</h4>
          <hr className="colorgraph" />
          <Formik
            initialValues={{
              email: '',
              password: '',
              first: '',
              last: '',
            }}
            onSubmit={async (values, { setSubmitting, dirty }) => {
              if (dirty) {
                alert.error('check provided inputs');
                return;
              }
              setSubmitting(true);
              const {
                email, password, first, last,
              } = values;
              const user = {
                username: email,
                password,
                attributes: {
                  name: first,
                  family_name: last,
                },
              };
              setMailId(email);
              setPasswd(password);
              try {
                const newUser = await Auth.signUp(user);
                setNewUser(newUser);
              } catch (e) {
                alert.error(e.message);
              } finally {
                setSubmitting(false);
              }
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Need an email address here';
              } else if (!emailRule.test(values.email)) {
                errors.email = 'Only domains google, yahoo, outlook, hotmail, mail accepted';
              }
              if (!values.password) {
                errors.password = 'Need a password here';
              } else if (!passwordRule.test(values.password)) {
                errors.password = 'Min length 8, 1 upper case, 1 number and 1 symbol(@,_,-,.,!)';
              }
              if (!values.first) {
                errors.first = 'Need first Name';
              } else if (!nameRule.test(values.first)) {
                errors.first = 'Need first Name';
              }
              if (!values.last) {
                errors.last = 'Need Last Name';
              } else if (!nameRule.test(values.last)) {
                errors.last = 'Need Last Name';
              }
              return errors;
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              isValid,
              errors,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit} validated={isValid}>
                <Row>
                  <Col xs={6} sm={6}>
                    <Form.Group controlId="formikfirst">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="first"
                        value={values.first}
                        onChange={handleChange}
                        isValid={touched.first && !errors.first}
                        isInvalid={touched.first && errors.first}
                        placeholder="First Name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.first}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={6}>
                    <Form.Group controlId="formiklast">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="last"
                        value={values.last}
                        onChange={handleChange}
                        isValid={touched.last && !errors.last}
                        isInvalid={touched.last && errors.last}
                        placeholder="Last Name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.last}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formikemail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                    placeholder="Email Address"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formikpass">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="success"
                  disabled={isSubmitting}
                  block
                >
                  {isSubmitting ? 'Creating ..' : 'Sign Up'}
                </Button>
              </Form>
            )}
          </Formik>

          <p>
            Already have an account? <Link to="/login">Log In</Link>.
              </p>
        </div>

      </ErrorBoundary>
    );
  }

  function renderConfirmationForm() {
    return (
      <ErrorBoundary>
        <div style={{ margin: '12px' }}>
          <h4 className="centerText">Sign Up</h4>
          <hr className="colorgraph" />
          <Alert variant="info">
            Enter your confirmation code.
        </Alert>
          <Formik
            initialValues={{
              code: '',
            }}
            onSubmit={async (values, { setSubmitting, dirty }) => {
              if (dirty) {
                alert.error('check provided inputs');
                return;
              }
              setSubmitting(true);
              const { code } = values;
              try {
                await Auth.confirmSignUp(mailId, code);
                await Auth.signIn(mailId, passwd);
                dispatch(onLogin());
                dispatch(refreshUserData());
                props.userHasAuthenticated(true);
              } catch (e) {
                alert.error(e.message);
                setSubmitting(false);
              }
            }}
            validate={(values) => {
              const errors = {};
              if (!values.code) {
                errors.code = 'Need Confirmation code here';
              } else if (!nameRule.test(values.code)) {
                errors.code = 'Need Confirmation code here';
              }
              return errors;
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              isValid,
              errors,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit} validated={isValid}>
                <Row>
                  <Col>
                    <Form.Group controlId="formikcode">
                      <Form.Label>Confirmation Code</Form.Label>
                      <Form.Control
                        type="tel"
                        name="code"
                        value={values.code}
                        onChange={handleChange}
                        isValid={touched.code && !errors.code}
                        isInvalid={touched.code && errors.code}
                        placeholder="Confirmation code"
                      />
                      <Form.Text className="text-muted">
                        Please check your email for the code..
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.code}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  variant="success"
                  disabled={isSubmitting}
                  block
                >
                  {isSubmitting ? 'Submitting ..' : 'Submit'}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Container className="Signup flex-fill mb-5" fluid>
        <AppHelmet title="Sign Up" />
        <PublicNavigation />
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={8} lg={6}>
            {newUser === null ? renderSignUp() : renderConfirmationForm()}
          </Col>
        </Row>
      </Container>
    </ErrorBoundary>
  );
}

export default Signup;
