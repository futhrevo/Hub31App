import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';

import { emailRule, nameRule } from '../../modules/forg-rules';

const Enroll = () => (
  <Card>
    <Card.Header className="text-center">Enroll Student</Card.Header>
    <Card.Body>
      <Formik
        initialValues={{ email: '', first: '', last: '' }}
        onSubmit={(values, { setSubmitting, dirty }) => {
          if (dirty) {
            // Bert.alert('check provided inputs', 'danger');
            return;
          }
          setSubmitting(true);
          const { email, first, last } = values;
          // eslint-disable-next-line no-unused-vars
          const user = {
            email,
            profile: {
              name: {
                first,
                last,
              },
            },
          };
          // Meteor.call('users.enrollemail', user, (error) => {
          //   setSubmitting(false);
          //   if (error) {
          //     Bert.alert(error.reason, 'danger');
          //   } else {
          //     Bert.alert('Account enrolled', 'success');
          //   }
          // });
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Need an email address here';
          } else if (!emailRule.test(values.email)) {
            errors.email = 'Only domains gmail, yahoo, outlook, hotmail, mail accepted';
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

              <Form.Group controlId="formikemail">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Student Email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                block
                type="submit"
                variant="outline-secondary"
                disabled={isSubmitting}
              >
                Enroll
            </Button>
            </Form>
          )}
      </Formik>
    </Card.Body>
  </Card>
);

export default Enroll;
