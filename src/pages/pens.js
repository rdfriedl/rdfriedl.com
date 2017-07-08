import React from 'react';
import Helmet from 'react-helmet';
import Pen from '../components/Pen';
import {createTitle} from '../utils/utils';

export default class PensPage extends React.Component {
	render(){
		const { allPens } = this.props.data;

		return (
			<div>
				<Helmet title={createTitle("Pens")}/>

				<h1>Pens</h1>
				<div className="row">
				{allPens.pens.map(({pen}) => (
					<div className="col-sm-12 col-md-6 col-lg-3" key={pen.id}>
						<Pen pen={pen}/>
					</div>
				))}
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
				id
				title
				thumbnail
			}
		}
	}
}`;
