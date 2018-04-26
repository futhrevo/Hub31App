import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

const MultiSelectList = (props) => {
  let { answers } = props;
  const {
    items, onChange, qid, sid,
  } = props;

  if (typeof answers === 'undefined') {
    answers = [];
  }
  if (typeof answers[sid] === 'undefined') {
    answers[sid] = [];
  }
  return (
    <View>
      <Text>Select one or more answer</Text>
      <ScrollView>
        {items.map((opt, index) => (
          <CheckBox
            key={index}
            title={opt}
            checked={answers[0].indexOf(index) > -1}
            onPress={() => onChange({ target: null }, 2, index, qid, 0)}
            checkedColor="#ff8100"
          />
        ))}
      </ScrollView>
    </View>
  );
};

MultiSelectList.propTypes = {
  items: PropTypes.array,
  answers: PropTypes.array,
  onChange: PropTypes.func,
  preview: PropTypes.bool,
  test: PropTypes.bool,
  qid: PropTypes.string,
  id: PropTypes.number,
  sid: PropTypes.number,
};

export default MultiSelectList;
