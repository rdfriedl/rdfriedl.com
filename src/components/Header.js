import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "gatsby-link";
import ExternalLink from "./ExternalLink";

import * as types from "../types";

export default class Header extends Component {
	static contextTypes = {
		siteMetadata: PropTypes.object
	};

	render() {
		const { siteMetadata } = this.context;

		return (
			<div id="header" {...this.props}>
				<header>
					<Link to="/" className="logo">
						Robert Friedl
					</Link>
					<span style={{ margin: 10 }} />
					<NavLink to="/" matchSubPaths={false}>
						<i className="fa fa-home" /> Home
					</NavLink>
					<NavLink to="/games/">
						<i className="fa fa-gamepad" /> Games
					</NavLink>
					<NavLink to="/pens/">
						<i className="fa fa-codepen" /> Pens
					</NavLink>

					<ExternalLink
						className="button float-right hidden-sm"
						href={siteMetadata.sourceUrl}
					>
						<i className="fa fa-github" /> View Source
					</ExternalLink>
				</header>
			</div>
		);
	}
}

export class NavLink extends Component {
	static contextTypes = {
		location: types.location
	};

	static propTypes = {
		to: PropTypes.string.isRequired,
		matchSubPaths: PropTypes.bool
	};

	static defaultProps = {
		matchSubPaths: true
	};

	render() {
		const { to, matchSubPaths, children, className, ...props } = this.props;
		const { location } = this.context;

		const isActive = matchSubPaths
			? location.pathname.indexOf(to) === 0
			: location.pathname === to;

		return (
			<Link
				to={to || "/"}
				className={classNames("button", { inverse: isActive }, className)}
				{...props}
			>
				{children}
			</Link>
		);
	}
}
