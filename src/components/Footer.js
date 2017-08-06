import React, { Component } from "react";
import PropTypes from "prop-types";
import ExternalLink from "./ExternalLink";
import gatsbyInfo from 'gatsby/package.json';
import miniCssInfo from 'mini.css/package.json';

export default class Footer extends Component {
	static contextTypes = {
		siteMetadata: PropTypes.object
	};

	render(){
		const { siteMetadata } = this.context;

		return (
			<footer id="footer">
				<p>
					<span>Built with </span>
					<ExternalLink href="https://www.gatsbyjs.org/">Gatsby v{gatsbyInfo.version}</ExternalLink>
					<span> and </span>
					<ExternalLink href="http://minicss.org/">Mini.css v{miniCssInfo.version}</ExternalLink>
					<span> | view </span>
					<ExternalLink href={siteMetadata.sourceUrl}><i className="fa fa-code"/> Source</ExternalLink>
					{process.env.NODE_ENV === "development" &&
						<span>
							<span> | </span>
							<ExternalLink href="/___graphql">GraphQL debugger</ExternalLink>
						</span>
					}
				</p>
			</footer>
		)
	}
}