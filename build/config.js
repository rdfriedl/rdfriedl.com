const path = require('path');

module.exports = {
	ignorePagePrefix: '_',
	data: path.resolve(__dirname, '../src/data'),
	src: path.resolve(__dirname, '../src'),
	pages: path.resolve(__dirname, '../src/pages'),
	output: path.resolve(__dirname, '../dist'),
	githubCache: path.resolve(__dirname, '../.github.cache.json')
};
