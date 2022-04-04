import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';

import Loading from '../Loading';
import { nameRule } from '../../modules/forg-rules';
import { TextEditor } from '../TextEditor';
import FormErrorMsg from '../FormErrorMsg';
import { courseResources } from '../../api/courses';
import { fetchRscDoc, updateCourseRsc } from '../../redux/courses/docActions';


const CourseEditResources = (props) => {
  const { edit, course, loading, doc, dispatchFetchDoc, dispatchUpdate } = props;
  const alert = useAlert();

  useEffect(() => {
    dispatchFetchDoc(course.id, course.resources);
  }, [dispatchFetchDoc, course.id, course.resources])

  if (loading === undefined || loading) {
    return <Loading />;
  }


  return (
    <Formik
      initialValues={{ body: (doc && doc.body) || `${course.name} Resources` }}
      onSubmit={async (values, { setSubmitting, dirty }) => {
        if (dirty) {
          alert.error('check provided inputs');
          return;
        }
        setSubmitting(true);
        try {
          await courseResources(course.id, values);
          dispatchUpdate(course.id, values.body);
          const confirmation = doc && doc.body ? 'Course doc updated!' : 'Course doc added!';
          alert.success(confirmation);
        } catch (error) {
          alert.error('Unable to create About document');
        } finally {
          setSubmitting(false);
        }
      }}
      validate={(values) => {
        const errors = {};
        if (!values.body) {
          errors.body = 'Required';
        } else if (!nameRule.test(values.body.trim())) {
          errors.body = 'Required';
        }
        return errors;
      }}
    >
      {({
        handleSubmit, values, isValid, setFieldValue, isSubmitting,
      }) => (
          <Form noValidate onSubmit={handleSubmit} validated={isValid}>
            <Form.Label>Course Resources</Form.Label>
            <Form.Group controlId="formikabtbody">
              {edit ? (
                <TextEditor
                  html={values.body}
                  onChange={e => setFieldValue('body', e)}
                  placeholder="Provide Course Resources"
                />
              ) : (
                  <div
                    className="p-3 fill-gray-disabled"
                    dangerouslySetInnerHTML={{ __html: doc.body }}
                  />
                )}
              <ErrorMessage component={FormErrorMsg} name="body" />
            </Form.Group>
            {edit && (
              <div className="text-center">
                <Button type="submit" variant="success" disabled={isSubmitting}>
                  Save Changes
      </Button>
              </div>
            )}
          </Form>
        )}
    </Formik>
  );
};

CourseEditResources.propTypes = {
  doc: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  course: PropTypes.object,
  msg: PropTypes.string,
  edit: PropTypes.bool,
};
CourseEditResources.defaultProps = {
  loading: true,
}

const mapStateToProps = (state, { course }) => ({
  loading: state.Courses[course.id]?.resources?.loading,
  doc: state.Courses[course.id]?.resources ?? {}
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetchDoc: (courseId, docId) => {
      dispatch(fetchRscDoc(courseId, docId))
    },
    dispatchUpdate: (courseId, body) => {
      dispatch(updateCourseRsc(courseId, body))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditResources);

