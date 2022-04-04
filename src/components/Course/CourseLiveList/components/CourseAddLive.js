import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

import FormErrorMsg from '../../../FormErrorMsg';
import { createRTC } from '../../../../redux/live/liveReducer';

const CourseAddLive = ({ courseId, onSuccess = () => ({}) }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  return (
    <Formik
      initialValues={{ topic: '' }}
      onSubmit={async (values, { setSubmitting, dirty, resetForm }) => {
        if (dirty) {
          alert.error('check provided inputs');
          return;
        }
        setSubmitting(true);
        try {
          await dispatch(createRTC(courseId, values.topic.trim()));
          alert.success("Live is now running");
          onSuccess();
          // resetForm({ topic: '' });
        } catch (error) {
          alert.error("Unable to save changes");
          setSubmitting(false);
        }
      }}
      validate={(values) => {
        const errors = {};
        if (!values.topic) {
          errors.topic = 'Topic is required';
        } else {
          if (values.topic.length < 3) {
            errors.topic = 'Length should be greater than 3'
          }
        }
        return errors;
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        isValid,
        isSubmitting,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit} validated={isValid}>
          <div>Provide a Topic for Live</div>
          <InputGroup className="p-3">
            <FormControl
              type="text"
              placeholder="Topic for Live"
              name="topic"
              value={values.topic}
              onChange={handleChange}
              isValid={touched.topic && !errors.topic}
              isInvalid={touched.topic && errors.topic}
            />

            <InputGroup.Append>
              <Button
                type="submit"
                variant="outline-success"
                disabled={isSubmitting}
              >
                Create Live
                </Button>
            </InputGroup.Append>
          </InputGroup>
          <ErrorMessage component={FormErrorMsg} name="topic" />
        </Form>
      )}
    </Formik>
  );
}

export default CourseAddLive;
