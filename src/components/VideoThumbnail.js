import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class VideoThumbnail extends Component {
	constructor(props){
		super(props);

		this.state = {
			playing: false
		};

		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}
	onMouseEnter(){
		this.refs.video.play();
	}
	onMouseLeave(){
		this.refs.video.pause();
	}
	render(){
		let {src, className, ...props} = this.props;

		return (
			<div
				className={classNames("video-thumbnail", className)}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				{...props}>
				<i className="fa fa-play-circle overlay-icon overlay-icon-hide"/>
				<video className="play-on-hover img-responsive" preload="auto" src={src} ref="video"/>
			</div>
		);
	}
}

VideoThumbnail.propTypes = {
	src: PropTypes.string.isRequired
};
