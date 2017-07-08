import React from 'react';
import ExternalLink from './ExternalLink';

const Footer = () => (
	<footer className="row">
		<div className="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
			<p>
				<span>Built with <ExternalLink href="https://www.gatsbyjs.org/">Gatsby</ExternalLink></span>
				{process.env.NODE_ENV === 'development' && <span>
					<span> | </span>
					<ExternalLink href="/___graphql">GraphQL debugger</ExternalLink>
				</span>}
			</p>
		</div>
	</footer>
);

export default Footer;
