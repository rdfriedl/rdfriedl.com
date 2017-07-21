export function createTitle(...args) {
	return ["Robert Friedl", ...args].join(" - ");
}
export function transformAllJsonData(allJson) {
	return allJson.edges.map(d => d.node);
}
