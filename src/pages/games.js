import React from 'react';
import Link from "gatsby-link"
import Helmet from 'react-helmet';
import {createTitle} from '../utils/utils';

const GamesPage = () => (
	<div>
		<Helmet title={createTitle('Games')}/>

		<h1>games</h1>
		<Link to="/">Back</Link>
	</div>
);

export default GamesPage;
