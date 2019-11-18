import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

const OneBlankInput = (props) => {
  let { answers } = props;
  const { id, qid, sid, onChange } = props;
  if (typeof answers === 'undefined') {
    answers = [];
  }
  if (typeof answers[sid] === 'undefined') {
    answers[sid] = [''];
  }

  return (
    <View>
      <Input
        placeholder="Type answer here"
        value={answers[sid][0]}
        onChangeText={(text) => onChange({ target: text }, 4, 0, qid, sid)}
      />
    </View>
  );
};

OneBlankInput.propTypes = {
  onChange: PropTypes.func,
  answers: PropTypes.array,
  id: PropTypes.number,
  qid: PropTypes.string,
  sid: PropTypes.number,
};

export default OneBlankInput;
