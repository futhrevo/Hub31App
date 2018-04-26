import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';

import OneBlankInput from './OneBlankInput';
import McqList from './McqList';
import McqSelectList from './MultiSelectList';
import McqTableList from './McqTableList';
import styles from './styles';

const RenderQuestion = ({
  ques, id, qid, onChange, val, review, truth,
}) => {
  const answers = val;
  const doc = ques;
  let qclassName = 'renderQuestion';
  if (review) {
    if (truth.indexOf(qid) > -1) {
      qclassName = `${qclassName} renderTrue`;
    } else {
      qclassName = `${qclassName} renderFalse`;
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.qContainer}>
      {doc &&
        doc.question.map((opt, index) => {
          const { optionsIndex } = opt;
          return (
            <View key={index}>
              <Text>{opt.section}</Text>
              <Text>{opt.statement}</Text>
              <Text>{opt.question}</Text>
              <View>
                {optionsIndex === 0 ? (
                  <McqList
                    items={opt.mcqinputs}
                    answers={answers}
                    id={id}
                    qid={qid}
                    sid={index}
                    onChange={onChange}
                    test
                  />
                ) : null}
                {optionsIndex === 1 ? (
                  <McqSelectList
                    items={opt.mcqinputs}
                    answers={answers}
                    id={id}
                    qid={qid}
                    sid={index}
                    onChange={onChange}
                    test
                  />
                ) : null}
                {optionsIndex === 2 ? (
                  <McqTableList
                    colItems={opt.mcqtable[0]}
                    rowItems={opt.mcqtable[1]}
                    answers={answers}
                    id={id}
                    qid={qid}
                    sid={index}
                    onChange={onChange}
                    test
                  />
                ) : null}
                {optionsIndex === 3 ? (
                  <OneBlankInput
                    answers={answers}
                    id={id}
                    qid={qid}
                    sid={index}
                    onChange={onChange}
                    test
                  />
                ) : null}
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

RenderQuestion.propTypes = {
  ques: PropTypes.object,
  preview: PropTypes.bool,
  id: PropTypes.number,
  qid: PropTypes.string,
  onChange: PropTypes.func,
  val: PropTypes.array,
  review: PropTypes.bool,
  truth: PropTypes.array,
};
export default RenderQuestion;
