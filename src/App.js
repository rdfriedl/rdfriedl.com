import React from "react";
import styled from "styled-components";
import { Router, Route, Switch, Redirect, Link } from "react-static";
import { breakpoints } from "./utils";

import HomePage from "./views/Home";
import GamesPage from "./views/Games";
import PensPage from "./views/Pens";
import SearchPage from "./views/Search";
import ContactPage from "./views/Contact";

import Header from "./components/Header";
import Footer from "./components/Footer";

const AppStyles = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	// fix issue caused by minimized html
	img {
		display: block;
	}
`;

const Content = styled.div`
	flex-grow: 1;

	@media (${breakpoints.phone}) {
		margin: 0;
	}
	@media (${breakpoints.desktop}) {
		margin: 0 5vw;
	}
	@media (${breakpoints.large}) {
		margin: 0 10vw;
	}
`;

export default () => (
	<Router>
		<AppStyles>
			<Header />
			<Content>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/search" component={SearchPage} />
					<Route path="/games" component={GamesPage} />
					<Route path="/pens" component={PensPage} />
					<Route path="/contact" component={ContactPage} />
					<Redirect to="/" />
				</Switch>
			</Content>
			<Footer />
		</AppStyles>
	</Router>
);
