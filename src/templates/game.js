import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {createTitle} from '../utils/utils';
import Game from '../components/Game';
import ExternalLink from '../components/ExternalLink';

const iframeStyles = {
	border: 'none'
};

export default class GameTemplate extends Component {
	render() {
		const { game, otherGames } = this.props.data;

		otherGames.games = otherGames.games.sort(() => Math.floor(Math.random() * 3)-1);
		otherGames.games.length = 4;

		return (
			<div className="flex layout-column">
				<Helmet title={createTitle(game.title)}/>

				<div className="flex-no-shirnk layout-row align-between-start">
					<h3>{game.title}</h3>
					<div>
						{game.sourceURL && <ExternalLink className="button primary" href={game.sourceURL}><i className="fa fa-code"/> Source</ExternalLink>}
						<ExternalLink className="button success" href={game.demoURL}><i className="fa fa-reply"/> Open</ExternalLink>
					</div>
				</div>

				<iframe className="flex" src={game.demoURL} style={iframeStyles}/>
			</div>
		);
	}
}

export const pageQuery = graphql`
query Game($id: String) {
  game: gamesJson(id: {eq: $id}) {
    id
    title
    demoURL
    sourceURL
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
