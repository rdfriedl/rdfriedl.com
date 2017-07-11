import React from "react";
import { transformAllJsonData } from '../utils/utils';
import ExternalLink from "../components/ExternalLink";
import Card from '../components/Card';
import Game from '../components/Game';
import Pen from '../components/Pen';

export default class Index extends React.Component {
  render() {
  	const { data } = this.props;
  	const games = transformAllJsonData(data.allGamesJson);
  	const pens = transformAllJsonData(data.allPensJson);

		// only show 6 pens on the main page
		pens.sort(() => Math.floor(Math.random() * 3)-1);
		pens.length = 6;

    return (
      <div className="layout-row">
				<main className="layout-column flex">
					<section>
						<Card header={<h2>About</h2>}>

						</Card>
					</section>
					<section>
						<Card header={<h2>Games</h2>}>
							<div className="layout-row layout-wrap">
								{games.map(game =>
									<div className="flex-100 flex-lg-50" key={game.id}>
										<Game game={game}/>
									</div>
								)}
							</div>
						</Card>
					</section>
				</main>
				<aside className="flex-25">
					<Card header={<div className="layout-row align-between"><h3>Pens</h3><ExternalLink className="button tertiary"><i className="fa fa-codepen"></i> More</ExternalLink></div>}>
						{pens.map(pen => (
							<Pen pen={pen} key={pen.id}/>
						))}
					</Card>
				</aside>
      </div>
    )
  }
}

export const pageQuery = graphql`
query data{
	allGamesJson {
		edges {
			node {
				...GameComponentFields
			}
		}	
	}
	allPensJson {
		edges {
			node {
				...PenComponentFields
			}
		}
	}
}

# Component fragments
fragment GameComponentFields on GamesJson {
	id
	title
	description
	demoURL
	sourceURL
	thumbnail
	videoThumbnail
}
fragment PenComponentFields on PensJson {
	id
	title
	thumbnail
}
`;
