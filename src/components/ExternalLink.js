import React from "react";

const ExternalLink = ({ href, rel, target, to, children, ...props }) =>
	<a
		rel={rel || "noopener"}
		target={target || "_blank"}
		href={href || to || "#"}
		{...props}
	>
		{children}
	</a>;

export default ExternalLink;
