import React from 'react';

const Footer = () => (
	<footer className="row">
		<div className="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
			<p>
				<span>Built with <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a></span>
				{process.env.NODE_ENV === 'development' && <span>
					<span> | </span>
					<a href="/___graphql" target="_blank">GraphQL debugger</a>
				</span>}
			</p>
		</div>
	</footer>
);

export default Footer;
