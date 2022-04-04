import { Formik } from 'formik';
import { useAlert } from 'react-alert';
import { Button, Col, Form } from 'react-bootstrap';
import { usePaper } from '../../context';
import { bulkGradeAssignAPI } from '../../../../api/sturesults';
import { QPaperResult } from '../../../../redux/qpaper/reducer';

const ResultsForm = ({ results, selected, setData }: { results: { [x: string]: QPaperResult }, selected: Array<string>, setData: (data: any) => void }) => {
  const alert = useAlert();
  const { state: { courseId, chapId, matId, link: quizId } } = usePaper();

  return (
    <Formik
      initialValues={{
        agg: 0,
        points: 1
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const payload: any = {};
          let maxmsg = '';
          selected.forEach((el: string) => {
            const data = results[el];
            const sess = Math.trunc(data.sessUat);
            if (data.score > values.agg) {
              maxmsg = `${data.fname || data.stuId} is awarded ${data.score} where max is ${values.agg}`
            }
            const stu = {
              stuId: el,
              score: data.score
            };
            if (payload[sess]) {
              payload[sess].push(stu);
            } else {
              payload[sess] = [stu];
            }
          });
          if (selected.length === 0) {
            return alert.error('No Students selected')
          }
          if (maxmsg) {
            return alert.error(maxmsg);
          }
          if (courseId && chapId && matId && quizId) {
            await bulkGradeAssignAPI(courseId, chapId, matId, quizId, values.agg, values.points, payload);
            const newRes = { ...results };
            selected.forEach(el => delete newRes[el]);
            setData(newRes);
          } else {
            alert.error("Unable to save changes, State Error 40")
          }
        } catch (e) {
          console.warn(e)
          alert.error("Unable to save changes");
        } finally {
          setSubmitting(false);
        }
      }}
      validate={(values) => {
        const errors = {};
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
        <Form
          noValidate
          onSubmit={handleSubmit}
          validated={isValid}
          className="m-3"
        >
          <Form.Row className="align-items-end">
            <Form.Group as={Col} controlId="agg">
              <Form.Label>Score Total</Form.Label>
              <Form.Control
                type="number"
                min={0}
                name="agg"
                value={values.agg}
                onChange={handleChange}
                isValid={touched.agg && !errors.agg}
                isInvalid={Boolean(touched.agg && errors.agg)}
                placeholder="Total"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="points">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                min={0}
                name="points"
                value={values.points}
                onChange={handleChange}
                isValid={touched.points && !errors.points}
                isInvalid={Boolean(touched.points && errors.points)}
                placeholder="Total"
              />
            </Form.Group>
            <Button type="submit" variant="success" disabled={isSubmitting} className="mb-3">
              Grade Selected
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
}

export default ResultsForm;


