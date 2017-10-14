import React from "react";
import styled from "styled-components";
import { Link } from "react-static";
import Card from "./Card";

const StyledCard = styled(Card)`
	margin: 0;
`;

const Pen = ({ pen, ...props }) => (
	<StyledCard {...props}>
		<Link className="thumbnail" to={`/pens/${pen.id}`}>
			<img
				src={pen.thumbnail}
				alt={pen.title}
				style={{
					margin: 0,
					width: "100%"
				}}
			/>
		</Link>
		<h3>{pen.title}</h3>
	</StyledCard>
);

export default Pen;
