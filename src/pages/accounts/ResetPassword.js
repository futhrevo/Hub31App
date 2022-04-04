import { Formik } from 'formik';
import { useAlert } from 'react-alert';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import InputHint from '../../components/InputHint';
import { passwordRule } from '../../modules/forg-rules';
import ErrorBoundary from '../ErrorBoundary';


const ResetPassword = (props) => {
  const alert = useAlert();
  // const { history, match } = props;
  // const { token } = match.params;
  return (
    <ErrorBoundary>
      <Container className="ResetPassword flex-fill mb-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={8} lg={6} >
            <div style={{ margin: '12px' }}>
              <h4 className="centerText">Reset Password</h4>
              <hr className="colorgraph" />
              <Alert variant="info">
                To reset your password, enter a new one below. You will be
                logged in with your new password.
              </Alert>
              <Formik
                initialValues={{ newpass: '', confpass: '' }}
                onSubmit={(values, { setSubmitting, dirty }) => {
                  if (dirty) {
                    alert.error('check provided inputs');
                    return;
                  }
                  setSubmitting(true);
                  // const { newpass } = values;
                  // Accounts.resetPassword(token, newpass, (error) => {
                  //   setSubmitting(false);
                  //   if (error) {
                  //     Bert.alert(error.reason, 'danger');
                  //   } else {
                  //     Accounts.verifyEmail(token);
                  //     history.push('/');
                  //     Bert.alert('Password reset!', 'success');
                  //   }
                  // });
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.newpass) {
                    errors.newpass = 'Need New password here';
                  } else if (!passwordRule.test(values.newpass)) {
                    errors.newpass = 'at least 8 characters, 1 number, and one symbol($, _, -, !, .)';
                  } else if (!values.confpass) {
                    errors.confpass = 'Re-enter New password here';
                  } else if (values.newpass !== values.confpass) {
                    errors.confpass = 'should match new password';
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
                    <Form.Group controlId="formikconfpass">
                      <Form.Label>Repeat New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confpass"
                        placeholder="Confirm new Password"
                        value={values.confpass}
                        onChange={handleChange}
                        isValid={touched.confpass && !errors.confpass}
                        isInvalid={touched.confpass && errors.confpass}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confpass}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="success"
                      disabled={isSubmitting}
                      block
                    >
                      {isSubmitting ? 'Working' : 'Reset Password & Login'}
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

export default ResetPassword;
