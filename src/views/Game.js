import React, { Component } from "react";
import { getRouteProps, Head } from "react-static";
import styled from "styled-components";

import { createTitle } from "../utils";
import Game from "../components/Game";
import ExternalLink from "../components/ExternalLink";
import DisqusComments from "../components/DisqusComments";

const Layout = styled.div`
	display: grid;
	grid-template-columns: auto 1fr auto;
	grid-template-rows: 1fr 80vh auto auto;
	grid-template-areas: "title    ....     btns" "game     game     game"
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

const OtherGamesLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 1rem;
	padding: 0.5rem;
`;

const EmbeddedGame = styled.iframe`
	border: none;
	width: 100%;
	height: 100%;
`;

const GamePage = getRouteProps(({ game, otherGames }) => (
	<Layout>
		<Head>
			<title>{createTitle(game.title)}</title>
		</Head>

		<h3 className="title">{game.title}</h3>
		<div className="buttons">
			{game.sourceURL && (
				<ExternalLink className="button primary" href={game.sourceURL}>
					<i className="fa fa-code" /> Source
				</ExternalLink>
			)}
			<ExternalLink className="button success" href={game.demoURL}>
				<i className="fa fa-reply" /> Open
			</ExternalLink>
		</div>

		<EmbeddedGame className="game" src={game.demoURL} />

		<div className="other-games">
			<h2>Other Games</h2>
			<OtherGamesLayout>
				{otherGames.map(game => game && <Game key={game.id} game={game} />)}
			</OtherGamesLayout>
		</div>

		<div className="comments">
			<DisqusComments
				disqusId={`pen-${game.id}`}
				disqusTitle={game.title}
				category="pen"
			/>
		</div>
	</Layout>
));

export default GamePage;
