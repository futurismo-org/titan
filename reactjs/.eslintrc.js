module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier', 'react-hooks', 'react', '@typescript-eslint', 'import'],
  rules: {
    'global-require': 0,
    'prettier/prettier': 'error',
    'jsx-a11y/anchor-is-valid': 0,
    'no-param-reassign': 0,
    radix: 0,
    'import/no-unresolved': 'error',
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    'import/no-absolute-path': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-function-return-type': 0, // TODO あとで消す
    '@typescript-eslint/no-explicit-any': 0, // TODO あとで消す
    '@typescript-eslint/no-non-null-assertion': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/require-default-props': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
  },
  parser: '@typescript-eslint/parser',
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {}
    }
  }

};
