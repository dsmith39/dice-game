module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['svelte3'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parser: '@babel/eslint-parser',

	parserOptions: {
		sourceType: 'module',
		requireConfigFile: false,
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
