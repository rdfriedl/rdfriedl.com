import React from "react";
import Helmet from "react-helmet";
import { getRouteProps, Switch, Route } from "react-static";

import { GamesLayout } from "../components/Layouts";
import GamePage from "./Game";
import Game from "../components/Game";
import { createTitle } from "../utils";

const GamesPage = getRouteProps(({ games }) => (
	<div>
		<Helmet>
			<title>{createTitle("Games")}</title>
		</Helmet>

		<h1>Games</h1>
		<hr />
		<GamesLayout>
			{games.map(game => <Game key={game.id} game={game} />)}
		</GamesLayout>
	</div>
));

export default getRouteProps(({ match, games }) => (
	<Switch>
		<Route exact path={match.url} component={GamesPage} />
		<Route path={`${match.url}/:gameId`} component={GamePage} />
	</Switch>
));
