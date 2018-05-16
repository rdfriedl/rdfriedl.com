import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import qs from "qs";
import { defaultThumbnailSize } from "../config.js";

const StyledImage = styled.img`
	width: 100%;
	height: auto;
`;

function getImageParams({
	aspectRatio,
	format,
	fit,
	width,
	height,
	progressiveJpeg,
	focus,
	rounded
}) {
	if (aspectRatio) {
		if (!height && width) {
			height = width / aspectRatio;
		}
		if (!width && height) {
			width = height * aspectRatio;
		}
		if (!width && !height && Number.isFinite(aspectRatio)) {
			width = defaultThumbnailSize;
			height = width / aspectRatio;
		}
		if (aspectRatio === true) {
			width = defaultThumbnailSize;
		}

		if (!fit) {
			fit = "thumb";
		}
	}

	if (!format) {
		format = "png";
	}

	if (rounded === true && (width || height)) {
		rounded = width || height;
	}

	return qs.stringify({
		fm: format,
		fit: fit,
		w: width && Math.round(width),
		h: height && Math.round(height),
		fl: progressiveJpeg ? "progressive" : undefined,
		f: focus,
		r: rounded
	});
}

export function getImageSrc(src, props) {
	return src + "?" + getImageParams(props);
}

const Thumbnail = ({ src, alt, className, ...props }) => (
	<StyledImage className={className} src={getImageSrc(src, props)} alt={alt} />
);

Thumbnail.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	aspectRatio: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	fit: PropTypes.oneOf(["fit", "fill", "pad", "thumb", "scale"]),
	format: PropTypes.oneOf(["png", "jpg", "webp"]),
	progressiveJpeg: PropTypes.bool,
	width: PropTypes.any,
	height: PropTypes.any,
	focus: PropTypes.oneOf(["top", "right", "left", "bottom", "face", "faces"]),
	rounded: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
};

export default Thumbnail;
