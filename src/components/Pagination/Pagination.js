import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const getRange = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };
    this.gotoPage = this.gotoPage.bind(this);
  }

  gotoPage = (page) => {
    const { totalRecords, pageLimit, onPageChanged = f => f } = this.props;
    const totalPages = Math.ceil(totalRecords / pageLimit);

    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = page => (evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = (evt) => {
    evt.preventDefault();
    const { pageNeighbours } = this.props;
    this.gotoPage(this.state.currentPage - pageNeighbours * 2 - 1);
  };

  handleMoveRight = (evt) => {
    evt.preventDefault();
    const { pageNeighbours } = this.props;
    this.gotoPage(this.state.currentPage + pageNeighbours * 2 + 1);
  };

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  fetchPageNumbers = () => {
    const { currentPage } = this.state;
    const { pageNeighbours, totalRecords, pageLimit } = this.props;
    const totalPages = Math.ceil(totalRecords / pageLimit);
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = getRange(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = getRange(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = getRange(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return getRange(1, totalPages);
  };

  render() {
    const { totalRecords, pageLimit } = this.props;
    const totalPages = Math.ceil(totalRecords / pageLimit);
    if (!totalRecords || totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav aria-label="Pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE) {
                return (
                  <li key={index} className="page-item">
                    <Button
                      className="page-link"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </Button>
                  </li>
                );
              }

              if (page === RIGHT_PAGE) {
                return (
                  <li key={index} className="page-item">
                    <Button
                      className="page-link"
                      aria-label="Next"
                      onClick={this.handleMoveRight}
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </Button>
                  </li>
                );
              }

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? ' active' : ''
                  }`}
                >
                  <Button
                    className="page-link"
                    onClick={this.handleClick(page)}
                  >
                    {page}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>
    );
  }
}
// pageNeighbours can be: 0, 1 or 2

Pagination.defaultProps = {
  pageLimit: 20,
  pageNeighbours: 0,
  onPageChanged: () => {},
};

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.oneOf([0, 1, 2]),
  onPageChanged: PropTypes.func,
};

export default Pagination;
