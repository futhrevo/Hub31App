import React from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { getNameProfession } from '../../../../../modules/utils';

const CourseListRender = ({ data, index, }) => {
  if (!data) {
    return null;
  }
  if (!data.title) {
    return null;
  }
  const { name, profession } = getNameProfession(data && data.title);
  return (
    <LinkContainer to={`/course/${data.id}/p/outline`}>
      <div className="card fill-light-acc text-white showcase">
        <div className="card-body">
          <h5 className="card-title light">
            {`${name} - ${profession} `}
          </h5>
          <h6 className="card-subtitle">
            <small>{`${index} / ${data.totalC} done`}</small>
          </h6>
          {/* {chap && chap.description ? (
            <div className="card-text">
              <p>
                <strong>Next </strong>
                {chap.description}
              </p>
            </div>
          ) : null} */}
        </div>
      </div>
    </LinkContainer>
  )
};

CourseListRender.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
};

const mapStateToProps = (state, { id }) => {
  const estatus = state?.Programs?.EnCourses[id]?.statusid ?? [];
  const [index = 0] = estatus;
  return {
    data: state.Courses[id],
    index
  }
}

export default connect(mapStateToProps)(CourseListRender);
