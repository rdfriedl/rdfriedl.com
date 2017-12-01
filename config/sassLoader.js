export default function(config, { stage, defaultLoaders }) {
	let loader = {
		test: /\.(sass|scss)$/,
		use: [
			...(defaultLoaders.cssLoader.use || defaultLoaders.cssLoader.loader),
			{
				loader: "sass-loader",
				options: {
					sourceMap: stage === "dev"
				}
			}
		]
	};


	if(config.module.rules[0].oneOf){
		config.module.rules[0].oneOf.unshift(loader);
	}
	else{
		config.module.rules.unshift(loader);
	}

	return config;
}
