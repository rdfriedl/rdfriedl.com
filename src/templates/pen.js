import React from 'react';
import Helmet from 'react-helmet';
import {createTitle} from '../utils/utils';
import Pen from '../components/Pen';

class PenTemplate extends React.Component {
	render() {
		const { pen, otherPens } = this.props.data;
		const height = window.innerHeight * .8;

		otherPens.pens = otherPens.pens.sort(() => Math.floor(Math.random() * 3)-1);
		otherPens.pens.length = 4;

		return (
			<div>
				<Helmet title={createTitle(pen.title)}/>
				<h1>{pen.title}</h1>
				<iframe
					height={height} scrolling='no' title={pen.id}
					src={`//codepen.io/rdfriedl/embed/${pen.id}/?height=${height}&theme-id=dark&default-tab=result&embed-version=2`}
					style={{
						width: '100%',
						border: 'none'
					}}>
					See the Pen <a href='https://codepen.io/rdfriedl/pen/bRBPxG/'>bRBPxG</a> by rdfriedl (<a href='https://codepen.io/rdfriedl'>@rdfriedl</a>) on <a href='https://codepen.io'>CodePen</a>
				</iframe>

				<h2>Other Pens</h2>
				<div className="row">
				{otherPens.pens.map(({pen}) => (
					<div className="col-sm-12 col-md-6 col-lg-3" key={pen.id}>
						<Pen pen={pen}/>
					</div>
				))}
				</div>
			</div>
		)
	}
}

export default PenTemplate

export const pageQuery = graphql`
query Pen($id: String) {
	otherPens: allPensJson(filter: {id: {ne: $id}}){
		pens: edges {
			pen: node {
				id
				title
				thumbnail
			}
		}
	}
  pen: pensJson(id: {eq: $id}) {
    id
    title
    tags {
      message
      type
    }
    used
    thumbnail
  }
}`;