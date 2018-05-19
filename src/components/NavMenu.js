import React, { Fragment } from "react";
import PropTypes from "prop-types";
import NavLink from "./NavLink";

const NavMenu = ({ onMenuItemClick }) => (
	<Fragment>
		<NavLink
			to="/"
			matchSubPaths={false}
			onClick={onMenuItemClick}
			aria-label="home"
		>
			<i className="fa fa-home" /> Home
		</NavLink>
		<NavLink to="/blog/" onClick={onMenuItemClick} aria-label="blog">
			<i className="fa fa-rss" /> Blog
		</NavLink>
		<NavLink to="/games/" onClick={onMenuItemClick} aria-label="games">
			<i className="fa fa-gamepad" /> Games
		</NavLink>
		<NavLink to="/pens/" onClick={onMenuItemClick} aria-label="pens">
			<i className="fa fa-codepen" /> Pens
		</NavLink>
		<NavLink to="/contact/" onClick={onMenuItemClick} aria-label="contact">
			<i className="fa fa-envelope-o" /> Contact
		</NavLink>
	</Fragment>
);

NavMenu.propTypes = {
	onMenuItemClick: PropTypes.func
};

export default NavMenu;
