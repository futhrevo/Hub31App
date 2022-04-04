import React from 'react';
import { Formik, } from 'formik';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

import { startSession, updateSession } from '../../../../api/csessions';
import { addSession, updateSession as updSession } from '../../../../redux/courses/sessionActions';
import { nameRule } from '../../../../modules/forg-rules';
import { getDateTimeLocal, getUnixTimestamp } from '../../../../modules/utils';

const CourseAddSession = ({ doc, courseId, onSuccess = () => ({}) }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  return (
    <Formik
      initialValues={{
        title: doc?.title ?? '',
        endDate: getDateTimeLocal(doc?.eAt),
        endTime: getDateTimeLocal(doc?.eAt, false)
      }}
      onSubmit={async (values, { setSubmitting, dirty, resetForm }) => {
        if (dirty) {
          alert.error('check provided inputs');
          return;
        }
        setSubmitting(true);
        const payload = {};
        payload.courseId = courseId;
        payload.eAt = getUnixTimestamp(values.endDate, values.endTime);
        payload.title = values.title;
        const existingDocument = doc && doc.cAt;
        try {
          if (existingDocument) {
            await updateSession(courseId, doc.cAt, payload.eAt, payload.title);
            dispatch(updSession(courseId, doc.cAt, payload.eAt, payload.title));
          } else {
            const cAt = await startSession(courseId, payload);
            payload.cAt = cAt;
            dispatch(addSession(courseId, payload));
          }
          const confirmation = existingDocument ? 'Session updated!' : 'Session added!';
          alert.success(confirmation);
          onSuccess();

        } catch (error) {
          alert.error("Unable to save changes");
        } finally {
          // setSubmitting(false);
        }
      }}
      validate={(values) => {
        const errors = {};
        if (!values.endDate) {
          errors.endDate = 'Required'
        }
        if (!values.endTime) {
          errors.endTime = 'Required'
        }
        if (getUnixTimestamp(values.endDate, values.endTime) < Date.now()) {
          errors.endTime = 'Time Should be later than current';
        }
        if (!values.title) {
          errors.title = 'Required';
        } else if (!nameRule.test(values.title.trim())) {
          errors.title = 'Required';
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
        <Form noValidate onSubmit={handleSubmit} validated={isValid} className="border rounded p-3 mb-3">
          <Form.Row className="justify-content-center align-items-end">
            <Col >
              <Form.Label htmlFor="titleInput">
                Title
                </Form.Label>
              <Form.Control
                className="mb-2"
                id="titleInput"
                name="title"
                placeholder="Title for session"
                value={values.title}
                onChange={handleChange}
                isValid={touched.title && !errors.title}
                isInvalid={touched.title && errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Col>
            <Col >
              <Form.Label htmlFor="dayInput">End Date</Form.Label>
              <Form.Control
                className="mb-2"
                type="date"
                name="endDate"
                min={getDateTimeLocal()}
                value={values.endDate}
                onChange={handleChange}
                isValid={touched.endDate && !errors.endDate}
                isInvalid={touched.endDate && errors.endDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.endDate}
              </Form.Control.Feedback>
            </Col>
            <Col >
              <Form.Label htmlFor="timeInput">End Time</Form.Label>
              <Form.Control
                className="mb-2"
                type="time"
                name="endTime"
                value={values.endTime}
                onChange={handleChange}
                isValid={touched.endTime && !errors.endTime}
                isInvalid={touched.endTime && errors.endTime}
              />
              <Form.Control.Feedback type="invalid">
                {errors.endTime}
              </Form.Control.Feedback>
            </Col>
          </Form.Row>
          <Form.Row className="justify-content-center">
            <Col >
              {doc && doc.cAt ? (
                <Button
                  className="mb-2 mr-5"
                  variant="outline-warning"
                  disabled={isSubmitting}
                  onClick={() => onSuccess()}
                >
                  Cancel
                </Button>
              ) : null}
              <Button
                className="mb-2"
                type="submit"
                variant="outline-success"
                disabled={isSubmitting}
              >
                {doc && doc.cAt ? 'Edit Session' : 'Add Session'}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      )}
    </Formik>
  )
};

CourseAddSession.propTypes = {
  doc: PropTypes.object,
  courseId: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default CourseAddSession;
