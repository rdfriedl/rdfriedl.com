import React from 'react';
import Link from 'gatsby-link';
import ExternalLink from './ExternalLink';
import classNames from 'classnames';

export const GameButtons = ({game, ...props}) => (
	<div {...props}>
		{game.demoURL && <Link to={`/game/${game.id}/play`} className="button tertiary">Play</Link>}
		{game.sourceURL && <ExternalLink to={game.sourceURL} className="button primary">Source</ExternalLink>}
		<Link to={`/game/${game.id}`} className="button">View</Link>
	</div>
);

const Game = ({game, className, ...props}) => (
	<div className={classNames("game card fluid hover-shadow", className)} {...props}>
		<div className="layout-row">
			<div className="flex-33">
				<Link to={`/game/${game.id}`}>
					{game.thumbnail && <img src={game.thumbnail} alt={game.title} style={{
						margin: 0,
						width: '100%'
					}}/>}
					{game.videoThumbnail && <div className="video-thumbnail">
						<i className="fa fa-play-circle overlay-icon overlay-icon-hide"/>
						<video className="play-on-hover img-responsive" preload="auto" src={game.videoThumbnail}/>
					</div>}
				</Link>
			</div>
			<div className="flex layout-column align-between">
				<div>
					<h3>{game.title}</h3>
					<p>{game.description}</p>
				</div>
				<GameButtons className="flex-nogrow layout-row align-end-start" game={game}/>
			</div>
		</div>
	</div>
);

export default Game;