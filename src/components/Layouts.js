import styled from "styled-components";
import { breakpoints } from "../utils";

const GamesLayout = styled.div`
	display: grid;
	grid-gap: 1rem;
	padding: 0.5rem;

	@media (${breakpoints.phone}) {
		grid-template-columns: 1fr;
	}
	@media (${breakpoints.tablet}) {
		grid-template-columns: 1fr 1fr;
	}
	@media (${breakpoints.desktop}) {
		grid-template-columns: 1fr;
	}
	@media (${breakpoints.large}) {
		grid-template-columns: 1fr 1fr;
	}
`;

const PensLayout = styled.div`
	padding: 0.5rem;
	display: grid;
	grid-gap: 1rem;

	@media (${breakpoints.phone}) {
		grid-template-columns: 1fr;
	}
	@media (${breakpoints.tablet}) {
		grid-template-columns: 1fr 1fr;
	}
	@media (${breakpoints.desktop}) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media (${breakpoints.large}) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
`;

export { GamesLayout, PensLayout };
