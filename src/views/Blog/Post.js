import React from "react";
import { withRouteData, Head } from "react-static";
import styled from "styled-components";
import moment from "moment";

import { createTitle, formatDate } from "../../utils";
import EmbedHtml from "../../components/EmbedHtml";

const Layout = styled.section`
	display: grid;

	font-size: 1.3em;
`;

const PostPage = withRouteData(({ post }) => (
	<Layout>
		<Head>
			<title>{createTitle(post.title)}</title>
		</Head>

		<article>
			<aside className="text__meta">
				<time dateTime={moment(post.sys.createdAt).toISOString()}>
					{formatDate(post.sys.createdAt)}
				</time>
			</aside>
			<h1>{post.title}</h1>
			{post.coverImage && (
				<figure>
					<img src={post.coverImage.file.url} />
				</figure>
			)}
			<EmbedHtml>{post.content}</EmbedHtml>
		</article>
	</Layout>
));

export default PostPage;
