import React, { Component } from "react";
import { createClient } from "contentful";
import { ServerStyleSheet } from "styled-components";
import axios from "axios";
import moment from "moment";
import md5 from "md5";
import * as dotenv from "dotenv";
import fontLoader from "./config/fontLoader";
import cssLoader from "./config/cssLoader";
import sassLoader from "./config/sassLoader";
import { pickRandom } from "./src/utils";
import { renderMarkdown } from "./src/markdownRenderer";

dotenv.config();

const contentful = createClient({
	space: process.env.CONTENTFUL_SPACE,
	accessToken: process.env.CONTENTFUL_TOKEN
});

function pick(obj, fields = []) {
	let picked = {};

	if (typeof obj === "object") {
		fields.forEach(field => {
			picked[field] = obj[field];
		});
	}

	return picked;
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
	Object.keys(copy)
		.filter(key => typeof copy[key] === "object")
		.forEach(key => {
			copy[key] = stripOutSysInfo(copy[key]);
		});

	copy.sys = copy.sys || pick(data.sys, ["updatedAt", "createdAt"]);

	return copy;
}

let githubCache;

export default {
	getSiteData: async () => {
		let config = require("./src/config.js");
		let github = githubCache;

		if (!github) {
			console.log("=> getting github data...");
			const { data } = await axios.get(
				`https://api.github.com/users/${config.githubUsername}`
			);
			github = githubCache = data;
		}

		// get gravitar
		let gravitar = `https://www.gravatar.com/avatar/${md5(
			String(config.email)
				.trim()
				.toLowerCase()
		)}?s=512`;

		return {
			github,
			...config,
			avatar: config.avatar || gravitar
		};
	},
	getRoutes: async () => {
		let { items: blogPosts } = await contentful.getEntries({
			content_type: "blogPost"
		});
		let { items: games } = await contentful.getEntries({
			content_type: "game"
		});
		let { items: pens } = await contentful.getEntries({
			content_type: "codePen"
		});

		games = games.sort((a, b) => {
			return moment(b.sys.updatedAt).diff(a.sys.updatedAt);
		});
		pens = pens.sort((a, b) => {
			return moment(b.sys.updatedAt).diff(a.sys.updatedAt);
		});

		const cleanedBlogPosts = stripOutSysInfo(blogPosts);
		const cleanedGames = stripOutSysInfo(games);
		const cleanedPens = stripOutSysInfo(pens);

		cleanedBlogPosts.map(post => {
			post.content = renderMarkdown(post.content);
		});

		return [
			{
				path: "/",
				getData: () => ({
					games: cleanedGames,
					pens: pickRandom(cleanedPens, 6),
					posts: cleanedBlogPosts.slice(0, 5),
					rawPens: pens
				})
			},
			{
				path: "/blog",
				getData: () => ({
					posts: cleanedBlogPosts
				}),
				children: cleanedBlogPosts.map(post => ({
					path: `/${post.slug}`,
					getData: () => ({
						post: post,
						otherPosts: pickRandom(cleanedBlogPosts, 6, [post])
					})
				}))
			},
			{
				path: "/games",
				getData: () => ({
					games: cleanedGames
				}),
				children: cleanedGames.map(game => ({
					path: `/${game.id}`,
					getData: () => ({
						game: game,
						otherGames: pickRandom(cleanedGames, 2, [game])
					})
				}))
			},
			{
				path: "/pens",
				getData: () => ({
					pens: cleanedPens
				}),
				children: cleanedPens.map(pen => ({
					path: `/${pen.id}`,
					getData: () => ({
						pen,
						otherPens: pickRandom(cleanedPens, 4, [pen])
					})
				}))
			},
			{
				path: "/contact"
			},
			{
				path: "/search",
				getData: () => ({
					games: cleanedGames,
					pens: cleanedPens
				})
			}
		];
	},
	siteRoot: require("./src/config.js").siteUrl,
	renderToHtml: (render, Comp, meta) => {
		const sheet = new ServerStyleSheet();
		const html = render(sheet.collectStyles(<Comp />));
		meta.styleTags = sheet.getStyleElement();
		return html;
	},
	Document: class CustomHtml extends Component {
		render() {
			const { Html, Head, Body, children, renderMeta } = this.props;

			return (
				<Html lang="en-US">
					<Head>
						<meta charSet="UTF-8" />
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1"
						/>
						{renderMeta.styleTags}
					</Head>
					<Body>{children}</Body>
				</Html>
			);
		}
	},
	webpack: (config, { defaultLoaders, stage }) => {
		config.module.rules = [
			{
				oneOf: [
					sassLoader(stage),
					cssLoader(stage),
					defaultLoaders.jsLoader,
					fontLoader(stage),
					defaultLoaders.fileLoader
				]
			}
		];
		config.devtool = stage === "dev" ? "source-map" : false;
		return config;
	}
};
