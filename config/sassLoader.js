import ExtractTextPlugin from "extract-text-webpack-plugin";
import { postCssLoader } from "./config";

export default function(stage) {
	let loaders = [];

	if (stage === "dev") {
		loaders = [
			{ loader: "style-loader" },
			{ loader: "css-loader" },
			{ loader: "sass-loader" }
		];
	} else {
		loaders = [
			{
				loader: "css-loader",
				options: {
					importLoaders: 1,
					minimize: stage === "prod",
					sourceMap: false
				}
			},
			postCssLoader(stage),
			{
				loader: "sass-loader",
				options: { includePaths: ["src/"] }
			}
		];

		// Don't extract css to file during node build process
		if (stage !== "node") {
			loaders = ExtractTextPlugin.extract({
				fallback: {
					loader: "style-loader",
					options: {
						sourceMap: false,
						hmr: false
					}
				},
				use: loaders
			});
		}
	}

	return {
		test: /\.s(a|c)ss$/,
		use: loaders
	};
}
