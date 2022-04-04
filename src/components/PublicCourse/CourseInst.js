import React from 'react';

import PropTypes from 'prop-types';

const CourseInst = ({ doc, discovering }) => {
  return (
    <div className="courseInst">

    </div>
  )
};

CourseInst.propTypes = {
  doc: PropTypes.object,
  discovering: PropTypes.bool,
};
CourseInst.defaultProps = {
  doc: {},
  discovering: true,
}
export default CourseInst;
// (CourseInstContainer = withTracker(() => {
//   const subscription = Meteor.subscribe('courses.viewJoined');
//   return {
//     discovering: !subscription.ready(),
//     doc: {},
//   };
// })(CourseInst));

/**       <hr />
      <h4>Institution</h4>
      <Row>
        <Col md={12}>
          <UserAvatar size="50" name="Institute" className="float-right p-3" />
          <p className="inst-desc">
            Lorem Ipsum has been the industry&apos;s standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages
        </p>
        </Col>
      </Row>
 */
