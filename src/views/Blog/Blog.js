import React from "react";
import Helmet from "react-helmet";
import { withRouteData } from "react-static";

import { createTitle } from "../../utils";
import BlogPostCard from "../../components/BlogPostCard";

const BlogPage = withRouteData(({ posts }) => (
	<React.Fragment>
		<Helmet>
			<title>{createTitle("Blog")}</title>
		</Helmet>

		{posts.map(post => <BlogPostCard key={post.slug} post={post} />)}
	</React.Fragment>
));

export default BlogPage;
