module.exports = exports = {
    extends: 'streamr',
    env: {
        jest: true,
    },
    rules: {
        'max-len': ["error", {
            "code": 150,
            "ignoreTemplateLiterals": true,
            "ignoreStrings": true
        }],
        'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
        'no-underscore-dangle': ["error", { "allowAfterThis": true }]
    }
}
