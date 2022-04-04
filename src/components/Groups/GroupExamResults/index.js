import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  Container,
} from 'react-bootstrap';

import Loading from '../../Loading';
import NotFound from '../../../pages/NotFound';
import ResultTable from './components/ResultTable';
import PageHeader from '../../PageHeader';

const handleBack = (history) => {
  history.goBack();
};

class GroupExamResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      loading, quiz, results, history,
    } = this.props;
    if (loading) {
      return <Loading />;
    }
    if (!quiz) {
      return <NotFound />;
    }
    return (
      <Container className="flex-fill my-5">
        <div className="viewResults">
          <PageHeader title={quiz.title}>
            <ButtonToolbar className="float-right">
              <ButtonGroup size="sm">
                <Button onClick={() => handleBack(history)}>
                  &larr; Go Back
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </PageHeader>
          <ResultTable results={results} quiz={quiz} />
        </div>
      </Container>
    );
  }
}

GroupExamResults.propTypes = {
  loading: PropTypes.bool.isRequired,
  quiz: PropTypes.object,
  results: PropTypes.array,
  history: PropTypes.object.isRequired,
};

GroupExamResults.defaultProps = {
  loading: true,
}
export default GroupExamResults;
// withTracker(({ match }) => {
//   const groupId = match.params.gid;
//   const gqId = match.params.gqid;
//   const subscription = Meteor.subscribe('groupQuizResults.list', groupId, gqId);
//   return {
//     loading: !subscription.ready(),
//     quiz: GroupQuiz.findOne({ id: gqId }),
//     results: GQuizResults.find({ gqId }).fetch(),
//   };
// })(GroupExamResults);
