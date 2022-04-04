import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import SearchInput from '../SearchInput/SearchInput';
import delay from '../../modules/delay';

class PaperSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: false,
      searching: false,
      search: '',
      results: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.renderCollection = this.renderCollection.bind(this);
  }

  handleSearch(event) {
    event.persist();
    if (event.target.value.trim() !== '') {
      this.setState({ typing: true });
      delay(() => this.fetchQPapers(event.target.value.trim()), 500);
    } else {
      this.setState({ typing: false });
    }
  }

  fetchQPapers(search) {
    const re = /^[-\w]+$/i;
    // Test if input is valid
    if (!re.test(search) || search.length < 3) {
      this.setState({ results: [], search });
    }
    this.setState({ searching: true, search });
    // Meteor.call('questionPapers.search', search, (error, results) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'danger');
    //     this.setState({ typing: false, searching: false });
    //   } else {
    //     this.setState({ results, search, searching: false });
    //   }
    // });
  }

  renderMessage() {
    const {
      typing, searching, results, search,
    } = this.state;
    let msg = '';
    if (searching) {
      msg = `searching for "${search}"`;
    } else if (typing) {
      msg = `showing ${results.length} results for "${search} "`;
    }

    return (
      <div className="centerText" style={{ margin: '10px' }}>
        {msg}
      </div>
    );
  }

  renderCollection() {
    const { typing, results } = this.state;
    const { onQselect } = this.props;
    if (!typing) return null;
    return results.map(doc => (
      <ListGroup.Item key={doc.id} onClick={() => onQselect(doc)}>
        {doc.title}
        <span className="badge">{doc.questions.length}</span>
      </ListGroup.Item>
    ));
  }

  render() {
    return (
      <div>
        <h4>Select a Question paper</h4>
        <SearchInput
          placeholder="Search with Question paper title"
          onKeyUp={this.handleSearch}
        />
        {this.renderMessage()}
        <ListGroup>{this.renderCollection()}</ListGroup>
      </div>
    );
  }
}

PaperSelection.propTypes = {
  onQselect: PropTypes.func,
};

export default PaperSelection;
