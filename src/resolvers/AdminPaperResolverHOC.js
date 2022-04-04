import React from "react";
import { getPaperAll } from '../api/questionpapers';

const AdminPaperResolverHOC = props => WrappedComponent => {
  class AdminPaperResolverHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        paper: {},
        questions: [],
        error: ""
      };
    }

    async fetchData(paperId) {
      try {
        const data = await getPaperAll(paperId);
        this.setState({
          paper: data.paper,
          questions: data.questions,
          loading: false
        });
      } catch (error) {
        console.log(error);
        this.setState({
          loading: false,
          error: error.message
        });
      }
    }

    async componentDidMount() {
      this.fetchData(this.props.match.params.id);
    }

    render() {
      const { error, loading, paper, questions } = this.state;
      return (
        <WrappedComponent paper={paper} loading={loading} questions={questions} error={error} {...this.props} />
      );
    }
  }

  AdminPaperResolverHOC.displayName = `AdminPaperResolverHOC(${WrappedComponent.name})`;
  return AdminPaperResolverHOC;
}

export default AdminPaperResolverHOC;
