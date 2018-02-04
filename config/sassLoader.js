import ExtractTextPlugin from "extract-text-webpack-plugin";
import { postCssLoader } from "./config";

export default function(stage) {
	if (stage === "dev") {
		return {
			test: /\.s(a|c)ss$/,
			use: [
				{ loader: "style-loader" },
				{ loader: "css-loader" },
				{ loader: "sass-loader" }
			]
		};
	} else {
		return {
			test: /\.s(a|c)ss$/,
			use: ExtractTextPlugin.extract({
				use: [
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
							minimize: true,
							sourceMap: false
						}
					},
					postCssLoader(stage),
					{
						loader: "sass-loader",
						options: { includePaths: ["src/"] }
					}
				]
			})
		};
	}
}
