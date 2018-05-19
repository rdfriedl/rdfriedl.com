import React, { Fragment } from "react";
import unified from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";

const compiler = unified()
	.use(rehypeParse, { fragment: true })
	.use(rehypeReact, {
		createElement: React.createElement,
		components: {
			a: "a",
			img: ({ ...props }) => <img className="img-fluid" {...props} />,
			blockquote: ({ ...props }) => (
				<blockquote className="blockquote" {...props} />
			),
			table: ({ ...props }) => (
				<table
					className="table table-striped table-bordered table-hover table-sm"
					{...props}
				/>
			)
		}
	});

const EmbedHtml = ({ children }) => (
	<Fragment>{compiler.processSync(children).contents}</Fragment>
);

export default EmbedHtml;
