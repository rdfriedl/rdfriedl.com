import React from "react";
import Helmet from "react-helmet";
import { getRouteProps, Switch, Route } from "react-static";
import styled from "styled-components";

import GamePage from "./Game";
import Game from "../components/Game";
import { createTitle } from "../utils";

const Layout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 1rem;
	padding: 0.5rem;
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
