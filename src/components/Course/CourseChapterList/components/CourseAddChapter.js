import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

import { addChapter, updateChapter } from '../../../../redux/courses/chapterActions';
import { addChapterAPI, updateChapterAPI } from '../../../../api/chapters';
import FormErrorMsg from '../../../FormErrorMsg';
import { nameRule } from '../../../../modules/forg-rules';

const CourseAddChapter = ({ doc, courseId, onSuccess = () => ({}) }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  return (
    <Formik
      initialValues={{ desc: (doc && doc.desc) || '' }}
      onSubmit={async (values, { setSubmitting, dirty, resetForm }) => {
        if (dirty) {
          alert.error('check provided inputs');
          return;
        }
        setSubmitting(true);
        const existingDocument = doc && doc.id;
        try {
          const response = existingDocument ? await updateChapterAPI(courseId, doc.id, values) : await addChapterAPI(courseId, values);
          if (existingDocument) {
            dispatch(updateChapter(doc.id, courseId, values));
          } else {
            dispatch(addChapter(response, courseId, values));
          }
          const confirmation = existingDocument ? 'Chapter updated!' : 'Chapter added!';
          alert.success(confirmation);
          onSuccess();
          resetForm({ desc: '' });
        } catch (e) {
          alert.error("Unable to save changes");
        } finally {
          setSubmitting(false);
        }

      }}
      validate={(values) => {
        const errors = {};
        if (!values.desc) {
          errors.desc = 'Required';
        } else if (!nameRule.test(values.desc.trim())) {
          errors.desc = 'Required';
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
            <InputGroup className="p-3">
              <Form.Control
                type="text"
                placeholder="New Chapter name"
                name="desc"
                value={values.desc}
                onChange={handleChange}
                isValid={touched.desc && !errors.desc}
                isInvalid={touched.desc && errors.desc}
              />
              <InputGroup.Append>
                <Button
                  type="submit"
                  variant="outline-success"
                  disabled={isSubmitting}
                >
                  {doc && doc.id ? 'Edit Chapter name' : 'Add Chapter name'}
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <ErrorMessage component={FormErrorMsg} name="desc" />
          </Form>
        )}
    </Formik>
  )
};

CourseAddChapter.propTypes = {
  doc: PropTypes.object,
  courseId: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default CourseAddChapter;
