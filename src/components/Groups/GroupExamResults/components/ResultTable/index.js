import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import XlsExport from '../../../xls-export';

import './styles.scss';
import RenderQPreview from '../../../../QuestionPaper/components/RenderQPreview';
import isEmpty from '../../../../../modules/isEmpty';

// const getStudent = (id) => {
//   // const student = Meteor.users.findOne(id);
//   if (isEmpty('')) {
//     return id;
//   }
//   // return `${student.profile.name.last} ${student.profile.name.first}`;
// };

const getAnsClass = (q, ans) => {
  // const truth = Questions.findOne({ id: q }, { fields: { answers: 1 } });
  // if (isEmpty(truth)) {
  //   return false;
  // }
  // return _.isEqual(ans, truth.answers[0]);
  return false;
};

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      showPreview: false,
    };
    this.download = this.download.bind(this);
    this.onClickHeader = this.onClickHeader.bind(this);
    this.closePreview = this.closePreview.bind(this);
  }

  onClickHeader(q) {
    this.setState({ id: q, showPreview: true });
  }

  closePreview() {
    this.setState({ showPreview: false });
  }

  download(xl) {
    console.log('user wants to download csv');
    const { quiz } = this.props;
    const { sortedData } = this.reactTable.getResolvedState();
    const csvData = sortedData.map(el => {
      const { _original, _index, _nestingLevel, _subRows, ...result } = el;
      return result;
    }
    );
    const xls = new XlsExport(csvData, 'hub31Report');
    if (xl) {
      xls.exportToXLS(`${quiz && quiz.title}-${new Date().getTime()}.xls`);
    } else {
      xls.exportToCSV(`${quiz && quiz.title}-${new Date().getTime()}.csv`);
    }
  }

  render() {
    const { paper, quizResults } = this.props;
    const { id, showPreview } = this.state;
    const columns = [
      {
        Header: 'Name / Id',
        accessor: 'username',
        Footer: (
          <span>
            <strong>Average</strong>
          </span>
        ),
      },
      {
        id: 'attempt',
        Header: 'Attempt',
        accessor: d => d.marks.length,
        Footer: (
          <span>
            {Math.round(
              quizResults.reduce((a, b) => a + b.marks.length, 0) /
              quizResults.length,
            )}
          </span>
        ),
      },
      {
        id: 'maxmarks',
        Header: 'Max Marks',
        accessor: d => Math.max.apply(null, d.marks),
        Footer: (
          <span>
            {Math.round(
              quizResults.reduce(
                (a, b) => a + Math.max.apply(null, b.marks),
                0,
              ) / quizResults.length,
            )}
          </span>
        ),
      },
      {
        id: 'minmarks',
        Header: 'Min Marks',
        accessor: d => Math.min.apply(null, d.marks),
        Footer: (
          <span>
            {Math.round(
              quizResults.reduce(
                (a, b) => a + Math.min.apply(null, b.marks),
                0,
              ) / quizResults.length,
            )}
          </span>
        ),
      },
    ];

    const qColumns = paper.questions.map((q, index) => ({
      id: q,
      Header: () => (
        <Button onClick={() => this.onClickHeader(q)} block>
          Q{index + 1}
        </Button>
      ),
      accessor: d => (isEmpty(d.minAnswered[q]) ? null : d.minAnswered[q][0]),
      sortable: false,
      Cell: props => (
        <div
          className={getAnsClass(q, props.value) ? 'answer-cell' : 'wrong-cell'}
        >
          {props.value}
        </div>
      ),
      Footer: (
        <span>
          {Math.round(
            (quizResults.reduce((a, b) => {
              if (isEmpty(b.minAnswered)) return a;
              if (isEmpty(b.minAnswered[q])) return a;
              return getAnsClass(q, b.minAnswered[q][0]) ? a + 1 : a;
            }, 0) *
              100) /
            quizResults.length,
          )}
          %
        </span>
      ),
    }));

    return (
      <div className="result-table">
        <ButtonGroup>
          <Button onClick={() => this.download(false)}>Download as CSV</Button>
          <Button onClick={() => this.download(true)}>Download as XLS</Button>
        </ButtonGroup>
        <ReactTable
          ref={(r) => {
            this.reactTable = r;
          }}
          className="-striped -highlight"
          data={quizResults}
          columns={columns.concat(qColumns)}
        />
        <RenderQPreview id={id} show={showPreview} onHide={this.closePreview} />
      </div>
    );
  }
}

ResultTable.propTypes = {
  questions: PropTypes.array,
  quizResults: PropTypes.array,
  paper: PropTypes.object,
  quiz: PropTypes.object,
};

ResultTable.defaultProps = {
  paper: {},
  questions: [],
  quizResults: []
}
export default ResultTable;
// withTracker(({ quiz, results }) => {
//   const paper = QuestionPapers.findOne({ id: quiz.link }) || { questions: [] };
//   const questions = Questions.find({ id: { $in: paper.questions } }).fetch();
//   const quizResults = results.map((x) => {
//     const result = Object.assign({}, x);
//     const minVal = Math.min.apply(null, result.marks);
//     result.minIndex = result.marks.indexOf(minVal);
//     result.minAnswered = JSON.parse(result.answers[result.minIndex]);
//     result.username = getStudent(result.userId);
//     delete result.answers;
//     return result;
//   });

//   return {
//     paper,
//     questions,
//     quizResults,
//   };
// })(ResultTable);
