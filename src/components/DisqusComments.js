import React, { Component } from "react";
import PropTypes from 'prop-types';
import ReactDisqusComments from "react-disqus-comments";
import config from "../siteConfig";

export default class DisqusComments extends Component {
	static propTypes = {
		category: PropTypes.string,
		disqusTitle: PropTypes.string,
		disqusId: PropTypes.string.isRequired
	};

	render() {
		if (!config.disqus.shortname) return null;

		let { category, disqusTitle, disqusId } = this.props;

		return (
			<ReactDisqusComments
				shortname={config.disqus.shortname}
				identifier={disqusId}
				title={disqusTitle}
				category_id={category}
			/>
		);
	}
}