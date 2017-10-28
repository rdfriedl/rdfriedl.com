export default function fontLoader(config) {
	config.module.rules = config.module.rules.concat([
		{
			loader: 'url-loader',
			test: /\.(woff|woff2|eot|ttf|svg)(\?.*)?$/,
			query: {
				limit: 10000,
				name: 'static/[name].[hash:8].[ext]',
			},
		},
	]);

	return config;
}