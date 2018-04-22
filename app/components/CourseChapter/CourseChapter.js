import React from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';

import { CourseCoverImage } from '../CourseCoverImage';
import LeftIcon from './LeftIcon';
import rightIcon from './RightIcon';
import styles from './styles';
import RightIcon from './RightIcon';

const joined = {
  url: require('../../../assets/f4.jpg'),
  title: 'F1 - Accountant in Business',
  chapter: 'Chapter 1 The purpose and types of business organisation',
};

const mats = [
  {
    material_title: 'Hello document title',
    material_type: 2,
    done: true,
  },
  {
    material_title: 'Hello document quiz',
    material_type: 0,
  },
  {
    material_title: 'Hello document video',
    material_type: 1,
  },
];

const CourseChapter = () => {
  return (
    <ScrollView>
      <CourseCoverImage url={joined.url} title={joined.title} />
      <Text style={styles.specText}>{joined.chapter}</Text>
      <Divider style={styles.divider} />
      <FlatList
        data={mats}
        renderItem={({ item }) => (
          <ListItem
            title={item.material_title}
            leftIcon={<LeftIcon material_type={item.material_type} />}
            rightIcon={<RightIcon done={item.done} />}
          />
        )}
        keyExtractor={(item) => item.material_title}
      />
    </ScrollView>
  );
};

export default CourseChapter;
