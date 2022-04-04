import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import ChapterSelect from './components/ChapterSelect';
import ChapterMaterialList from './components/ChapterMaterialList';

const ChapterMaterial = (props) => {
  const { course, edit, match } = props;
  const pathname = `${match.url}/:chapId`;

  return (
    <div>
      <ChapterSelect path={pathname} course={course} />
      <Route path={pathname} render={(props) => <ChapterMaterialList courseId={course.id} edit={edit} {...props} />} />
    </div>
  );
};

ChapterMaterial.propTypes = {
  course: PropTypes.object,
  edit: PropTypes.bool,
};


export default ChapterMaterial;
