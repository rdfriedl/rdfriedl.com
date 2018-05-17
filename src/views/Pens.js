import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { withSiteData, withRouteData, Switch, Route, Head } from "react-static";

import PenCard from "../components/PenCard";
import PenPage from "./Pen";
import { PensLayout } from "../components/Layouts";
import { createTitle, pickRandom } from "../utils";
import ExternalLink from "../components/ExternalLink";
import TitleWithButton from "../components/TitleWithButton";

const PageStyles = styled.div`
	.bottom-container {
		display: flex;
		justify-content: center;

		a.button {
			padding: 0.75rem 4rem;
		}
	}
`;

const PensMetaTags = withSiteData(
	withRouteData(({ pens, name, description, avatar, siteUrl, match }) => {
		let defaultPen = pens.find(pen => !!pen.thumbnail);
		let title = createTitle("Pens");

		return (
			<Head>
				{/*COMMON TAGS*/}
				<title>{title}</title>
				{/*Search Engine*/}
				<meta name="description" content={description} />
				<meta name="image" content={defaultPen.thumbnail.file.url} />
				{/*Schema.org for Google*/}
				<meta itemprop="name" content={title} />
				<meta itemprop="description" content={description} />
				<meta itemprop="image" content={defaultPen.thumbnail.file.url} />
				{/*Twitter*/}
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta
					name="twitter:image:src"
					content={defaultPen.thumbnail.file.url}
				/>
				{/*Open Graph general (Facebook, Pinterest & Google+)*/}
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content={siteUrl + match.url} />
				<meta property="og:site_name" content={name} />
				<meta property="og:type" content="website" />
				{pickRandom(pens, 4)
					.filter(pen => !!pen.thumbnail)
					.map(pen => (
						<meta
							key={pen.id}
							property="og:image"
							content={pen.thumbnail.file.url}
						/>
					))}
			</Head>
		);
	})
);

const PensPage = withSiteData(
	withRouteData(({ pens, socialLinks }) => {
		const codependLink = socialLinks.find(link => link.id === "codepen");

		return (
			<PageStyles>
				<PensMetaTags />

				<TitleWithButton>
					<h1>Pens</h1>
					<ExternalLink href={codependLink.href} className="button success">
						<i className={classNames("fa", "fa-" + codependLink.icon)} /> More
						Pens
					</ExternalLink>
				</TitleWithButton>
				<hr />
				<PensLayout>
					{pens.map(pen => <PenCard key={pen.id} pen={pen} />)}
				</PensLayout>
				<hr />
				<div className="bottom-container">
					<ExternalLink href={codependLink.href} className="button success">
						<i className={classNames("fa", "fa-" + codependLink.icon)} /> More
						Pens
					</ExternalLink>
				</div>
			</PageStyles>
		);
	})
);

export default withRouteData(({ match, pens, ...props }) => (
	<Switch>
		<Route exact path={match.url} component={PensPage} />
		<Route path={`${match.url}/:penId`} component={PenPage} />
	</Switch>
));
