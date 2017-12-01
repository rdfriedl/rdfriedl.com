export default function fontLoader(config) {
	let loader = {
		loader: "url-loader",
		test: /\.(woff|woff2|eot|ttf|svg)(\?.*)?$/,
		query: {
			limit: 10000,
			name: "static/[name].[hash:8].[ext]"
		}
	};

	if(config.module.rules[0].oneOf){
		config.module.rules[0].oneOf.unshift(loader);
	}
	else{
		config.module.rules.unshift(loader);
	}

	return config;
}
