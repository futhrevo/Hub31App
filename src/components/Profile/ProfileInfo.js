import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useAlert } from 'react-alert';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Auth from '@aws-amplify/auth';
import { useDispatch } from 'react-redux';

import { refreshUserData } from '../../redux/accounts';

const ProfileInfo = ({ name, family_name, email, id }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        first: name,
        last: family_name,
      }}
      onSubmit={async (values, { setSubmitting, dirty }) => {
        if (dirty) {
          alert.error('check provided inputs');
          return;
        }
        setSubmitting(true);
        Object.keys(values).map(k => (values[k] = values[k].trim()));
        try {
          let user = await Auth.currentAuthenticatedUser();
          await Auth.updateUserAttributes(user, {
            name: values.first,
            family_name: values.last
          });
          await Auth.currentAuthenticatedUser({ bypassCache: true });
          dispatch(refreshUserData(true));
          alert.success('Profile Updated');
        } catch (e) {
          alert.error(e.message);
        } finally {
          setSubmitting(false);
        }
      }}
      validate={(values) => {
        const errors = {};
        if (!values.first.trim()) {
          errors.first = 'Required';
        }
        if (!values.last.trim()) {
          errors.last = 'Required';
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
            <Form.Group controlId="formProfilefname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first"
                value={values.first}
                onChange={handleChange}
                isValid={touched.first && !errors.first}
                isInvalid={touched.first && errors.first}
              />
              <Form.Control.Feedback type="invalid">
                {errors.first}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formProfilelname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last"
                value={values.last}
                onChange={handleChange}
                isValid={touched.last && !errors.last}
                isInvalid={touched.last && errors.last}
              />
              <Form.Control.Feedback type="invalid">
                {errors.last}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formProfileEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                plaintext
                readOnly
                defaultValue={email}
              />
            </Form.Group>

            <Form.Group controlId="formProfileId">
              <Form.Label>Unique Id</Form.Label>
              <Form.Control plaintext readOnly defaultValue={id} />
            </Form.Group>
            <div className="text-center">
              <Button type="submit" variant="success" disabled={isSubmitting}>
                Update Profile
          </Button>
            </div>
          </Form>
        )}
    </Formik>
  )
};

ProfileInfo.propTypes = {
  name: PropTypes.string,
  family_name: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  name: state?.Accounts?.name ?? '',
  family_name: state?.Accounts?.family_name ?? '',
  email: state?.Accounts?.email ?? '',
  id: state?.Accounts?.sub ?? '',
});
export default connect(mapStateToProps)(ProfileInfo);
