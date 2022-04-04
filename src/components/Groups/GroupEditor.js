import React, { Component } from 'react';
import { Form, Button, ButtonToolbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { titleRule, nameRule } from '../../modules/forg-rules';

const handleRemove = (id, history) => {
  if (window.confirm('Are you sure? This is permanent!')) {
    // Meteor.call('groups.del', id, (error) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //   } else {
    //     Bert.alert('Group deleted!', 'success');
    //     history.push('/groups');
    //   }
    // });
  }
};
class GroupEditor extends Component {
  render() {
    const { doc, history } = this.props;
    return (
      <Formik
        initialValues={{
          title: (doc && doc.title) || '',
          description: (doc && doc.description) || '',
        }}
        onSubmit={(values, { setSubmitting, dirty }) => {
          if (dirty) {
            // Bert.alert('check provided inputs', 'danger');
            return;
          }
          setSubmitting(true);
          const existingDocument = doc && doc.id;
          // const methodToCall = existingDocument
          //   ? 'groups.update'
          //   : 'groups.new';
          if (existingDocument) values.id = doc.id;
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Required';
          } else if (!titleRule.test(values.title)) {
            errors.title = 'Minimum 5 characters';
          }
          if (!values.description) {
            errors.description = 'Required';
          } else if (!nameRule.test(values.description)) {
            errors.description = 'Cannot be empty';
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
                  placeholder="Title for the group!"
                  onChange={handleChange}
                  isValid={touched.title && !errors.title}
                  isInvalid={touched.title && errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formikbody">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={values.description}
                  placeholder="Description for group"
                  onChange={handleChange}
                  isValid={touched.description && !errors.description}
                  isInvalid={touched.description && errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <ButtonToolbar className="justify-content-center">
                <Button type="submit" variant="success" disabled={isSubmitting}>
                  {doc && doc.id ? 'Save Changes' : 'Add Group'}
                </Button>
                {doc && doc.id ? (
                  <Button
                    className="ml-3"
                    variant="danger"
                    onClick={() => handleRemove(doc.id, history)}
                  >
                    Delete Group
                  </Button>
                ) : null}
              </ButtonToolbar>
            </Form>
          )}
      </Formik>
    );
  }
}

GroupEditor.defaultProps = {
  doc: { title: '', description: '' },
};

GroupEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};
export default GroupEditor;
