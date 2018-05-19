import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { Link } from "react-static";

import { formatDate } from "../utils";
import EmbedHtml from "./EmbedHtml";
import Card from "./Card";

const PostHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem;

	* {
		margin: 0;
	}
`;

const HiddenLink = styled(Link)`
	text-decoration: none;
	color: inherit !important;
`;

const Layout = styled.div``;
const Post = styled(Card)``;

const BlogPostCard = ({ post }) => (
	<Layout>
		<HiddenLink to={`/blog/${post.slug}`}>
			<Post>
				<PostHeader>
					<h1>{post.title}</h1>
					<time dateTime={moment(post.publishedDate).toISOString()}>
						{formatDate(post.publishedDate)}
					</time>
				</PostHeader>
				<EmbedHtml>{post.content}</EmbedHtml>
			</Post>
		</HiddenLink>
	</Layout>
);

BlogPostCard.propTypes = {
	post: PropTypes.shape({
		slug: PropTypes.string,
		title: PropTypes.string
	}).isRequired
};
BlogPostCard.defaultProps = {};

export default BlogPostCard;
