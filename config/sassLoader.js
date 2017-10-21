import ExtractTextPlugin from "extract-text-webpack-plugin";
import { autoprefixerConfig, postCssLoader } from "./config";

const sassLoader = {
	loader: "sass-loader",
	options: {
		sourceMap: true
	}
};

export default function(config, { stage }) {
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
				postCssLoader,
				sassLoader
			]
		});
	} else {
		config.module.rules.push({
			test: /\.(sass|scss)$/,
			loader: ExtractTextPlugin.extract({
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
							minimize: true,
							sourceMap: true
						}
					},
					postCssLoader,
					sassLoader
				]
			})
		});
	}

	return config;
}
