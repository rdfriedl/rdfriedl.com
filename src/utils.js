import { css } from "styled-components";

export function createTitle(...args) {
	return ["Robert Friedl", ...args].join(" - ");
}

export const breakpoints = {
	large: "min-width: 1600px",
	desktop: "min-width: 1008px",
	tablet: "min-width: 641px",
	phone: "max-width: 640px"
};

// Iterate through the breakpoints and create a media template
export const media = Object.keys(breakpoints).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (${breakpoints[label]}) {
			${css(...args)};
		}
	`;

	return acc;
}, {});
