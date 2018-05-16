import React from "react";
import PropTypes from "prop-types";
import ReactDisqusComments from "react-disqus-comments";
import { withSiteData } from "react-static";

let hasWindow = false;
try {
	hasWindow = !!self.window;
} catch (err) {
	hasWindow = false;
}

const DisqusComments = withSiteData(
	({ category, disqusTitle, disqusId, disqus }) => {
		if (!disqus.shortname || !hasWindow) return null;

		return (
			<ReactDisqusComments
				shortname={disqus.shortname}
				identifier={disqusId}
				title={disqusTitle}
				category_id={category}
			/>
		);
	}
);

DisqusComments.propTypes = {
	category: PropTypes.string,
	disqusTitle: PropTypes.string,
	disqusId: PropTypes.string.isRequired
};

export default DisqusComments;
