import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {createTitle} from '../utils/utils';
import Game from '../components/Game';

export default class GameTemplate extends Component {
	render() {
		const { game, otherGames } = this.props.data;

		otherGames.games = otherGames.games.sort(() => Math.floor(Math.random() * 3)-1);
		otherGames.games.length = 4;

		return (
			<div>
				<Helmet title={createTitle(game.title)}/>
				<h1>{game.title}</h1>

				<h2>Other Games</h2>
				<div className="layout-row layout-wrap">
					{otherGames.games.map(({game}) => (
						<div className="flex-100 flex-lg-50" key={game.id}>
							<Game game={game}/>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export const pageQuery = graphql`
query Game($id: String) {
  game: gamesJson(id: {eq: $id}) {
    id
    title
    thumbnail
    videoThumbnail
    sourceURL
    media {
      type
      src
      thumbnail
    }
  }
	otherGames: allGamesJson(filter: {id: {ne: $id}}){
		games: edges {
			game: node {
				...GameComponentFields
			}
		}
	}
}
`;
