import React from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { CourseCoverImage } from '../CourseCoverImage';
import LeftIcon from './LeftIcon';
import styles from './styles';
import RightIcon from './RightIcon';
import Images from '../Images';
import { Loading } from '../Loading';

const CourseChapter = (props) => {
  const { doc, chaps, loadingMats, mats, doc2, loadingRlts } = props;
  const url = doc.name.substring(0, 2);

  return (
    <ScrollView>
      <CourseCoverImage
        url={Images[url]}
        title={`${doc.name} - ${doc.profession}`}
      />
      <Text style={styles.specText}>{chaps && `${chaps.description}`}</Text>
      <Divider style={styles.divider} />
      {loadingMats && loadingRlts ? (
        <Loading />
      ) : (
          <FlatList
            data={mats}
            renderItem={({ item }) => (
              <ListItem
                title={item.material_title}
                leftIcon={<LeftIcon material_type={item.material_type} />}
                rightIcon={<RightIcon matId={item._id} />}
                onPress={() =>
                  props.navigation.navigate('ClassContent', {
                    courseId: doc && doc._id,
                    chapterId: chaps && chaps._id,
                    matId: item._id,
                    eid: doc2 && doc2._id,
                  })
                }
              />
            )}
            keyExtractor={(item) => item._id}
          />
        )}
    </ScrollView>
  );
};

CourseChapter.propTypes = {
  navigation: PropTypes.object,
  doc: PropTypes.object,
  chaps: PropTypes.object,
  loadingMats: PropTypes.bool,
  doc2: PropTypes.object,
  mats: PropTypes.array,
  loadingRlts: PropTypes.bool,
};

export default withNavigation(CourseChapter);
