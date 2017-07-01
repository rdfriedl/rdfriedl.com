const path = require('path');
const fs = require('fs');
const config = require('./config.js');
const request = require('request');

module.exports = function buildData(cb){
	let dataFiles = fs.readdirSync(config.data);
	let data = {};

	// load the data files
	dataFiles.forEach(fp => {
		let absPath = path.join(config.data, fp);
		let name = path.basename(fp, path.extname(fp));

		if(!fs.existsSync(absPath))
			throw new Error(absPath + ' dose not exist');

		try{
			data[name] = JSON.parse(fs.readFileSync(absPath));
			console.log('read data file',fp);
		}
		catch(err){
			console.log('Failed to read data file', fp);
		}
	});

	// fetch the github data
	if(fs.existsSync(config.githubCache)){
		data.github = JSON.parse(fs.readFileSync(config.githubCache));
		console.log('loaded github data from cache');
		return data;
	}
	else{
		request.get({
			url: 'https://api.github.com/users/rdfriedl',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'User-Agent': 'nodejs'
			}
		}, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				let userData = JSON.parse(body);

				if (userData.message && userData.documentation_url)
					throw new Error(userData.message);

				data.github = userData;
				console.log('fetched github data');

				if (!fs.existsSync(config.githubCache)) {
					fs.writeFileSync(config.githubCache, JSON.stringify(userData, undefined, 2));
					console.log('wrote github data cache');
				}

				if (cb) cb(data);
			}
			else {
				console.log('Failed to get github user data', error || response.statusCode);
				process.exit(1);
			}
		})
	}
};
