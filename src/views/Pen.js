import React from "react";
import { withRouteData, Head, withSiteData } from "react-static";
import styled from "styled-components";
import _get from "lodash/get";

import { createTitle } from "../utils";
import PenCard from "../components/PenCard";
import DisqusComments from "../components/DisqusComments";
import { PensLayout } from "../components/Layouts";

const EmbeddedPen = styled.iframe`
	width: 100%;
	height: 80vh;
	border: none;
`;

const PenMetaTags = withSiteData(
	withRouteData(({ pen, name, avatar, siteUrl, match }) => {
		let title = createTitle(pen.title);
		let description = pen.title;

		return (
			<Head>
				{/*COMMON TAGS*/}
				<title>{title}</title>
				{/*Search Engine*/}
				<meta name="description" content={description} />
				<meta name="image" content={_get(pen, "thumbnail.file.url")} />
				{/*Schema.org for Google*/}
				<meta itemprop="name" content={pen.title} />
				<meta itemprop="description" content={description} />
				<meta itemprop="image" content={_get(pen, "thumbnail.file.url")} />
				{/*Twitter*/}
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={pen.title} />
				<meta name="twitter:description" content={description} />
				<meta
					name="twitter:image:src"
					content={_get(pen, "thumbnail.file.url")}
				/>
				{/*Open Graph general (Facebook, Pinterest & Google+)*/}
				<meta property="og:title" content={pen.title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content={siteUrl + match.url} />
				<meta property="og:site_name" content={name} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={_get(pen, "thumbnail.file.url")} />
			</Head>
		);
	})
);

const PenPage = withRouteData(({ pen, otherPens }) => (
	<div>
		<PenMetaTags />

		<h1>{pen.title}</h1>
		<EmbeddedPen
			scrolling="no"
			title={pen.id}
			src={`//codepen.io/rdfriedl/embed/${
				pen.id
			}/?theme-id=dark&default-tab=result&embed-version=2`}
		>
			See the Pen{" "}
			<a href={"https://codepen.io/rdfriedl/pen/" + pen.id}>{pen.id}</a> by
			rdfriedl (<a href="https://codepen.io/rdfriedl">@rdfriedl</a>) on{" "}
			<a href="https://codepen.io">CodePen</a>
		</EmbeddedPen>

		<h2>Other Pens</h2>
		<PensLayout>
			{otherPens.map(pen => pen && <PenCard key={pen.id} pen={pen} />)}
		</PensLayout>

		<DisqusComments
			disqusId={`pen-${pen.id}`}
			disqusTitle={pen.title}
			category="pen"
		/>
	</div>
));

export default PenPage;
