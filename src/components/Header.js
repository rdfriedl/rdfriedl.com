import React from "react";
import { Link, withSiteData, Prefetch } from "react-static";
import styled from "styled-components";

import ExternalLink from "./ExternalLink";
import MobileNavDraw from "./MobileNavDraw";
import SearchForm from "./SearchForm";
import { breakpoints } from "../utils";
import NavMenu from "./NavMenu";

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
	grid-template-areas: "avatar title search" "avatar navbar source";

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
	.source-link {
		grid-area: source;

		display: flex;
		justify-content: flex-end;
	}
	form[action="/search"] {
		grid-area: search;
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

const Header = withSiteData(({ sourceUrl, avatar, name }) => (
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
				<NavMenu />
			</div>

			<SearchForm />

			<div className="source-link">
				<ExternalLink
					className="button"
					href={sourceUrl}
					aria-label="view source"
				>
					<i className="fa fa-github" /> View Source
				</ExternalLink>
			</div>
		</DesktopHeader>

		{/*mobile header*/}
		<MobileHeader>
			<label htmlFor="drawer-checkbox" className="button drawer-toggle" />
			<h3>{name}</h3>
			<ExternalLink
				className="button source"
				href={sourceUrl}
				aria-label="view source"
			>
				<i className="fa fa-github" />
			</ExternalLink>
		</MobileHeader>

		<MobileNavDraw />
	</HeaderStyles>
));

export default Header;
