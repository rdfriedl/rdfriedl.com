import React from 'react';
import Link from 'gatsby-link';
import ExternalLink from './ExternalLink';

const Header = (props) => (
	<div id="header">
		<header>
			<Link to="/" className="logo">Robert Friedl</Link>
			<span style={{margin: 10}}/>
			<Link to="/" className="button">Home</Link>
			<Link to="/games/" className="button">Games</Link>
			<Link to="/pens/" className="button">Pens</Link>

			<ExternalLink className="button float-right hidden-sm">
				<i className="fa fa-github"/>
				<span> View Source</span>
			</ExternalLink>
		</header>

		{/*<input type="checkbox" id="drawer-checkbox"/>*/}
		{/*<nav className="drawer hidden-md hidden-lg">*/}
			{/*<label htmlFor="drawer-checkbox" className="close"/>*/}
		{/*</nav>*/}
	</div>
);

export default Header;