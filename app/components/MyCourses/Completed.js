import React from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';

import { CourseCard } from '../CourseCard';

const joined = [
  {
    key: 1,
    url: require('../../../assets/f1.jpg'),
    title: 'F1 - Accountant in Business',
  },
  {
    key: 2,
    url: require('../../../assets/f2.jpg'),
    title: 'F2 - Management Accounting',
  },
];
const Completed = () => (
  <ScrollView>
    {joined.map(({ key, url, title }) => <CourseCard key={key} url={url} title={title} />)}
  </ScrollView>
);

export default withNavigation(Completed);
