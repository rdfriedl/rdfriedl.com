import React from "react";
import { transformAllJsonData } from '../utils/utils';
import ExternalLink from "../components/ExternalLink";
import Card from '../components/Card';
import Game from '../components/Game';
import Pen from '../components/Pen';
import About from '../components/About';

export default class Index extends React.Component {
  render() {
  	const { data } = this.props;
  	const games = transformAllJsonData(data.allGamesJson);
  	const pens = transformAllJsonData(data.allPensJson);

		// only show 6 pens on the main page
		pens.sort(() => Math.floor(Math.random() * 3)-1);
		pens.length = 6;

		const headers = {
			about: (
				<h2><i className="fa fa-info-circle"/> About</h2>
			),
			games: (
				<h2><i className="fa fa-gamepad"/> Games</h2>
			),
			pens: (
				<div className="layout-row align-between">
					<h3><i className="fa fa-codepen"/> Pens</h3>
					<ExternalLink className="button success" href={data.codepen.href}><i className="fa fa-link"/> More</ExternalLink>
				</div>
			)
		};

    return (
      <div className="layout-row layout-wrap">
				<main className="layout-column flex-md">
					<section>
						<Card header={headers.about}>
							<About/>
						</Card>
					</section>
					<section>
						<Card header={headers.games}>
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
				<aside className="flex-100 flex-md-25 order-sm-2">
					<Card header={headers.pens}>
						<div className="layout-row layout-wrap">
							{pens.map(pen => (
								<div className="flex-100 flex-sm-50 flex-md-100" key={pen.id}>
									<Pen pen={pen}/>
								</div>
							))}
						</div>
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
	
	codepen: profileLinksJson(id: {eq: "codepen"}) {
    href
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
