import React, { Component } from "react";
import axios from "axios";

function pickRandom(items, count, exclude = []) {
	let arr = items
		.filter(item => !exclude.includes(item))
		.sort(() => Math.floor(Math.random() * 3) - 1);

	arr.length = Number.isInteger(count) ? count : items.length;
	return arr;
}

let githubCache;

export default {
	getSiteProps: async () => {
		let config = require("./src/data/config.json");
		let github = githubCache;

		if (!github) {
			console.log("=> getting github data...");
			const { data } = await axios.get(
				`https://api.github.com/users/${config.githubUsername}`
			);
			github = githubCache = data;
		}

		return {
			github,
			...config
		};
	},
	getRoutes: async () => {
		const games = require("./src/data/games.json");
		const pens = require("./src/data/pens.json");

		return [
			{
				path: "/",
				getProps: () => ({
					games,
					pens
				})
			},
			{
				path: "/games",
				getProps: () => ({
					games
				}),
				children: games.map(game => ({
					path: `/${game.id}`,
					getProps: () => ({
						game,
						otherGames: pickRandom(games, 2, [game])
					})
				}))
			},
			{
				path: "/pens",
				getProps: () => ({
					pens
				}),
				children: pens.map(pen => ({
					path: `/${pen.id}`,
					getProps: () => ({
						pen,
						otherPens: pickRandom(pens, 4, [pen])
					})
				}))
			}
		];
	},
	siteRoot: require("./src/data/config.json").siteUrl,
	Html: class CustomHtml extends Component {
		render() {
			const { Html, Head, Body, children } = this.props;
			return (
				<Html lang="en-US">
					<Head>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1"
						/>
					</Head>
					<Body>{children}</Body>
				</Html>
			);
		}
	},
	webpack: (config, { dev }) => {
		const styleLoader = {
			loader: "style-loader",
			options: {
				insertAt: "top", // insert these styles first so they do no overwrite the styled-components styles
				sourceMap: dev
			}
		};
		const cssLoader = {
			loader: "css-loader",
			options: {
				sourceMap: dev
			}
		};
		const sassLoader = {
			loader: "sass-loader",
			options: {
				sourceMap: dev
			}
		};

		config.merge(current => {
			// insert the sass loader right before the fallback loader
			current.module.rules.splice(current.module.rules.length - 1, 0, {
				test: /\.(sass|scss)$/,
				use: [styleLoader, cssLoader, sassLoader]
			});

			// tell the fallback loader to ignore sass files
			current.module.rules[current.module.rules.length - 1].exclude.push(
				/\.(sass|scss)$/
			);

			// insert the css loader right before the fallback loader
			current.module.rules.splice(current.module.rules.length - 1, 0, {
				test: /\.css$/,
				use: [styleLoader, cssLoader]
			});

			// tell the fallback loader to ignore css files
			current.module.rules[current.module.rules.length - 1].exclude.push(
				/\.css$/
			);

			return current;
		});
	}
};
