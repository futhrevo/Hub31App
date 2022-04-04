import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAlert } from 'react-alert';
import Auth from '@aws-amplify/auth';

import InputHint from '../InputHint';
import { passwordRulep, passwordRule } from '../../modules/forg-rules';

const initialValues = { cupass: '', newpass: '', confpass: '' };
const ProfilePasswordChange = (props) => {
  const alert = useAlert();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, dirty, resetForm }) => {
        if (dirty) {
          alert.error('check provided inputs');
          return;
        }
        setSubmitting(true);
        const { cupass, confpass } = values;
        try {
          const user = await Auth.currentAuthenticatedUser();
          await Auth.changePassword(user, cupass, confpass);
          alert.success('Password Changed succesfully!');
          resetForm(initialValues);
        } catch (e) {
          alert.error(e.message);
        } finally {
          setSubmitting(false);
        }
      }}
      validate={(values) => {
        const errors = {};
        if (!values.cupass) {
          errors.cupass = 'Need current password here';
        } else if (!passwordRulep.test(values.cupass)) {
          errors.cupass = 'check your current password';
        }
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
            <Form.Group controlId="formikcupass">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="cupass"
                placeholder="Current Password"
                value={values.cupass}
                onChange={handleChange}
                isValid={touched.cupass && !errors.cupass}
                isInvalid={touched.cupass && errors.cupass}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cupass}
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
            <Form.Group controlId="formikconfpass">
              <Form.Label>Confirm Password</Form.Label>
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
            <div className="text-center">
              <Button type="submit" variant="success" disabled={isSubmitting}>
                {isSubmitting ? 'Working' : 'Change Password'}
              </Button>
            </div>
          </Form>
        )}
    </Formik>
  );
}

export default ProfilePasswordChange;
