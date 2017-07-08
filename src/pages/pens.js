import React from 'react';
import Link from "gatsby-link"
import Helmet from 'react-helmet';

export default class PensPage extends React.Component {
	render(){
		const { allPens } = this.props.data;

		return (
			<div>
				<Helmet title="Robert Friedl - Pens"/>

				<h1>Pens</h1>
				{allPens.pens.map(({pen}) => (
					<div key={pen.id}>
						<Link to={`/pen/${pen.id}`}>{pen.title}</Link>
					</div>
				))}
			</div>
		);
	}
}

export const pageQuery = graphql`
query pens {
	allPens: allPensJson {
		pens: edges {
			pen: node {
				id
				title
				thumbnail
			}
		}
	}
}`;
