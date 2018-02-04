import ExtractTextPlugin from "extract-text-webpack-plugin";
import { postCssLoader } from "./config";

export default function(stage) {
	if (stage === "dev") {
		return {
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
		};
	} else {
		return {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({
				fallback: {
					loader: "style-loader",
					options: {
						sourceMap: false,
						hmr: false
					}
				},
				use: [
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							minimize: true,
							sourceMap: false
						}
					},
					postCssLoader(stage)
				]
			})
		};
	}
}
