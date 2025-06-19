module.exports = {
  extends: ['react-app', 'prettier' /* 'plugin:react-native/all' */],
  plugins: ['react-native', 'prettier'],
  rules: {
    'import/no-anonymous-default-export': [
      'warn',
      {
        /* Allow: export default () => {} */
        allowArrowFunction: true,
      },
    ],
    'sort-imports': [
      'warn',
      {
        /* Allow: import b; import a; */
        ignoreDeclarationSort: true,
        /* Not Allow: {a, b} to be {b, a} */
        ignoreMemberSort: false,
        /* Allow: {B, a} */
        ignoreCase: true,
      },
    ],
    /* Not Allow: <View>123</View> */
    'react-native/no-raw-text': 'warn',
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'react-native/sort-styles': 'warn',
    'no-unexpected-multiline': 'warn',
    'arrow-parens': ['warn', 'as-needed'],
    /* Not Allow: style={[styles.trainSeatType]} */
    'react-native/no-single-element-style-arrays': 'warn',
  },
};
