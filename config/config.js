import autoprefixer from "autoprefixer";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";

const autoprefixerConfig = {
	browsers: [
		">1%",
		"last 4 versions",
		"Firefox ESR",
		"not ie < 9" // React doesn't support IE8 anyway
	],
	flexbox: "no-2009"
};

const postCssLoader = {
	loader: "postcss-loader",
	options: {
		// Necessary for external CSS imports to work
		// https://github.com/facebookincubator/create-react-app/issues/2677
		ident: "postcss",
		plugins: () => [postcssFlexbugsFixes, autoprefixer(autoprefixerConfig)],
		sourceMap: true
	}
};

export { autoprefixerConfig, postCssLoader };
