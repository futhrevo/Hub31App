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
  {
    key: 3,
    url: require('../../../assets/f3.jpg'),
    title: 'F3 - Financial Accounting',
  },
  {
    key: 4,
    url: require('../../../assets/f4.jpg'),
    title: 'F4 - Corporate and Business Law (ENG)',
  },
  {
    key: 5,
    url: require('../../../assets/f5.jpg'),
    title: 'F5 - Performance Management',
  },
  {
    key: 6,
    url: require('../../../assets/f6.jpg'),
    title: 'F6 - Taxation (UK)',
  },
  {
    key: 7,
    url: require('../../../assets/f7.jpg'),
    title: 'F7 - Financial Reporting',
  },
  {
    key: 8,
    url: require('../../../assets/f8.jpg'),
    title: 'F8 - Audit and Assurance',
  },
  {
    key: 9,
    url: require('../../../assets/f9.jpg'),
    title: 'F9 - Financial Management',
  },
];
const Joined = () => (
  <ScrollView>
    {joined.map(({ key, url, title }) => <CourseCard key={key} url={url} title={title} />)}
  </ScrollView>
);

export default withNavigation(Joined);
