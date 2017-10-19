import React from "react";
import { Link, getSiteProps, Prefetch } from "react-static";
import styled from "styled-components";

import ExternalLink from "./ExternalLink";
import MobileNavDraw from "./MobileNavDraw";
import NavLink from "./NavLink";
import { breakpoints } from "../utils";

let HeaderStyles = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 1000;

	header {
		height: auto;
	}

	img.avatar {
		height: 10vh;
		width: 10vh;
	}
`;

const DesktopHeader = styled.header`
	padding: 1rem 1rem 0.5rem 1rem;

	grid-gap: 0.4rem;
	grid-template-rows: 1fr auto;
	grid-template-columns: auto 1fr auto;
	grid-template-areas: "avatar title title" "avatar navbar source";

	.avatar {
		grid-area: avatar;
		width: 6rem;
	}
	.title {
		grid-area: title;
		margin-top: 0;
		margin-left: 0.8rem;
	}
	.navbar {
		grid-area: navbar;
		margin-left: 0.8rem;
	}
	.source {
		grid-area: source;
	}

	display: none;
	@media (${breakpoints.tablet}) {
		display: grid;
	}
`;

const MobileHeader = styled.header`
	justify-content: space-between;
	align-items: center;

	display: none;
	@media (${breakpoints.phone}) {
		display: flex;
	}
`;

const Header = getSiteProps(({ sourceUrl, avatar, name }) => (
	<HeaderStyles id="header">
		{/*prefetch*/}
		<Prefetch path="/" />
		<Prefetch path="/games" />
		<Prefetch path="/pens" />

		{/*desktop header*/}
		<DesktopHeader>
			<Link to="/" className="avatar">
				<img className="circular" src={avatar} alt="avatar" title={name} />
			</Link>
			<h2 className="title">{name}</h2>

			<div className="navbar">
				<NavLink to="/" matchSubPaths={false}>
					<i className="fa fa-home" /> Home
				</NavLink>
				<NavLink to="/games/">
					<i className="fa fa-gamepad" /> Games
				</NavLink>
				<NavLink to="/pens/">
					<i className="fa fa-codepen" /> Pens
				</NavLink>
			</div>

			<ExternalLink className="button source" href={sourceUrl}>
				<i className="fa fa-github" /> View Source
			</ExternalLink>
		</DesktopHeader>

		{/*mobile header*/}
		<MobileHeader>
			<label htmlFor="drawer-checkbox" className="button drawer-toggle" />
			<h3>{name}</h3>
			<ExternalLink className="button source" href={sourceUrl}>
				<i className="fa fa-github" />
			</ExternalLink>
		</MobileHeader>

		<MobileNavDraw />
	</HeaderStyles>
));

export default Header;
