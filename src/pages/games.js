import React from "react";
import Helmet from "react-helmet";
import Game from "../components/Game";
import { createTitle } from "../utils/utils";

export default class GamesPage extends React.Component {
	render() {
		const games = this.props.data.allGames.games.map(d => d.game);

		return (
			<div>
				<Helmet title={createTitle("Games")} />

				<h1>Games</h1>
				<hr />
				<div className="layout-row layout-wrap">
					{games.map(game =>
						<div className="flex-100 flex-lg-50" key={game.id}>
							<Game game={game} />
						</div>
					)}
				</div>
			</div>
		);
	}
}

export const pageQuery = graphql`
	query games {
		allGames: allGamesJson {
			games: edges {
				game: node {
					...GameComponentFields
				}
			}
		}
	}
`;
