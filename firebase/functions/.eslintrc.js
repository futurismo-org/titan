module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier','@typescript-eslint', 'import'],
  rules: {
    "import/no-unresolved": 'error',
    'global-require': 0,
    'prettier/prettier': 'error',
    'jsx-a11y/anchor-is-valid': 0,
    'no-param-reassign': 0,
    radix: 0,
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    'import/no-absolute-path': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-function-return-type': 0, // TODO あとで消す
    '@typescript-eslint/no-explicit-any': 0, // TODO あとで消す
  },
  parser: '@typescript-eslint/parser',
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      // use <root>/tsconfig.json
      "typescript": {}
    }
  }
}
