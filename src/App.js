import React from "react";
import styled from "styled-components";
import { Router, Route, Switch, Redirect, Link } from "react-static";
import { breakpoints } from "./utils";

import Home from "./views/Home";
import Games from "./views/Games";
import Pens from "./views/Pens";
import Search from "./views/Search";

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
					<Route exact path="/" component={Home} />
					<Route path="/search" component={Search} />
					<Route path="/games" component={Games} />
					<Route path="/pens" component={Pens} />
					<Redirect to="/" />
				</Switch>
			</Content>
			<Footer />
		</AppStyles>
	</Router>
);
