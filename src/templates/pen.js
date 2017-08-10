import React from 'react';
import Helmet from 'react-helmet';
import {createTitle} from '../utils/utils';
import Pen from '../components/Pen';
import DisqusComments from '../components/DisqusComments';

export default class PenTemplate extends React.Component {
	render() {
		const { pen, otherPens, sitePage } = this.props.data;
		let height = 600;
		try{
			height = window.innerHeight * 0.8;
		}
		catch(err){
			height = 600;
		}

		otherPens.pens = otherPens.pens.sort(() => Math.floor(Math.random() * 3)-1);
		otherPens.pens.length = 4;

		return (
			<div>
				<Helmet title={createTitle(pen.title)}/>
				<h1>{pen.title}</h1>
				<iframe
					scrolling='no' title={pen.id}
					src={`//codepen.io/rdfriedl/embed/${pen.id}/?theme-id=dark&default-tab=result&embed-version=2`}
					style={{
						width: '100%',
						border: 'none',
						height: '80vh'
					}}>
					See the Pen <a href={'https://codepen.io/rdfriedl/pen/'+pen.id}>{pen.id}</a> by rdfriedl (<a href='https://codepen.io/rdfriedl'>@rdfriedl</a>) on <a href='https://codepen.io'>CodePen</a>
				</iframe>

				<h2>Other Pens</h2>
				<div className="layout-row layout-wrap">
				{otherPens.pens.map(({pen}) => (
					<div className="flex-100 flex-sm-50 flex-md-33 flex-lg-25" key={pen.id}>
						<Pen pen={pen}/>
					</div>
				))}
				</div>

				<DisqusComments disqusId={`pen-${pen.id}`} disqusTitle={pen.title} category="pen"/>
			</div>
		)
	}
}

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