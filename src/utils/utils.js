export function createTitle(title){
	return ['Robert Friedl', title].join(' - ');
}
export function transformAllJsonData(allJson){
	return allJson.edges.map(d => d.node);
}