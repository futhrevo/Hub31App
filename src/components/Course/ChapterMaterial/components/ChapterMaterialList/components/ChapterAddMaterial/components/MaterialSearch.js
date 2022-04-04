import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import SearchInput from '../../../../../../../SearchInput/SearchInput';
import delay from '../../../../../../../../modules/delay';
import { searchAPI } from '../../../../../../../../api/utils';

class MaterialSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: false,
      searching: false,
      search: '',
      results: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.persist();
    if (event.target.value.trim() !== '') {
      this.setState({ typing: true });
      delay(() => this.fetchDocuments(event.target.value.trim(), this.props.userId), 500);
    } else {
      this.setState({ typing: false });
    }
  }

  async fetchDocuments(search, userId) {
    const { type } = this.props;
    const re = /^[-\w]+$/i;
    if (!re.test(search) || search.length < 3) {
      this.setState({ results: [], search });
      return;
    }
    this.setState({ searching: true, search });
    try {
      const took = await searchAPI(search, userId, type);
      // const count = await countDoc(userId);
      const results = ((took.hits || {}).hits || []).map(el => ({ id: el.id, title: el._source.title }));
      this.setState({ results, search, searching: false });
    } catch (error) {
      this.setState({ typing: false, searching: false });
    }
  }

  renderCollection() {
    const { results } = this.state;
    const { selected, onSelectMat } = this.props;
    return results.map(({ id, title }) => (
      <ListGroup.Item
        key={id}
        onClick={() => onSelectMat('link', id)}
        active={selected === id}
      >
        <div className="list-text">
          <strong>{title}</strong>
        </div>
      </ListGroup.Item>
    ));
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

  render() {
    return (
      <ListGroup className="p-3">
        <SearchInput
          placeholder="Search with title"
          onKeyUp={this.handleSearch}
        />
        {this.renderMessage()}
        {this.renderCollection()}
      </ListGroup>
    );
  }
}

MaterialSearch.propTypes = {
  selected: PropTypes.string,
  onSelectMat: PropTypes.func,
  type: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userId: state?.Accounts?.sub,
});

export default connect(mapStateToProps)(MaterialSearch);
