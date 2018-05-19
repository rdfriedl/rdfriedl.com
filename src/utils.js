import { css } from "styled-components";
import moment from "moment";

export function createTitle(...args) {
	return ["Robert Friedl", ...args].join(" - ");
}

export const breakpoints = {
	large: "min-width: 1600px",
	desktop: "min-width: 1008px",
	tablet: "min-width: 641px",
	phone: "max-width: 640px"
};

export function formatDate(date) {
	return moment(date).format("MMMM d, YYYY");
}

export function pickRandom(items, count, exclude = []) {
	let arr = items
		.filter(item => !exclude.includes(item))
		.sort(() => Math.floor(Math.random() * 3) - 1);

	arr.length = Number.isInteger(count) ? count : items.length;
	return arr;
}

// Iterate through the breakpoints and create a media template
export const media = Object.keys(breakpoints).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (${breakpoints[label]}) {
			${css(...args)};
		}
	`;

	return acc;
}, {});
