// Sync Labs defaults
// See https://github.com/synclabs-dev/eslint-config
// Includes Typescript and prettier

// FIX-DEPENDENCIES
require.resolve('eslint')
require.resolve('prettier')

// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@sync-labs/eslint-config/patch/modern-module-resolution')

// The ESLint browser environment defines all browser globals as valid,
// even though most people don't know some of them exist (e.g. `name` or `status`).
// This is dangerous as it hides accidentally undefined variables.
// We blacklist the globals that we deem potentially confusing.
// To use them, explicitly reference them, e.g. `window.name` or `window.status`.

module.exports = {
    root: true,
    extends: [ "@sync-labs/eslint-config/profile/node" ],  // <---- put your profile string here
    parserOptions: { 
        tsconfigRootDir: require('path').resolve(__dirname, '..')
    },
    rules: {
        '@rushstack/no-new-null': 'off'
    }
}
