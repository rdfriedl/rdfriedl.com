import ExtractTextPlugin from "extract-text-webpack-plugin";
import { postCssLoader } from "./config";

const sassLoader = stage => ({
	loader: "sass-loader",
	options: {
		sourceMap: stage === "dev"
	}
});

export default function(config, { stage }) {
	const extractSass = new ExtractTextPlugin({
		filename: 'theme.css',
		disable: stage === 'dev'
	});

	if (stage === "dev") {
		config.module.rules.push({
			test: /\.(sass|scss)$/,
			use: [
				"style-loader",
				{
					loader: "css-loader",
					options: {
						importLoaders: 2,
						sourceMap: true
					}
				},
				postCssLoader(stage),
				sassLoader(stage)
			]
		});
	} else {
		config.module.rules.push({
			test: /\.(sass|scss)$/,
			loader: extractSass.extract({
				fallback: {
					loader: "style-loader",
					options: {
						hmr: false
					}
				},
				use: [
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
							minimize: true
						}
					},
					postCssLoader(stage),
					sassLoader(stage)
				]
			})
		});
	}

	config.plugins.push(extractSass);

	return config;
}
