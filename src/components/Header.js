import React, { Component } from "react";
import Link from "gatsby-link";
import ExternalLink from "./ExternalLink";
import MobileNavDraw from './MobileNavDraw';
import NavLink from './NavLink';
import config from '../siteConfig';

export default class Header extends Component {
	render() {
		const {sourceUrl} = config;

		return (
			<div id="header" {...this.props}>
				{/*desktop header*/}
				<header className="layout-row hidden-sm">
					<Link to="/">
						<img className="avatar circular m-2" src={config.avatar} alt="avatar" title={config.name}/>
					</Link>
					<div className="flex layout-column pl-2 pb-2">
						<h2 className="mx-0">{config.name}</h2>

						<span className="flex"/>

						<div className="flex-noshrink flex-nogrow layout-row">
							<NavLink to="/" matchSubPaths={false}>
								<i className="fa fa-home"/> Home
							</NavLink>
							<NavLink to="/games/">
								<i className="fa fa-gamepad"/> Games
							</NavLink>
							<NavLink to="/pens/">
								<i className="fa fa-codepen"/> Pens
							</NavLink>

							<span className="flex"/>

							<ExternalLink
								className="button hidden-sm"
								href={sourceUrl}
							>
								<i className="fa fa-github"/> View Source
							</ExternalLink>
						</div>
					</div>
				</header>

				{/*mobile header*/}
				<MobileNavDraw className="hidden-md hidden-lg"/>
				<header className="hidden-md hidden-lg">
					<label htmlFor="drawer-checkbox" className="button drawer-toggle"/>
				</header>
			</div>
		);
	}
}
