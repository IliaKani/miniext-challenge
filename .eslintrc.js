module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'alloy',
        'alloy/react',
        'alloy/typescript',
        'next',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'next/core-web-vitals',
    ],
    // use next/core-web-vitals to error on a number of rules
    // that are warnings by default if they affect Core Web Vitals
    // extends: ['next', 'next/core-web-vitals'],
    env: {
        node: true,
        browser: true,
    },
    globals: {
        REACT_APP_ENV: true,
    },
    rules: {
        'import/no-anonymous-default-export': 'off',
        'no-eq-null': 'off',
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
