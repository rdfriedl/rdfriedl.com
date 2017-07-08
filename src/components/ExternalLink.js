import React from 'react';

const ExternalLink = (props) => (
	<a rel={props.rel || "noopener"} target={props.target || "_blank"} {...props}>{props.children}</a>
);

export default ExternalLink;