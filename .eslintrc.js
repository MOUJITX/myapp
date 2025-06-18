module.exports = {
  extends: ['react-app' /* 'plugin:react-native/all', 'prettier' */],
  plugins: ['react-native' /* 'prettier' */],
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
    // 'import/order': [
    //   'warn',
    //   {
    //     groups: ['builtin', ['external', 'internal'], ['parent']],
    //     pathGroups: [
    //       {
    //         pattern: './**',
    //         group: 'parent',
    //         position: 'after',
    //       },
    //     ],
    //     distinctGroup: false,
    //     alphabetize: {
    //       order: 'asc',
    //       caseInsensitive: true,
    //     },
    //     'newlines-between': 'always',
    //   },
    // ],
    // 'space-before-function-paren': [
    //   'error',
    //   {
    //     anonymous: 'always',
    //     named: 'never',
    //     asyncArrow: 'always',
    //   },
    // ],
    // 'react-native/no-raw-text': [
    //   'error',
    //   {
    //     skip: ['Bold', 'LabeledText'],
    //   },
    // ],
    // 'react-native/sort-styles': 'error',
    // 'no-unexpected-multiline': 'off',
    // 'arrow-parens': ['error', 'as-needed'],
  },
};
