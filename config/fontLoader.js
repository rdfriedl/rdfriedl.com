export default function fontLoader(stage) {
	return {
		loader: "url-loader",
		test: /\.(woff|woff2|eot|ttf|svg)(\?.*)?$/,
		query: {
			limit: 10000,
			name: "static/[name].[hash:8].[ext]"
		}
	};
}
