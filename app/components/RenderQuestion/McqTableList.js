import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Table, TableWrapper, Row, Col, Cell } from 'react-native-table-component';

import styles from './styles';

const McqTableList = (props) => {
  let { answers } = props;
  const {
    preview, rowItems, colItems, id, qid, test, sid, onChange,
  } = props;
  const newColItems = colItems.slice();
  newColItems.unshift('');
  if (typeof answers === 'undefined') {
    answers = [];
  }
  if (typeof answers[sid] === 'undefined') {
    answers[sid] = [];
  }

  function renderDot(index, index1) {
    return (
      <CheckBox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        containerStyle={styles.radio}
        checked={answers[sid][index] === index1}
        onPress={() => onChange({ target: index }, 3, index1, qid, sid)}
        checkedColor="#ff8100"
      />
    );
  }
  return (
    <View>
      <ScrollView>
        <View>
          <Table>
            <Row data={newColItems} textStyle={styles.text} />

            {rowItems.map((opt, index) => (
              <TableWrapper style={styles.wrapper} key={index}>
                <Cell data={opt} textStyle={styles.text} />
                {colItems.map((opt1, index1) => (
                  <Cell data={renderDot(index, index1)} key={index1} textStyle={styles.text} />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </View>
      </ScrollView>
    </View>
  );
};

McqTableList.propTypes = {
  rowItems: PropTypes.array,
  colItems: PropTypes.array,
  preview: PropTypes.bool,
  answers: PropTypes.array,
  onChange: PropTypes.func,
  id: PropTypes.number,
  test: PropTypes.bool,
  qid: PropTypes.string,
  sid: PropTypes.number,
};
export default McqTableList;
