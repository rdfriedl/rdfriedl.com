import React, { Component } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { createTitle } from "../utils/utils";

import glitch from "!raw-loader!../res/glitch.svg";

const messages = ["Looks like that page dose not exist...", "Page not found"];
const fonts = [
	"Audiowide",
	"Bungee Inline",
	"Bungee Shade",
	"Finger Paint",
	"Passion One",
	"Codystar",
	"Comfortaa",
	"Iceland",
	"Ubuntu Mono",
	"Vast Shadow",
	"Bungee Hairline",
	"Bungee Outline",
	"Geostar",
	"Sevillana"
];

const padding = "6vh 0 10vh 0";

const containerStyles = {
	filter: "url(#glitch)"
};

const titleStyles = {
	fontSize: "10rem",
	fontWeight: "normal",
	marginBottom: 0
};

const messageStyles = {
	marginTop: 0,
	fontSize: "3rem"
};

const linkStyles = {
	fontSize: "1.5rem"
};

export default class FourOFour extends Component {
	render() {
		const message = messages[Math.floor(Math.random() * messages.length)];
		const fontFamily = fonts[Math.floor(Math.random() * fonts.length)];

		return (
			<div className="flex layout-column align-start">
				<Helmet title={createTitle("404")}>
					<link
						rel="stylesheet"
						href={`https://fonts.googleapis.com/css?family=${fontFamily}`}
					/>
				</Helmet>
				<div dangerouslySetInnerHTML={{ __html: glitch }} />

				<div
					className="card layout-column align-center-center text-center"
					style={{ padding }}>
					<div
						className="layout-column align-start-center"
						style={containerStyles}>
						<h1 style={{ ...titleStyles, fontFamily }}>404</h1>
						<p style={messageStyles}>
							{message}
						</p>
					</div>
					<Link to="/" style={linkStyles}>
						Go to back to home
					</Link>
				</div>
			</div>
		);
	}
}
