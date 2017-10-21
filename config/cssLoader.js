import ExtractTextPlugin from "extract-text-webpack-plugin";
import { postCssLoader } from "./config";

export default function(config, { stage }) {
	if (stage === "dev") {
		config.module.rules.push({
			test: /\.css$/,
			use: [
				"style-loader",
				{
					loader: "css-loader",
					options: {
						importLoaders: 1,
						sourceMap: true
					}
				},
				postCssLoader(stage)
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
							minimize: true
						}
					},
					postCssLoader(stage)
				]
			})
		});
	}

	return config;
}
