import React from "react";
import ExternalLink from "./ExternalLink";

const Footer = () =>
	<footer id="footer">
		<p>
			<span>
				Built with{" "}
				<ExternalLink href="https://www.gatsbyjs.org/">Gatsby</ExternalLink>
			</span>
			<span>
				{" "}and{" "}
				<ExternalLink href="http://minicss.org/">Mini.css</ExternalLink>
			</span>
			{process.env.NODE_ENV === "development" &&
				<span>
					<span> | </span>
					<ExternalLink href="/___graphql">GraphQL debugger</ExternalLink>
				</span>}
		</p>
	</footer>;

export default Footer;
