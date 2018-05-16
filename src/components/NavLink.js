import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link, Route } from "react-static";

export default class NavLink extends Component {
	static propTypes = {
		to: PropTypes.string.isRequired,
		matchSubPaths: PropTypes.bool
	};

	static defaultProps = {
		matchSubPaths: true
	};

	render() {
		const { to, matchSubPaths, children, className, ...props } = this.props;

		return (
			<Route
				path={to}
				exact={!matchSubPaths}
				children={({ match }) => (
					<Link
						to={to}
						className={classNames("button", { inverse: !!match }, className)}
						{...props}
					>
						{children}
					</Link>
				)}
			/>
		);
	}
}
