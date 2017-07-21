import React from "react";
import Link from "gatsby-link";
import classNames from "classnames";

const Pen = ({ pen, className, ...props }) =>
	<div
		className={classNames("pen card fluid hover-shadow", className)}
		{...props}
	>
		<div className="section">
			<Link to={`/pens/${pen.id}`}>
				<img
					src={pen.thumbnail}
					alt={pen.title}
					style={{
						margin: 0,
						width: "100%"
					}}
				/>
			</Link>
			<h3>
				{pen.title}
			</h3>
		</div>
	</div>;

export default Pen;
