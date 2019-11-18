module.exports = {
  root: true,
  extends: ['@react-native-community', "plugin:prettier/recommended"],
  rules: {
    "arrow-body-style": 0,
    "react/jsx-no-bind": 0,
    "no-underscore-dangle": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/prefer-default-export": 0,
    "class-methods-use-this": 0,
    "no-case-declarations": 0,
    "import/no-named-as-default": 0,
    "new-cap": 0,
    "react/forbid-prop-types": [0],
    "react/require-default-props": [0],
    "global-require": [0],
    "no-unused-expressions": [2, { "allowShortCircuit": true, "allowTernary": true }]
  }
};
