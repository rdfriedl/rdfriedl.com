import React from "react";
import { withRouteData, Head, withSiteData } from "react-static";
import styled from "styled-components";

import { breakpoints, createTitle } from "../utils";
import config from "../config.js";

import ExternalLink from "../components/ExternalLink";
import Card from "../components/Card";
import GameCard from "../components/GameCard";
import Pen from "../components/PenCard";
import About from "../components/About";
import TitleWithButton from "../components/TitleWithButton";
import { GamesLayout } from "../components/Layouts";

const Layout = styled.div`
	main {
		grid-area: main;
	}
	aside {
		grid-area: side;
	}

	@media (${breakpoints.phone}) {
		display: block;
	}
	@media (${breakpoints.desktop}) {
		display: grid;

		grid-template-columns: 3fr 1fr;
		grid-template-areas: "main side";
	}
`;

const PensLayout = styled.div`
	display: grid;
	grid-gap: 1rem;
	padding: 0.5rem;

	@media (${breakpoints.phone}) {
		grid-template-columns: 1fr;
	}
	@media (${breakpoints.tablet}) {
		grid-template-columns: 1fr 1fr;
	}
	@media (${breakpoints.desktop}) {
		grid-template-columns: 1fr;
	}
`;

const AboutHeader = () => (
	<h2>
		<i className="fa fa-info-circle" /> About
	</h2>
);
const GamesHeader = () => (
	<h2>
		<i className="fa fa-gamepad" /> Games
	</h2>
);
const PensHeader = () => (
	<TitleWithButton>
		<h3>
			<i className="fa fa-codepen" /> Pens
		</h3>
		<ExternalLink
			className="button success"
			href={config.socialLinks.find(link => link.id === "codepen").href}
		>
			<i className="fa fa-link" /> More
		</ExternalLink>
	</TitleWithButton>
);

const HomeMetaTags = withSiteData(({ name, description, siteUrl, avatar }) => (
	<Head>
		{/*COMMON TAGS*/}
		<title>{createTitle()}</title>
		{/*Search Engine*/}
		<meta name="description" content={description} />
		<meta name="image" content={avatar} />
		{/*Schema.org for Google*/}
		<meta itemprop="name" content={name} />
		<meta itemprop="description" content={description} />
		<meta itemprop="image" content={avatar} />
		{/*Twitter*/}
		<meta name="twitter:card" content="summary" />
		<meta name="twitter:title" content={name} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image:src" content={avatar} />
		{/*Open Graph general (Facebook, Pinterest & Google+)*/}
		<meta property="og:title" content={name} />
		<meta property="og:description" content={description} />
		<meta property="og:url" content={siteUrl} />
		<meta property="og:site_name" content={name} />
		<meta property="og:image" content={avatar} />
		<meta property="og:image:width" content={512} />
		<meta property="og:image:height" content={512} />
		<meta property="og:type" content="profile" />
	</Head>
));

const HomePage = withRouteData(({ pens, games }) => (
	<Layout>
		<HomeMetaTags />

		<main>
			<section>
				<Card header={<AboutHeader />}>
					<About />
				</Card>
			</section>

			<section>
				<Card header={<GamesHeader />}>
					<GamesLayout>
						{games.map(game => <GameCard key={game.id} game={game} />)}
					</GamesLayout>
				</Card>
			</section>
		</main>

		<aside>
			<Card header={<PensHeader />}>
				<PensLayout>
					{pens.map(pen => <Pen key={pen.id} pen={pen} />)}
				</PensLayout>
			</Card>
		</aside>
	</Layout>
));

export default HomePage;
