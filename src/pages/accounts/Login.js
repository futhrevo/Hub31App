import Auth from '@aws-amplify/auth';
import { Formik } from 'formik';
import { useAlert } from 'react-alert';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AppHelmet from '../../components/AppHelmet';
import PublicNavigation from '../../components/PublicNavigation';
import { emailRulep, passwordRulep } from '../../modules/forg-rules';
import { onLogin, refreshUserData } from '../../redux/accounts';
import ErrorBoundary from '../ErrorBoundary';

const Login = (props) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  return (
    <ErrorBoundary>
      <Container className="Login flex-fill mb-5" fluid>
        <AppHelmet title="Log In" />
        <PublicNavigation />
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={8} lg={6}>
            <div style={{ margin: '12px' }}>
              <h4 className="centerText">Log In</h4>
              <hr className="colorgraph" />
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={async (values, { setSubmitting, dirty }) => {
                  if (dirty) {
                    alert.error('check provided inputs');
                    return;
                  }
                  setSubmitting(true);
                  const { email, password } = values;
                  try {
                    await Auth.signIn(email, password);
                    alert.removeAll();
                    alert.success('Logged in!');
                    dispatch(onLogin());
                    dispatch(refreshUserData());
                    props.userHasAuthenticated(true);
                  } catch (e) {
                    setSubmitting(false);
                    alert.error(e.message);
                  }
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Need an email address here';
                  } else if (!emailRulep.test(values.email)) {
                    errors.email = 'Only domains gmail, yahoo, outlook, hotmail, mail accepted';
                  }
                  if (!values.password) {
                    errors.password = 'Need a password here';
                  } else if (!passwordRulep.test(values.password)) {
                    errors.password = 'should be atleast 5 letters';
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
                    <Form.Group controlId="formikemail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
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
                      <Form.Label className="w-100">
                        <span className="float-left">Password</span>
                        <Link className="float-right" to="/recover-password">
                          Forgot Password?
                      </Link>
                      </Form.Label>
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
                      {isSubmitting ? 'Logging In' : 'Log In'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </ErrorBoundary>
  );
}

export default Login;
