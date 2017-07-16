import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {createTitle} from '../utils/utils';
import ExternalLink from '../components/ExternalLink';
import Link from 'gatsby-link';

const iframeStyles = {
	border: 'none'
};

export class PlayTemplate extends Component {
	render() {
		const { game } = this.props.data;

		return (
			<div className="flex layout-column">
				<Helmet title={createTitle('Play',game.title)}/>

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

export default PlayTemplate;

export const pageQuery = graphql`
query PlayGame($id: String) {
  game: gamesJson(id: {eq: $id}) {
    id
    title
    demoURL
    sourceURL
  }
}
`;
