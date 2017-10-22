import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { getSiteProps, getRouteProps, Switch, Route, Head } from "react-static";

import Pen from "../components/Pen";
import PenPage from "./Pen";
import { PensLayout } from "../components/Layouts";
import { createTitle } from "../utils";
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

const PensPage = getSiteProps(
	getRouteProps(({ pens, socialLinks }) => {
		const codependLink = socialLinks.find(link => link.id === "codepen");

		return (
			<PageStyles>
				<Head>
					<title>{createTitle("Pens")}</title>
				</Head>

				<TitleWithButton>
					<h1>Pens</h1>
					<ExternalLink href={codependLink.href} className="button success">
						<i className={classNames("fa", "fa-" + codependLink.icon)} /> More
						Pens
					</ExternalLink>
				</TitleWithButton>
				<hr />
				<PensLayout>
					{pens.map(pen => <Pen key={pen.id} pen={pen} />)}
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

export default getRouteProps(({ match, pens, ...props }) => (
	<Switch>
		<Route exact path={match.url} component={PensPage} />
		<Route path={`${match.url}/:penId`} component={PenPage} />
	</Switch>
));
