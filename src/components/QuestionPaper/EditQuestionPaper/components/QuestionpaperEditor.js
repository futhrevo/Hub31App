/* eslint-disable max-len, no-return-assign */
import { generatePath } from "react-router";
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Form, ButtonToolbar, Col } from 'react-bootstrap';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { getDateTimeLocal, getUnixTimestamp } from '../../../../modules/utils';
import { titleRule } from '../../../../modules/forg-rules';
import { updatePaperAPI, deletePaper } from '../../../../api/questionpapers';
import { pvtLinksMap } from '../../../../layouts/Routes';
import { lpath } from '../../../Course/ChapterMaterial/components/ChapterMaterialList';
import { updatePaper } from '../../../../redux/qpaper/actions';

const handleRemove = async (id, history, match, alert) => {
  if (window.confirm('Are you sure? This is permanent!')) {
    try {
      await deletePaper(id);
      alert.success("QuestionPaper deleted!");
      history.push(generatePath(lpath, match.params));
    } catch (e) {
      alert.error("Unable to delete Question paper");
    }
  }
};
const QuestionpaperEditor = (props) => {
  const { doc, history, match, selected, unused } = props;
  let dispatch = useDispatch();
  const alert = useAlert()
  return (
    <Formik
      initialValues={{
        title: doc?.title ?? '',
        public: doc?.public ?? false,
        criteria: doc?.criteria ?? 100,
        maxAttempts: doc?.criteria ?? 0,
        assay: (doc?.assay ?? 1).toString(),
        dur: doc?.dur ?? 0,
        showeAt: (doc?.eAt ?? 0) !== 0,
        endDate: getDateTimeLocal(doc?.eAt),
        endTime: getDateTimeLocal(doc?.eAt, false)
      }}
      onSubmit={async (values, { setSubmitting, dirty }) => {
        if (dirty) {
          alert.error('check provided inputs');
          return;
        }
        setSubmitting(true);
        const existingDocument = doc && doc.id;
        if (existingDocument) values.id = doc.id;
        const payload = { ...values };
        payload.questions = selected;
        payload.unused = unused;
        payload.assay = parseInt(values.assay);
        if (values.showeAt) {
          payload.eAt = getUnixTimestamp(values.endDate, values.endTime);
        } else {
          payload.eAt = 0;
        }
        ['showeAt', 'endDate', 'endTime'].forEach(el => delete payload[el]);
        try {
          if (!existingDocument) {
            throw new Error('Document doesnt exist');
          }
          const response = await updatePaperAPI(doc.id, payload);
          dispatch(updatePaper(doc.id, payload));
          const confirmation = existingDocument ? 'Question paper updated!' : 'Question paper added!';
          alert.success(confirmation);
          history.push(generatePath(pvtLinksMap.get("ViewQuestionpaper").path, { ...match.params, link: existingDocument ? doc.id : response }))
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
        if (values.showeAt) {
          if (!values.endDate) {
            errors.endDate = 'Required'
          }
          if (!values.endTime) {
            errors.endTime = 'Required'
          }
          if (getUnixTimestamp(values.endDate, values.endTime) < Date.now()) {
            errors.endTime = 'Time Should be later than current';
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
        isSubmitting,
      }) => (
        <Form noValidate onSubmit={handleSubmit} validated={isValid}>
          <Form.Group controlId="formiktitle">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              isValid={touched.title && !errors.title}
              isInvalid={touched.title && errors.title}
              placeholder="A name to identify the question paper"
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="dur">
              <Form.Label>Exam Duration (Minutes)</Form.Label>
              <Form.Control
                type="number"
                min={0}
                name="dur"
                value={values.dur}
                onChange={handleChange}
                isValid={touched.dur && !errors.dur}
                isInvalid={touched.dur && errors.dur}
                placeholder="Maximum Exam Duration"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="criteria">
              <Form.Label>Criteria in Minimum %</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={100}
                name="criteria"
                value={values.criteria}
                onChange={handleChange}
                isValid={touched.criteria && !errors.criteria}
                isInvalid={touched.criteria && errors.criteria}
                placeholder="Criteria for Evaluation"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="maxAttempts">
              <Form.Label>Max Attempts</Form.Label>
              <Form.Control
                type="number"
                min={0}
                name="maxAttempts"
                value={values.maxAttempts}
                onChange={handleChange}
                isValid={touched.maxAttempts && !errors.maxAttempts}
                isInvalid={touched.maxAttempts && errors.maxAttempts}
                placeholder="Maximum Allowed Attempts"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="assay">
              <Form.Label>Evaluation</Form.Label>
              <Form.Control
                type="number"
                as="select"
                name="assay"
                value={values.assay}
                onChange={handleChange}
              >
                <option value={0}>Manual</option>
                <option value={1}>Auto</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Check
                name="showeAt"
                defaultChecked={values.showeAt}
                onChange={handleChange}
                label="Enable Validity"
                id="validity"
              />
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
                disabled={!values.showeAt}
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
                disabled={!values.showeAt}
              />
              <Form.Control.Feedback type="invalid">
                {errors.endTime}
              </Form.Control.Feedback>
            </Col>
          </Form.Row>
          <Form.Group>
            <Form.Check
              name="public"
              defaultChecked={values.public}
              label="Is ready for exam?"
              onChange={handleChange}
              id="validationFormik0"
            />
          </Form.Group>
          <ButtonToolbar className="justify-content-center">
            <Button type="submit" variant="success" disabled={isSubmitting}>
              {doc && doc.id ? 'Save Changes' : 'Add Question Paper'}
            </Button>{' '}
            {doc && doc.id && false ? (
              <Button
                className="ml-3"
                variant="danger"
                onClick={() => handleRemove(doc.id, history, match, alert)}
              >
                Archive Paper
              </Button>
            ) : null}
          </ButtonToolbar>
        </Form>
      )}
    </Formik>
  );
}

QuestionpaperEditor.propTypes = {
  doc: PropTypes.object,
  selected: PropTypes.array,
  history: PropTypes.object.isRequired,
  match: PropTypes.object,
  unused: PropTypes.array
};

export default QuestionpaperEditor;
