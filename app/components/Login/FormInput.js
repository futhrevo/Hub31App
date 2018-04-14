import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

const FormInput = (props) => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.roundInput}
      leftIcon={<FontAwesome name={icon} size={24} color="white" />}
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      leftIconContainerStyle={styles.leftIconContainerStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="lightgray"
      underlineColorAndroid="transparent"
    />
  );
};

FormInput.propTypes = {
  icon: PropTypes.string,
  refInput: PropTypes.func,
};

export default FormInput;
