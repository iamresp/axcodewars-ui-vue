module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    indent: ['error', 2],
    'no-console': 1,
    'no-debugger': 1,
    'max-len': [
      'error',
      {
        code: 120,
        comments: 120,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: [
          'block',
          'multiline-block-like',
          'export',
          'function',
        ],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block',
          'export',
          'for',
          'function',
          'if',
          'multiline-block-like',
          'return',
          'switch',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'const',
          'let',
        ],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: [
          'const',
          'let',
        ],
        next: [
          'const',
          'let',
        ],
      },
    ],
    'lines-between-class-members': [
      'error',
      'always',
    ],
    'max-lines': [
      'error',
      1000,
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    semi: [
      'error',
      'always',
    ],
    'array-callback-return': [
      'error',
      {
        allowImplicit: true,
      },
    ],
    'arrow-body-style': [
      'error',
      'as-needed',
      {
        requireReturnForObjectLiteral: false,
      },
    ],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'space-infix-ops': ['error', { int32Hint: false }],
    'dot-notation': [
      'error',
      {
        allowKeywords: true,
      },
    ],
    'dot-location': [
      'error',
      'property',
    ],
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],
    'no-irregular-whitespace': 'error',
    'no-lone-blocks': 'error',
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: false,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-return-assign': [
      'error',
      'always',
    ],
    'eol-last': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'operator-linebreak': ['error', 'before'],
    'no-sparse-arrays': 'error',
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      },
    ],
    'prefer-template': 'error',
    radix: 'error',
    'valid-typeof': [
      'error',
      {
        requireStringLiterals: true,
      },
    ],
    'vars-on-top': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        functions: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
      },
    ],
    'semi-style': ['error', 'last'],
    'no-extra-semi': 'error',
    'no-extra-bind': 'error',
    'quote-props': ['error', 'as-needed'],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    '@typescript-eslint/semi': [
      'error',
      'always',
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'vue/script-setup-uses-vars': ['error'],
    'vue/no-async-in-computed-properties': ['error'],
    'vue/no-dupe-keys': ['error'],
    'vue/no-duplicate-attributes': ['error', {
      allowCoexistClass: true,
      allowCoexistStyle: true,
    }],
    'vue/no-reserved-keys': ['error', {
      reserved: [],
      groups: [],
    }],
    'vue/no-shared-component-data': ['error'],
    'vue/no-side-effects-in-computed-properties': ['error'],
    'vue/no-textarea-mustache': ['error'],
    'vue/no-unused-vars': ['error', {
      ignorePattern: '^_',
    }],
    'vue/no-useless-template-attributes': ['error'],
    'vue/require-component-is': ['error'],
    'vue/require-valid-default-prop': ['error'],
    'vue/use-v-on-exact': ['error'],
    'vue/valid-template-root': ['error'],
    'vue/valid-v-bind': ['error'],
    'vue/multi-word-component-names': 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
