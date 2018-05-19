import React from "react";
import styled from "styled-components";
import { Link } from "react-static";
import Card from "./Card";
import Thumbnail from "./Thumbnail";

const StyledCard = styled(Card)`
	margin: 0;
`;

const PenCard = ({ pen, ...props }) => (
	<StyledCard {...props}>
		<Link className="thumbnail" to={`/pens/${pen.id}`}>
			<Thumbnail
				aspectRatio={1.5}
				width={400}
				src={pen.thumbnail.file.url}
				alt={pen.title}
			/>
		</Link>
		<h3>{pen.title}</h3>
	</StyledCard>
);

export default PenCard;
