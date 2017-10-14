import React from "react";
import styled from "styled-components";
import { Router, Route, Switch, Redirect, Link } from "react-static";
import { breakpoints } from "./utils";

import Home from "./views/Home";
import Games from "./views/Games";
import Pens from "./views/Pens";

import Header from "./components/Header";
import Footer from "./components/Footer";

const Content = styled.div`
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
		<div>
			<Header />
			<Content>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/games" component={Games} />
					<Route path="/pens" component={Pens} />
					<Redirect to="/" />
				</Switch>
			</Content>
			<Footer />
		</div>
	</Router>
);
