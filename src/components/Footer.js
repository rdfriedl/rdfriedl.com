import React, { Component } from "react";
import { getSiteProps } from "react-static";
import ExternalLink from "./ExternalLink";
import reactStatic from "react-static/package.json";
import miniCssInfo from "mini.css/package.json";

const Footer = getSiteProps(({ siteUrl, sourceUrl }) => (
	<footer>
		<p>
			<span>Built with </span>
			<ExternalLink href="https://github.com/nozzle/react-static">
				React Static v{reactStatic.version}
			</ExternalLink>
			<span> and </span>
			<ExternalLink href="https://minicss.org/">
				Mini.css v{miniCssInfo.version}
			</ExternalLink>
			<span> | view </span>
			<ExternalLink href={sourceUrl}>
				<i className="fa fa-code" /> Source
			</ExternalLink>
		</p>
	</footer>
));

export default Footer;
