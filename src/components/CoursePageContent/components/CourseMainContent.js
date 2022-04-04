import React from 'react';
import PropTypes from 'prop-types';
import CourseSessionResolver from '../../../resolvers/CourseSessionResolver';
import { getNameProfession } from '../../../modules/utils';
import PageHeader from '../../PageHeader';

const CourseMainContent = (props) => {
  const {
    doc, csession,
  } = props;
  const sessMsg = CourseSessionResolver(csession);
  const { name, profession } = getNameProfession(doc && doc.title);

  return (
    <PageHeader title={name} subtitle={profession} sub2={sessMsg} />
  );
};

CourseMainContent.propTypes = {
  doc: PropTypes.object,
  spec: PropTypes.object,
  csession: PropTypes.object,
};

export default CourseMainContent;
