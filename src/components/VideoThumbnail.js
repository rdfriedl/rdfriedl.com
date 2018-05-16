import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Styles = styled.div`
	position: relative;

	video {
		width: 100%;
	}

	.overlay-icon {
		display: block;
		position: absolute;
		color: black;
		opacity: 0.6;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.8in !important;
		transition: opacity 0.5s ease;
	}
	*:hover > .overlay-icon-hide {
		opacity: 0;
		transform: translate(-50%, -50%) scale(1.5);
		transition: opacity 0.5s ease, transform 0.7s ease;
	}
`;

export default class VideoThumbnail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playing: false
		};

		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}
	onMouseEnter() {
		this.refs.video.play();
	}
	onMouseLeave() {
		this.refs.video.pause();
	}
	render() {
		let { src, ...props } = this.props;

		return (
			<Styles
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				{...props}
			>
				<i className="fa fa-play-circle overlay-icon overlay-icon-hide" />
				<video
					className="play-on-hover img-responsive"
					preload="auto"
					src={src}
					ref="video"
				/>
			</Styles>
		);
	}
}

VideoThumbnail.propTypes = {
	src: PropTypes.string.isRequired
};
