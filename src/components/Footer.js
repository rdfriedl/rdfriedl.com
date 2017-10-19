import React  from "react";
import { getSiteProps } from "react-static";
import ExternalLink from "./ExternalLink";
import styled from 'styled-components';

const FooterLayout = styled.footer`
	display: flex;
	align-items: flex-end;
	padding-top: 1rem;
	padding-bottom: 1.5rem;
	
	& > * {
		margin: 0 0.25rem;
	}
`;

const MiniCssLogo = styled(ExternalLink)`
	font-family: 'Noto Sans', sans-serif;
	text-decoration: none;
	color: white;
	
	span:first-child{
		font-size: 1.45rem;
	}
	span:last-child{
		//color: #4527a0;
		font-size: 0.65rem;
	}
`;

console.log(require('../res/react-static-logo.png'));
const Footer = getSiteProps(({ siteUrl, sourceUrl }) => (
	<FooterLayout>
		<a href="https://www.contentful.com/" rel="nofollow" target="_blank">
			<img
				src="https://images.contentful.com/fo9twyrwpveg/7F5pMEOhJ6Y2WukCa2cYws/398e290725ef2d3b3f0f5a73ae8401d6/PoweredByContentful_DarkBackground.svg"
				style={{ maxWidth: 100, width: "100%" }}
				alt="Powered by Contentful"
			/>
		</a>
		<span>And Built with</span>
		<ExternalLink href="https://github.com/nozzle/react-static">
			<img
				src={require('../res/react-static-logo.png')}
				alt="React Static"
				style={{maxWidth: 100, width: "100%"}}
			/>
		</ExternalLink>
		<MiniCssLogo href="https://minicss.org/">
			<span>m</span>ini<span>.css</span>
		</MiniCssLogo>
	</FooterLayout>
));

export default Footer;
