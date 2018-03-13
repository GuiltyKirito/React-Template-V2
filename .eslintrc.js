module.exports = {
  env: {
    jest: true,
    jquery: true,
  },
  globals: {
    React: true,
    moment: true,
  },
  extends: 'react-app',
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    // require trailing commas in multiline object literals
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],

    // suggest using arrow functions as callbacks
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],

    // disallow modifying variables that are declared using const
    'no-const-assign': 'error',

    // require let or const instead of var
    'no-var': 'error',

    // suggest using of const declaration for variables that are never modified after declared
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],

    // require space before/after arrow function's arrow
    'arrow-spacing': ['error', { before: true, after: true }],

    // enforce one true brace style
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // enforce padding within blocks
    'padded-blocks': ['error', 'never'],

    // specify whether double or single quotes should be used
    quotes: ['error', 'single', { avoidEscape: true }],

    // require spaces around operators
    'space-infix-ops': 'error',

    // suggest using template literals instead of string concatenation
    'prefer-template': 'error',

    // enforce usage of spacing in template strings
    'template-curly-spacing': 'error',
  },
};
