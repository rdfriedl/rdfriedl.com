import React, { Component } from "react";
import PropTypes from "prop-types";
import ExternalLink from "./ExternalLink";
import gatsbyInfo from 'gatsby/package.json';
import miniCssInfo from 'mini.css/package.json';
import config from '../siteConfig';

export default class Footer extends Component {
	render(){
		const { sourceUrl } = config;

		return (
			<footer id="footer">
				<p>
					<span>Built with </span>
					<ExternalLink href="https://www.gatsbyjs.org/">Gatsby v{gatsbyInfo.version}</ExternalLink>
					<span> and </span>
					<ExternalLink href="https://minicss.org/">Mini.css v{miniCssInfo.version}</ExternalLink>
					<span> | view </span>
					<ExternalLink href={sourceUrl}><i className="fa fa-code"/> Source</ExternalLink>
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