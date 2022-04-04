/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAlert } from 'react-alert';

import { TextEditor } from '../../../TextEditor';
import { titleRule } from '../../../../modules/forg-rules';
import { updateDocument } from '../../../../api/documents';

const DocumentEditor = (props) => {
  const { doc } = props;
  const alert = useAlert();
  return (
    <Formik
      initialValues={{
        title: (doc && doc.title) || '',
        body: (doc && doc.body) || '',
      }}
      onSubmit={async (values, { setSubmitting, dirty }) => {
        if (dirty) {
          alert.error('check provided inputs');
          return;
        }
        setSubmitting(true);
        const existingDocument = doc && doc.id;
        try {
          if (!existingDocument) {
            throw new Error('Document doesnt exist');
          }
          const response = await updateDocument(doc.id, values);
          const confirmation = existingDocument ? 'Document updated!' : 'Document added!';
          alert.success(confirmation);
          const { onSuccess } = props;
          onSuccess(existingDocument ? doc.id : response, values);
        } catch (e) {
          setSubmitting(false);
          alert.error("Unable to save changes");
          console.log(e);
        }
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        } else if (!titleRule.test(values.title)) {
          errors.title = 'Minimum 5 characters';
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
          <Form.Group controlId="formiktitle">
            <Form.Label>Title</Form.Label>
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
          <Form.Group controlId="formikbody">
            <Form.Label>Body</Form.Label>
            <TextEditor
              html={values.body}
              onChange={e => setFieldValue('body', e)}
              placeholder="Provide document body"
            />
          </Form.Group>
          <div className="text-center">
            <Button type="submit" variant="success" disabled={isSubmitting}>
              {doc && doc.id ? 'Save Changes' : 'Add Document'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

DocumentEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default DocumentEditor;
