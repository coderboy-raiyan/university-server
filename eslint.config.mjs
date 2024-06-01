import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            'no-console': 'warn',
            'no-unused-vars': 'error',
            'no-unused-expressions': 'error',
            'prefer-const': 'error',
            'no-undef': 'error',
        },
    },
    {
        ignores: ['**/dist/', '**/node_modules/'],
    },
];
