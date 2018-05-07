import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

const FormInput = (props) => {
  const {
    icon, refInput, dark, ...otherProps
  } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.roundInput}
      leftIcon={<FontAwesome name={icon} size={24} color={dark ? '#ff8100' : 'white'} />}
      inputStyle={dark ? styles.inputDarkStyle : styles.inputLightStyle}
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
  dark: PropTypes.bool,
};

export default FormInput;
