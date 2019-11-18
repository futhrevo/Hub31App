import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';

import WebViewAutoHeight from '../WebViewAutoHeight/WebViewAutoHeight';
import OneBlankInput from './OneBlankInput';
import McqList from './McqList';
import McqSelectList from './MultiSelectList';
import McqTableList from './McqTableList';
import styles from './styles';

const RenderQuestion = ({ doc, id, qid, onChange, answers, review, truth }) => {
  const qclassName = [styles.qContainer];
  if (review) {
    if (truth.indexOf(qid) > -1) {
      qclassName.push(styles.renderTrue);
    } else {
      qclassName.push(styles.renderFalse);
    }
  }
  return (
    <ScrollView contentContainerStyle={qclassName}>
      {doc &&
        doc.question.map((opt, index) => {
          const { optionsIndex } = opt;
          return (
            <View key={index}>
              {opt.section ? <Text>{opt.section}</Text> : null}
              <WebViewAutoHeight
                source={{ html: `<body>${opt.question}</body>` }}
              />
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
  id: PropTypes.number,
  doc: PropTypes.object,
  preview: PropTypes.bool,
  qid: PropTypes.string,
  onChange: PropTypes.func,
  answers: PropTypes.array,
  review: PropTypes.bool,
  truth: PropTypes.array,
};

export default RenderQuestion;
