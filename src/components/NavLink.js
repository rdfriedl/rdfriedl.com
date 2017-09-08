import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Link from "gatsby-link";
import * as types from "../types";

export default class NavLink extends Component {
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