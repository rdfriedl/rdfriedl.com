import React from "react";
import Helmet from "react-helmet";
import { getRouteProps, Switch, Route } from "react-static";
import styled from "styled-components";

import GamePage from "./Game";
import Game from "../components/Game";
import { breakpoints, createTitle } from "../utils";

const Layout = styled.div`
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
	@media (${breakpoints.large}) {
		grid-template-columns: 1fr 1fr;
	}
`;

const GamesPage = getRouteProps(({ games }) => (
	<div>
		<Helmet>
			<title>{createTitle("Games")}</title>
		</Helmet>

		<h1>Games</h1>
		<hr />
		<Layout>{games.map(game => <Game key={game.id} game={game} />)}</Layout>
	</div>
));

export default getRouteProps(({ match, games }) => (
	<Switch>
		<Route exact path={match.url} component={GamesPage} />
		<Route path={`${match.url}/:gameId`} component={GamePage} />
	</Switch>
));
