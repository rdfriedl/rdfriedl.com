import React from "react";
import ExternalLink from "./ExternalLink";

const About = ({ ...props }) =>
	<div {...props}>
		<p>
			I am an enthusiastic front-end developer with extensive knowledge and
			experience in the latest, cutting edge client-side technologies.
		</p>
		<p>
			I enjoy learning and experimenting with new JavaScript libraries and front
			end frameworks.
		</p>
		<p>
			Some of my most recent experiments have used technologies like SVG, WebGl
			and{" "}
			<ExternalLink href="https://facebook.github.io/react/">
				React
			</ExternalLink>
		</p>
	</div>;

export default About;
