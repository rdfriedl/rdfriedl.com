import React, { Component } from "react";
import { createClient } from "contentful";
import axios from "axios";
import * as dotenv from "dotenv";
import fileLoader from "react-static/lib/plugins/withFileLoader";
import cssLoader from "./config/cssLoader";
import sassLoader from "./config/sassLoader";
import fontLoader from "./config/fontLoader";
import { ServerStyleSheet } from "styled-components";

dotenv.config();

const contentful = createClient({
	space: process.env.CONTENTFUL_SPACE,
	accessToken: process.env.CONTENTFUL_TOKEN
});

function pickRandom(items, count, exclude = []) {
	let arr = items
		.filter(item => !exclude.includes(item))
		.sort(() => Math.floor(Math.random() * 3) - 1);

	arr.length = Number.isInteger(count) ? count : items.length;
	return arr;
}

function stripOutSysInfo(data) {
	if (Array.isArray(data)) {
		return data.map(child => {
			if (typeof child === "object") {
				return stripOutSysInfo(child);
			}
			return child;
		});
	}

	let copy = Object.assign({}, data.fields || data);
	Reflect.ownKeys(copy)
		.filter(key => typeof copy[key] === "object")
		.forEach(key => {
			copy[key] = stripOutSysInfo(copy[key]);
		});

	return copy;
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
		let { items: games } = await contentful.getEntries({
			content_type: "game"
		});
		const pens = require("./src/data/pens.json");

		return [
			{
				path: "/",
				getProps: () => ({
					games: stripOutSysInfo(games),
					pens: pickRandom(pens, 6)
				})
			},
			{
				path: "/games",
				getProps: () => ({
					games: stripOutSysInfo(games)
				}),
				children: games.map(({ fields: game }) => ({
					path: `/${game.id}`,
					getProps: () => ({
						game: stripOutSysInfo(game),
						otherGames: [] // pickRandom(games, 2, [game])
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
			},
			{
				path: "/search",
				getProps: () => ({
					games: stripOutSysInfo(games),
					pens
				})
			}
		];
	},
	siteRoot: require("./src/data/config.json").siteUrl,
	Html: class CustomHtml extends Component {
		render() {
			const { Html, Head, Body, children } = this.props;

			const sheet = new ServerStyleSheet();
			const newChildren = sheet.collectStyles(children);
			const styleTags = sheet.getStyleElement();

			return (
				<Html lang="en-US">
					<Head>
						<meta charSet="UTF-8" />
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1"
						/>
						{styleTags}
					</Head>
					<Body>{newChildren}</Body>
				</Html>
			);
		}
	},
	webpack: [
		config => {
			config.devtool = "source-maps";
			return config;
		},
		sassLoader,
		cssLoader,
		fontLoader,
		fileLoader
	]
};
