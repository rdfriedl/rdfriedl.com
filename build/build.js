const path = require('path');
const fs = require('fs');
const pug = require('pug');
const glob = require('glob');
const mkdirp = require('mkdirp');
const buildData = require('./data');
const config = require('./config');
const pretty = require('pretty');
const ncp = require('ncp').ncp;

const filters = [
	require('jstransformer-markdown-it')
];

function renderPugFile(opts = {}) {
	let {input, output, data} = opts;
	if(!input || !output || !data)
		throw new Error('renderPugFile missing arguments');

	let html = pug.compileFile(input, {
		filters,
		basedir: config.src
	})(data);
	let filename = path.basename(input, path.extname(input));
	let outputName = opts.filename? opts.filename({filename, html, input, output, ext: path.extname(input)}) : filename + '.html';
	let outputPath = path.join(output, outputName);

	mkdirp.sync(output);
	fs.writeFileSync(outputPath, pretty(html));
	return outputPath;
}

buildData(data => {
	let base = path.resolve(__dirname, '../');
	let pages = glob.sync(`**/[!${config.ignorePagePrefix}]*.pug`, {
		cwd: config.pages
	});

	pages.forEach(fp => {
		let out = renderPugFile({
			input: path.resolve(config.pages, fp),
			output: path.dirname(path.resolve(config.output, fp)),
			data
		});
		console.info('rendered', path.relative(base, path.resolve(config.pages, fp)), '->', path.relative(base, out));
	});

	// copy static assets
	ncp(path.join(config.src, 'assets'), path.join(config.output, 'assets'), () => {
		console.log('copied', path.relative(base, path.join(config.src, 'assets')), '->', path.relative(base, path.join(config.output, 'assets')))
	});

	//render projects
	const projectTemplate = path.join(config.pages, 'projects', '_project.pug');
	data.projects.forEach(project => {
		let out = renderPugFile({
			input: projectTemplate,
			output: path.join(config.output, 'projects', project.id),
			data: Object.assign({}, data, {project}),
			filename: () => 'index.html'
		});
		console.info('rendered', path.relative(base, projectTemplate), '->', path.relative(base, out));
	});

	// render pens
	const penTemplate = path.join(config.pages, 'pens', '_pen.pug');
	data.pens.forEach(pen => {
		let out = renderPugFile({
			input: penTemplate,
			output: path.join(config.output, 'pens', pen.id),
			data: Object.assign({}, data, {pen}),
			filename: () => 'index.html'
		});
		console.info('rendered', path.relative(base, penTemplate), '->', path.relative(base, out));
	})
});
