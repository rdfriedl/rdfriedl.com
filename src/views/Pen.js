import React from "react";
import { getRouteProps, Head } from "react-static";
import styled from "styled-components";

import { createTitle, breakpoints } from "../utils";
import Pen from "../components/Pen";
import DisqusComments from "../components/DisqusComments";
import { PensLayout } from "../components/Layouts";

const EmbeddedPen = styled.iframe`
	width: 100%;
	height: 80vh;
	border: none;
`;

const PenPage = getRouteProps(({ pen, otherPens }) => (
	<div>
		<Head>
			<title>{createTitle(pen.title)}</title>
		</Head>

		<h1>{pen.title}</h1>
		<EmbeddedPen
			scrolling="no"
			title={pen.id}
			src={`//codepen.io/rdfriedl/embed/${pen.id}/?theme-id=dark&default-tab=result&embed-version=2`}
		>
			See the Pen{" "}
			<a href={"https://codepen.io/rdfriedl/pen/" + pen.id}>{pen.id}</a> by
			rdfriedl (<a href="https://codepen.io/rdfriedl">@rdfriedl</a>) on{" "}
			<a href="https://codepen.io">CodePen</a>
		</EmbeddedPen>

		<h2>Other Pens</h2>
		<PensLayout>
			{otherPens.map(pen => pen && <Pen key={pen.id} pen={pen} />)}
		</PensLayout>

		<DisqusComments
			disqusId={`pen-${pen.id}`}
			disqusTitle={pen.title}
			category="pen"
		/>
	</div>
));

export default PenPage;
