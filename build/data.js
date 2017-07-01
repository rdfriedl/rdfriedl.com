const path = require('path');
const fs = require('fs');
const config = require('./config.js');
const fetch = require('node-fetch');

module.exports = function buildData(){
	let dataFiles = fs.readdirSync(config.data);
	let data = {};

	// load the data files
	let wait = dataFiles.map(fp => new Promise((resolve, reject) => {
		let absPath = path.join(config.data, fp);
		let name = path.basename(fp, path.extname(fp));

		if(!fs.existsSync(absPath))
			throw new Error(absPath + ' dose not exist');

		try{
			data[name] = JSON.parse(fs.readFileSync(absPath));
			console.log('read data file',fp);
			resolve();
		}
		catch(err){
			console.log('Failed to read data file', fp);
			reject(err);
		}
	}));

	// fetch the github data
	wait.push(new Promise(resolve => {
		if(fs.existsSync(config.githubCache)){
			data.github = JSON.parse(fs.readFileSync(config.githubCache));
			console.log('loaded github data from cache');
			resolve();
		}
		else
			return fetch('https://api.github.com/users/rdfriedl').then(res => res.json())
				.then(userData => {
					if(userData.message && userData.documentation_url)
						throw new Error(userData.message);

					data.github = userData;
					console.log('fetched github data');

					if(!fs.existsSync(config.githubCache)){
						fs.writeFileSync(config.githubCache, JSON.stringify(userData, undefined, 2));
						console.log('wrote github data cache');
					}
				})
	}));

	return Promise.all(wait).then(() => data);
};
