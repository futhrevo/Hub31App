import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { upsertmatAPI } from '../../../../../../../api/materials';
import { gradeRule, nameRule } from '../../../../../../../modules/forg-rules';
import { addMaterial, updateMaterial } from '../../../../../../../redux/courses/materialActions';
import MaterialSearch from './components/MaterialSearch';


const ChapterAddMaterial = ({
  doc,
  courseId,
  chapterId,
  onSuccess = () => ({}),
}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [create_src, setCreate] = useState(true);
  const existingDocument = doc && doc.id;

  return (
    <Formik
      initialValues={{
        title: (doc && doc.title) || '',
        link: (doc && doc.link) || '',
        mdy: (doc && doc.mdy) || true,
        points: (doc && doc.points) || 1,
        mtype: (doc && doc.mtype.toString()) || '0',
        create_src: true
      }}
      onSubmit={async (values, { setSubmitting, dirty, resetForm }) => {
        if (dirty) {
          alert.error('check provided inputs');
          return;
        }
        setSubmitting(true);

        values.mtype = parseInt(values.mtype);
        values.create_src = create_src;
        try {
          const { mId, docId } = await upsertmatAPI(courseId, chapterId, values, (doc && doc.id) || null);
          values.link = docId;
          if (existingDocument) {
            dispatch(updateMaterial(mId, chapterId, courseId, values));
          } else {
            dispatch(addMaterial(mId, chapterId, courseId, values));
          }
          const confirmation = existingDocument ? 'Material updated!' : 'Material added!';
          alert.success(confirmation);
          onSuccess();
          resetForm({
            title: '',
            link: '',
            mdy: true,
            points: 1,
            mtype: '0',
          });
        } catch (e) {
          console.warn(e)
          alert.error("Unable to save changes");
        } finally {
          setSubmitting(false);
        }
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        } else if (!nameRule.test(values.title.trim())) {
          errors.title = 'Required';
        }
        if (!gradeRule.test(values.points)) {
          errors.points = 'Between 0 and 100';
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
        setFieldValue,
        errors,
      }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            validated={isValid}
            className="border"
          >
            <Form.Row className="p-3">
              <Col>
                <Form.Group controlId="formiktype">
                  <Form.Label>Material Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="mtype"
                    value={values.mtype}
                    onChange={handleChange}
                    disabled={existingDocument}
                  >
                    <option value="2">Document</option>
                    <option value="0">Quiz</option>
                    <option value="1">Video</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formiktitle">
                  <Form.Label>Material Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isValid={touched.title && !errors.title}
                    isInvalid={touched.title && errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formikmin">
                  <Form.Label>Points</Form.Label>
                  <Form.Control
                    type="number"
                    name="points"
                    value={values.points}
                    onChange={handleChange}
                    isValid={touched.points && !errors.points}
                    isInvalid={touched.points && errors.points}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.points}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formikcreate">
                  <Form.Check
                    type="checkbox"
                    checked={create_src}
                    onChange={e => setCreate(e.target.checked)}
                    label="Create the resource"
                    disabled={existingDocument}
                  />
                </Form.Group>
                <Form.Group controlId="formikman">
                  <Form.Check
                    type="checkbox"
                    name="mdy"
                    label="Is this Required to complete?"
                  />
                </Form.Group>
              </Col>
              {create_src ? null : <Col>
                <Form.Group controlId="formikserarch">
                  <Form.Label>Material Link</Form.Label>
                  <div className="border">
                    <MaterialSearch
                      type={values.mtype}
                      selected={values.link}
                      onSelectMat={setFieldValue}
                    />
                  </div>
                </Form.Group>
              </Col>}

            </Form.Row>
            <div className="text-center p-3">
              <Button type="submit" variant="success" disabled={isSubmitting}>
                {doc && doc.id ? 'Save Changes' : 'Add Material'}
              </Button>
            </div>
          </Form>
        )}
    </Formik>
  )
};

ChapterAddMaterial.propTypes = {
  doc: PropTypes.object,
  courseId: PropTypes.string,
  chapterId: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default ChapterAddMaterial;
