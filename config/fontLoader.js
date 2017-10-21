export default function withFontLoader(config) {
	config.module.rules = config.module.rules.concat([
		{
			loader: "url-loader",
			test: /\.(woff|woff2|svg|ttf|eot)(\?.*)?$/,
			query: {
				limit: 10000,
				name: "static/[name].[hash:8].[ext]"
			}
		}
	]);

	return config;
}
