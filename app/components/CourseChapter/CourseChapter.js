import React from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { CourseCoverImage } from '../CourseCoverImage';
import LeftIcon from './LeftIcon';
import styles from './styles';
import RightIcon from './RightIcon';
import { DocumentView } from '../DocumentView';
import { VideoView } from '../VideoView';
import { QuizView } from '../QuizView';

const joined = {
  url: require('../../../assets/F4.jpg'),
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

const CourseChapter = (props) => {
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
            onPress={() =>
              props.navigation.navigate('ClassContent', {
                materialType: item.material_type,
              })
            }
          />
        )}
        keyExtractor={(item) => item.material_title}
      />
    </ScrollView>
  );
};

CourseChapter.propTypes = {
  navigation: PropTypes.object,
};

export default withNavigation(CourseChapter);
