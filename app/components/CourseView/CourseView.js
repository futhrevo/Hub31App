import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import { ScreenOrientation } from 'expo';
import { withNavigation } from 'react-navigation';

import { CourseCoverImage } from '../CourseCoverImage';

import styles from './styles';

const joined = {
  url: require('../../../assets/F4.jpg'),
  title: 'F1 - Accountant in Business',
  specialization_id: '19',
  hours: '0',
  exams: '0',
  projects: '0',
  content:
    'To develop knowledge and understanding of the business environment and the influence this has on how organisations and accountants operate, and of the role of the accountant and other key business functions in contributing to an efficient, effective and ethical organisation, and to build knowledge and understanding of the basic principles of effective management.',
  longdesc:
    '<p>On successful completion of this paper, candidates should be able to: <ol type="A"> <li> Understand the purpose and types of businesses and how they interact with key stakeholders and the external environment. </li><li> Understand business organisation structure, functions and the role of corporate governance </li><li> Recognise the function of accountancy and audit in communicating, reporting and assuring financial information and in effective financial control and compliance </li><li> Recognise the principles of authority and leadership and how teams and individuals are recruited, managed, motivated and developed. </li><li> Understand the importance of personal effectiveness as the basis for effective team and organisational behaviour. </li><li> Recognise that all aspects of business and finance should be conducted in a manner which complies with and is in the spirit of accepted professional ethics and professional values</li></ol></p>',
  outline: [
    'Chapter 1 The purpose and types of business organisation',
    'Chapter 2 Stakeholders in business organisations',
    'Chapter 3 Political and legal factors affecting business',
    'Chapter 4  Macroeconomic factors',
    'Chapter 5 Micro economic factors',
    'Chapter 6 Social and demographic factors',
    'Chapter 7 Technological factors',
    'Chapter 8 Environmental factors',
    'Chapter 9 Competitive factors',
    'Chapter 10 The formal and informal business organisation',
    'Chapter 11 Business organisational structure and design',
    'Chapter 12  Organisational culture in business',
    'Chapter 13 Committees in business organisations',
    'Chapter 14  Governance and social responsibility in business',
    'Chapter 15 The relationship between accounting and other business functions',
    'Chapter 16 Accounting and finance functions within business organisations',
    'Chapter 17 Principles of law and regulation governing accounting and auditing',
    'Chapter 18 The sources and purpose of internal and external financial information, provided by business',
    'Chapter 19  Financial systems, procedures and related IT applications',
    'Chapter 20  Internal controls, authorisation, security of data and compliance within business',
    'Chapter 21  Fraud and fraudulent behaviour and their prevention in business, including money laundering.',
    'Chapter 22 Leadership, management and supervision',
    'Chapter 23 Recruitment and selection of employees',
    'Chapter 24  Individual and group behaviour in business organisations',
    'Chapter 25  Team formation, development and management',
    'Chapter 26 Motivating individuals and groups',
    'Chapter 27  Learning and training at work',
    'Chapter 28 Review and appraisal of individual performance.',
    'Chapter 29 Personal effectiveness techniques',
    'Chapter 30 Consequences of ineffectiveness at work',
    'Chapter 31  Competence frameworks and personal development',
    'Chapter 32 Sources of conflicts and techniques for conflict resolution and referral',
    'Chapter 33 Communicating in business',
    'Chapter 34 Fundamental principles of ethical behaviour',
    'Chapter 35 The role of regulatory and professional bodies in promoting ethical and professional standards in the accountancy profession',
    'Chapter 36 Corporate codes of ethics',
    'Chapter 37 Ethical conflicts and dilemmas',
  ],
};

class CourseView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }
  componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
  }

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <CourseCoverImage url={joined.url} title={joined.title} />

          <Text style={styles.specText}>ACCA / Fundamentals</Text>
          <Divider style={styles.divider} />
          <View style={styles.body}>
            <Text style={styles.specText}>Introduction</Text>
            <Text style={styles.paragraph}>{joined.content}</Text>
            <Text style={styles.specText}>Outline</Text>
            <FlatList
              data={joined.outline}
              renderItem={({ item }) => <ListItem title={item} />}
              keyExtractor={(item) => item}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.footer}
          onPress={() => this.props.navigation.navigate('Classroom')}
        >
          <Text style={styles.footerText}>Enroll / GO TO CLASSROOM</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

CourseView.propTypes = {
  navigation: PropTypes.object,
};
export default withNavigation(CourseView);
