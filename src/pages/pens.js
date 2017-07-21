import React from "react";
import Helmet from "react-helmet";
import Pen from "../components/Pen";
import { createTitle } from "../utils/utils";
import ExternalLink from "../components/ExternalLink";

export default class PensPage extends React.Component {
	render() {
		const { allPens, codepenProfile } = this.props.data;

		return (
			<div>
				<Helmet title={createTitle("Pens")} />

				<div className="layout-row align-between-center">
					<h1>Pens</h1>
					<ExternalLink href={codepenProfile.href} className="button success">
						More Pens
					</ExternalLink>
				</div>
				<hr />
				<div className="layout-row layout-wrap">
					{allPens.pens.map(({ pen }) =>
						<div
							className="flex-100 flex-sm-50 flex-md-33 flex-lg-25"
							key={pen.id}
						>
							<Pen pen={pen} />
						</div>
					)}
				</div>
				<hr />
				<div className="layout-row align-center-center">
					<ExternalLink
						href={codepenProfile.href}
						className="flex-80 flex-sm-50 flex-md-40 flex-lg-30 button success block large no-margin"
					>
						More Pens
					</ExternalLink>
				</div>
			</div>
		);
	}
}

export const pageQuery = graphql`
	query pens {
		allPens: allPensJson {
			pens: edges {
				pen: node {
					...PenComponentFields
				}
			}
		}
		codepenProfile: profileLinksJson(id: { eq: "codepen" }) {
			href
		}
	}
`;
