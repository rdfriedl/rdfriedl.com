import React from 'react';
import Link from 'gatsby-link';

const Header = (props) => (
	<div id="header">
		<header className="row">
			<div className="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
				{/*<label htmlFor="drawer-checkbox" className="button drawer-toggle"/>*/}
				<Link to="/" className="button">Home</Link>
				<Link to="/games/" className="button">Games</Link>
				<Link to="/pens/" className="button">Pens</Link>
			</div>
		</header>

		{/*<input type="checkbox" id="drawer-checkbox"/>*/}
		{/*<nav className="drawer hidden-md hidden-lg">*/}
			{/*<label htmlFor="drawer-checkbox" className="close"/>*/}
		{/*</nav>*/}
	</div>
);

export default Header;