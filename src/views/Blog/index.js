import React from "react";
import { withRouteData, Switch, Route } from "react-static";

import PostPage from "./Post";
import BlogPage from "./Blog";

export default withRouteData(({ match, posts }) => (
	<Switch>
		<Route exact path={match.url} component={BlogPage} />
		<Route path={`${match.url}/:postSlug`} component={PostPage} />
	</Switch>
));
