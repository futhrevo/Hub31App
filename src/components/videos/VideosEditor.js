import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAlert } from 'react-alert';

import { TextEditor } from '../TextEditor';
import { titleRule, urlRule } from '../../modules/forg-rules';
import {
  generateVideoUrl,
  generatePosterUrl,
} from '../../modules/generate-urls';
import { updateVid } from '../../api/videos';

const VideosEditor = (props) => {
  const { doc } = props;
  const alert = useAlert();
  return (
    <Formik
      initialValues={{
        title: (doc && doc.title) || '',
        body: (doc && doc.body) || '',
        link: (doc && doc.link) || '',
        poster: (doc && doc.poster) || '',
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
          const response = await updateVid(doc.id, values);
          const confirmation = existingDocument ? 'Video updated!' : 'Video added!';
          alert.success(confirmation);
          const { onSuccess } = props;
          onSuccess(doc.id || response, values);
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
        if (values.link) {
          if (!urlRule.test(values.link)) {
            errors.link = 'check link';
          }
        }
        if (values.poster) {
          if (!urlRule.test(values.poster)) {
            errors.poster = 'check link';
          }
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
              placeholder="Title"
              value={values.title}
              onChange={handleChange}
              isValid={touched.title && !errors.title}
              isInvalid={touched.title && errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          {doc &&
            doc.id && (
              <Button
                className="float-right"
                variant="info"
                size="sm"
                type="reset"
                onClick={() => {
                  setFieldValue(
                    'link',
                    generateVideoUrl('userId', doc.id),
                  );
                  setFieldValue(
                    'poster',
                    generatePosterUrl('userId', doc.id),
                  );
                }}
              >
                Reset Links
              </Button>
            )}
          <Form.Group controlId="formikurl">
            <Form.Label>Link</Form.Label>
            <Form.Control
              type="text"
              name="link"
              placeholder="Blank for default links"
              value={values.link}
              onChange={handleChange}
              isValid={touched.link && !errors.link}
              isInvalid={touched.link && errors.link}
            />
            <Form.Control.Feedback type="invalid">
              {errors.link}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formikposter">
            <Form.Label>Poster</Form.Label>
            <Form.Control
              type="text"
              name="poster"
              placeholder="Blank for default links"
              value={values.poster}
              onChange={handleChange}
              isValid={touched.poster && !errors.poster}
              isInvalid={touched.poster && errors.poster}
            />
            <Form.Control.Feedback type="invalid">
              {errors.poster}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formikbody">
            <Form.Label>Description(optional)</Form.Label>
            <TextEditor
              html={values.body}
              onChange={e => setFieldValue('body', e)}
              placeholder="Provide Video Description here..."
            />
          </Form.Group>
          <div className="text-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving' : 'Save'}
            </Button>{' '}
          </div>
        </Form>
      )}
    </Formik>
  );
}

VideosEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object,
  onSuccess: PropTypes.func,
};

export default VideosEditor;
