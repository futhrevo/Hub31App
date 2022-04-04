import Auth from '@aws-amplify/auth';
import { Formik } from 'formik';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import InputHint from '../../components/InputHint';
import PublicNavigation from '../../components/PublicNavigation';
import { emailRulep, nameRule, passwordRule } from '../../modules/forg-rules';
import ErrorBoundary from '../ErrorBoundary';


const RecoverPassword = (props) => {
  const [isConfirm, setConfirm] = useState(false)
  const [mailId, setMailId] = useState("");
  const { history } = props;
  const alert = useAlert();

  function renderForgotPasswd() {
    return (
      <ErrorBoundary>
        <div style={{ margin: '12px' }}>
          <h4 className="centerText">Recover Password</h4>
          <hr className="colorgraph" />
          <Alert variant="info">
            Enter your email address below to receive a code to reset your
            password.
        </Alert>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={async (values, { setSubmitting, dirty, resetForm }) => {
              if (dirty) {
                alert.error('check provided inputs');
              }
              setSubmitting(true);
              const { email } = values;
              setMailId(email);
              try {
                await Auth.forgotPassword(email);
                setConfirm(true);
                alert.info('Check your inbox for a reset code!');
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
              } else if (!emailRulep.test(values.email)) {
                errors.email = 'Only domains gmail, yahoo, outlook, hotmail, mail accepted';
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
                <Button
                  type="submit"
                  variant="success"
                  disabled={isSubmitting}
                  block
                >
                  {isSubmitting ? 'Working' : 'Recover Password'}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </ErrorBoundary>
    );
  }

  function renderConfirmationForm() {
    return (
      <ErrorBoundary>
        <div style={{ margin: '12px' }}>
          <h4 className="centerText">Recover Password</h4>
          <hr className="colorgraph" />
          <Alert variant="info">
            Enter your confirmation code and new password.
        </Alert>
          <Formik
            initialValues={{
              code: '', newpass: ''
            }}
            onSubmit={async (values, { setSubmitting, dirty }) => {
              if (dirty) {
                alert.error('check provided inputs');
                return;
              }
              setSubmitting(true);
              const { code, newpass } = values;
              try {
                await Auth.forgotPasswordSubmit(mailId, code, newpass);
                alert.success('Password reset succesfully. Login now');
                history.push('/');
              } catch (e) {
                alert.error(e.message);
              } finally {
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
              if (!values.newpass) {
                errors.newpass = 'Need New password here';
              } else if (!passwordRule.test(values.newpass)) {
                errors.newpass = 'at least 8 characters, 1 number, and one symbol($, _, -, !, .)';
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
                    <Form.Group controlId="formiknewpass">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="newpass"
                        placeholder="New Password"
                        value={values.newpass}
                        onChange={handleChange}
                        isValid={touched.newpass && !errors.newpass}
                        isInvalid={touched.newpass && errors.newpass}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.newpass}
                      </Form.Control.Feedback>
                      <InputHint>Use at least 8 characters.</InputHint>
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
      <Container className="RecoverPassword flex-fill mb-5" fluid>
        <PublicNavigation />
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={8} lg={6}>
            {!isConfirm ? renderForgotPasswd() : renderConfirmationForm()}
          </Col>
        </Row>
      </Container>
    </ErrorBoundary>
  );
}

export default RecoverPassword;
