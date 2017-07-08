import React from 'react';
import Link from "gatsby-link"
import Helmet from 'react-helmet';

const Index = () => (
	<div>
		<Helmet title="Robert Friedl - Games"/>

		<h1>games</h1>
		<Link to="/">Back</Link>
	</div>
);

export default Index;
