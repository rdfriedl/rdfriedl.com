import React from "react";
import { withRouteData, Head } from "react-static";
import styled from "styled-components";

import { createTitle } from "../utils";
import GameCard from "../components/GameCard";
import ExternalLink from "../components/ExternalLink";
import DisqusComments from "../components/DisqusComments";
import { GamesLayout } from "../components/Layouts";

const Layout = styled.div`
	display: grid;
	grid-template-columns: auto 1fr auto;
	grid-template-rows: 1fr 80vh auto auto;
	grid-template-areas:
		"title    ....     btns" "game     game     game"
		"other    other    other" "comments comments comments";

	min-height: 90vh;

	.title {
		grid-area: title;
	}
	.buttons {
		grid-area: btns;
	}
	.game {
		grid-area: game;
	}
	.other-games {
		grid-area: other;
	}
	.comments {
		grid-area: comments;
	}
`;

const EmbeddedGame = styled.iframe`
	border: none;
	width: 100%;
	height: 100%;
`;

const GamePage = withRouteData(({ game, otherGames }) => (
	<Layout>
		<Head>
			<title>{createTitle(game.title)}</title>
		</Head>

		<h3 className="title">{game.title}</h3>
		<div className="buttons">
			{game.sourceUrl && (
				<ExternalLink className="button primary" href={game.sourceUrl}>
					<i className="fa fa-code" /> Source
				</ExternalLink>
			)}
			<ExternalLink className="button success" href={game.demoUrl}>
				<i className="fa fa-reply" /> Open
			</ExternalLink>
		</div>

		<EmbeddedGame className="game" src={game.demoUrl} />

		<div className="other-games">
			<h2>Other Games</h2>
			<GamesLayout>
				{otherGames.map(game => game && <GameCard key={game.id} game={game} />)}
			</GamesLayout>
		</div>

		<div className="comments">
			<DisqusComments
				disqusId={`game-${game.id}`}
				disqusTitle={game.title}
				category="game"
			/>
		</div>
	</Layout>
));

export default GamePage;
