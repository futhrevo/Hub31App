import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';

import { nameRule, gradeRule } from '../../modules/forg-rules';
import { getNameProfession } from '../../modules/utils';
import { createCourse, updateCourse } from '../../api/courses';
import { updateCourseInfo } from '../../redux/courses/actions';

const CourseInfoContent = (props) => {
  const { course, history, edit = false, dispatchUpdate } = props;
  const alert = useAlert();
  const { name, profession } = getNameProfession(course?.title ?? '');
  return (
    <Formik
      initialValues={{
        name: name,
        profession: profession,
        // specializationid: (course && course.specializationid) || '',
        content: (course && course.content) || '',
        longdesc: (course && course.longdesc) || '',
        min_grade: (course && course.min_grade) || 0,
      }}
      onSubmit={async (values, { setSubmitting, dirty }) => {
        if (dirty) {
          alert.error('check provided inputs');
          return;
        }
        setSubmitting(true);
        const existingDocument = course && course.id;
        try {
          const response = existingDocument ? await updateCourse(course.id, values) : await createCourse(values);
          if (existingDocument) {
            dispatchUpdate(course.id, values);
          }
          const confirmation = existingDocument ? 'Course updated!' : 'Course added!';
          alert.success(confirmation);
          history.push(`/courses/${existingDocument ? course.id : response}`)
        } catch (e) {
          setSubmitting(false);
          alert.error("Unable to save changes");
          console.log(e);
        }
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        } else if (!nameRule.test(values.name.trim())) {
          errors.name = 'Required';
        }
        if (!values.profession) {
          errors.profession = 'Required';
        } else if (!nameRule.test(values.profession.trim())) {
          errors.profession = 'Required';
        }
        // if (!values.specializationid) {
        //   errors.specializationid = 'Required';
        // } else if (!nameRule.test(values.specializationid.trim())) {
        //   errors.specializationid = 'Required';
        // }
        if (!values.content) {
          errors.content = 'Required';
        } else if (!nameRule.test(values.content.trim())) {
          errors.content = 'Required';
        }
        if (!gradeRule.test(values.min_grade)) {
          errors.min_grade = 'Between 0 and 100';
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
        setFieldValue,
        isSubmitting,
      }) => (

        <Form noValidate onSubmit={handleSubmit} validated={isValid}>
          <Form.Row>
            <Col>
              <Form.Group controlId="formiktitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name.toUpperCase()}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && errors.name}
                  readOnly={!edit}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="formikprof">
                <Form.Label>Profession</Form.Label>
                <Form.Control
                  type="text"
                  name="profession"
                  value={values.profession}
                  onChange={handleChange}
                  isValid={touched.profession && !errors.profession}
                  isInvalid={touched.profession && errors.profession}
                  readOnly={!edit}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.profession}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formikmin">
                <Form.Label>Minimum grade</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="min_grade"
                    value={values.min_grade}
                    onChange={handleChange}
                    isValid={touched.min_grade && !errors.min_grade}
                    isInvalid={touched.min_grade && errors.min_grade}
                    readOnly={!edit}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>

                <Form.Control.Feedback type="invalid">
                  {errors.min_grade}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Group controlId="formikcontent">
            <Form.Label>Short Description</Form.Label>
            {edit ? (
              <Form.Control
                as="textarea"
                rows="2"
                name="content"
                value={values.content}
                onChange={handleChange}
                isValid={touched.content && !errors.content}
                isInvalid={touched.content && errors.content}
              />
            ) : (
              <div className="p-3 fill-gray-disabled">{values.content}</div>
            )}

            <Form.Control.Feedback type="invalid">
              {errors.content}
            </Form.Control.Feedback>
          </Form.Group>
          {edit && (
            <div className="text-center">
              <Button type="submit" variant="success" disabled={isSubmitting}>
                {course && course.id ? 'Save Changes' : 'Add Course'}
              </Button>
            </div>
          )}
        </Form>

      )}
    </Formik>
  );
}

CourseInfoContent.propTypes = {
  course: PropTypes.object,
  history: PropTypes.object,
  edit: PropTypes.bool,
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdate: (courseId, data) => {
      dispatch(updateCourseInfo(courseId, data))
    }
  }
}

export default connect(null, mapDispatchToProps)(CourseInfoContent);
