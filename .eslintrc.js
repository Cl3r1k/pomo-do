module.exports = {
  extends: ['plugin:@angular-eslint/recommended'],
  rules: {
    '@angular-eslint/directive-selector': [
      'error',
      { type: 'attribute', prefix: 'app', style: 'camelCase' },
    ],
    '@angular-eslint/component-selector': [
      'error',
      { type: 'element', prefix: 'app', style: 'kebab-case' },
    ],
  },
  overrides: [
    /**
     * This extra piece of configuration is only necessary if you make use of inline
     * templates within Component metadata, e.g.:
     */
    {
      files: ['*.component.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      plugins: ['@angular-eslint/template'],
      processor: '@angular-eslint/template/extract-inline-html',
    },
    // Custom rules for TypeScript
    {
      files: ['*.ts'],
      extends: [
        'airbnb-typescript/base', // AirBnB style guide
        'prettier/@typescript-eslint',  // Settings for prettier
        'plugin:prettier/recommended'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: module,
      },
      // Custom rules
      rules: {
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        // To not put empty strings between variables in class
        'lines-between-class-members': 'off',
        // Possibility to use Validators.required
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
      },
    },
    // Configuration for unit and e2e spec files
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      parserOptions: {
        project: './src/tsconfig.spec.json',
      },
      // Rules for linter
      extends: ['plugin:jasmine/recommended'],
      // Plugin to launch rules
      plugins: ['jasmine'],
      env: { jasmine: true },
      // Disable rule: no-unused-vars
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
