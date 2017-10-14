import React from "react";
import { getRouteProps, Head, Link } from "react-static";
import styled from "styled-components";

import {breakpoints, createTitle} from "../utils";

import ExternalLink from "../components/ExternalLink";
import Card from "../components/Card";
import Game from "../components/Game";
import Pen from "../components/Pen";
import About from "../components/About";
import TitleWithButton from "../components/TitleWithButton";

const Layout = styled.div`
	main {
		grid-area: main;
	}
	aside {
		grid-area: side;
	}
	
	@media(${breakpoints.phone}){
		display: block;
	}
	@media(${breakpoints.desktop}){
		display: grid;
	
		grid-template-columns: 3fr 1fr;
		grid-template-areas: "main side";
	}
`;

const GamesLayout = styled.div`
	display: grid;
	grid-gap: 1rem;
	padding: 0.5rem;
	
	@media(${breakpoints.phone}){
		grid-template-columns: 1fr;
	}
	@media(${breakpoints.tablet}){
		grid-template-columns: 1fr 1fr;
	}
	@media(${breakpoints.desktop}){
		grid-template-columns: 1fr;
	}
	@media(${breakpoints.large}){
		grid-template-columns: 1fr 1fr;
	}
`;

const PensLayout = styled.div`
	display: grid;
	grid-gap: 1rem;
	padding: 0.5rem;
	
	@media(${breakpoints.phone}){
		grid-template-columns: 1fr;
	}
	@media(${breakpoints.tablet}){
		grid-template-columns: 1fr 1fr;
	}
	@media(${breakpoints.desktop}){
		grid-template-columns: 1fr;
	}
`;

const HomePage = getRouteProps(({ pens, games }) => {
	// only show 6 pens on the main page
	pens.sort(() => Math.floor(Math.random() * 3) - 1);
	pens.length = 6;

	const headers = {
		about: (
			<h2>
				<i className="fa fa-info-circle" /> About
			</h2>
		),
		games: (
			<h2>
				<i className="fa fa-gamepad" /> Games
			</h2>
		),
		pens: (
			<TitleWithButton>
				<h3>
					<i className="fa fa-codepen" /> Pens
				</h3>
				<ExternalLink className="button success" href={4}>
					<i className="fa fa-link" /> More
				</ExternalLink>
			</TitleWithButton>
		)
	};

	return (
		<Layout>
			<Head>
				<title>{createTitle()}</title>
			</Head>

			<main>
				<section>
					<Card header={headers.about}>
						<About />
					</Card>
				</section>

				<section>
					<Card header={headers.games}>
						<GamesLayout>
							{games.map(game => <Game key={game.id} game={game} />)}
						</GamesLayout>
					</Card>
				</section>
			</main>

			<aside>
				<Card header={headers.pens}>
					<PensLayout>
						{pens.map(pen => <Pen key={pen.id} pen={pen} />)}
					</PensLayout>
				</Card>
			</aside>
		</Layout>
	);
});

export default HomePage;
