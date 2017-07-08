import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import {CreateTitle} from '../utils/utils';

const ForeOForePage = () => (
	<div>
		<Helmet title={createTitle('404')}/>
		<Link to='/games/'>Go to back to home</Link>
	</div>
);

export default ForeOForePage;
