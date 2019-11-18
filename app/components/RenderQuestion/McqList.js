import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

import styles from './styles';

const McqList = (props) => {
  let { answers } = props;
  const { items, onChange, qid, sid } = props;

  if (typeof answers === 'undefined') {
    answers = [];
  }
  if (typeof answers[sid] === 'undefined') {
    answers[sid] = [];
  }
  return (
    <View>
      <Text>Select a answer</Text>
      <ScrollView>
        {items.map((opt, index) => (
          <CheckBox
            key={index}
            title={opt}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={answers[sid].indexOf(index) > -1}
            onPress={() => onChange({ target: null }, 1, index, qid, sid)}
            checkedColor="#ff8100"
          />
        ))}
      </ScrollView>
    </View>
  );
};

McqList.propTypes = {
  items: PropTypes.array,
  answers: PropTypes.array,
  onChange: PropTypes.func,
  preview: PropTypes.bool,
  test: PropTypes.bool,
  qid: PropTypes.string,
  id: PropTypes.number,
  sid: PropTypes.number,
};
export default McqList;
