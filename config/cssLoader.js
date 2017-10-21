import ExtractTextPlugin from "extract-text-webpack-plugin";
import { autoprefixerConfig, postCssLoader } from "./config";

export default function(config, { stage }) {
	if (stage === "dev") {
		config.module.rules.push({
			test: /\.css$/,
			use: [
				"style-loader",
				{
					loader: "css-loader",
					options: {
						importLoaders: 1
					}
				},
				postCssLoader
			]
		});
	} else {
		config.module.rules.push({
			test: /\.css$/,
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
							importLoaders: 1,
							minimize: true,
							sourceMap: true
						}
					},
					postCssLoader
				]
			})
		});
	}

	return config;
}
