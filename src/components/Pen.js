import React from 'react';
import Link from 'gatsby-link';

const Pen = ({pen}) => (
	<div className="card fluid">
		<div className="section">
			<Link to={`/pen/${pen.id}`}>
				<img src={pen.thumbnail} style={{
					margin: 0,
					width: '100%'
				}}/>
			</Link>
			<h3>{pen.title}</h3>
		</div>
	</div>
);

export default Pen;