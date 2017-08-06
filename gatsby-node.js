const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators;
	let queries = [];

	//
	queries.push(graphql(`
		{
			allPensJson {
				edges {
					node {
						id
					}
				}
			}
		}
	`).then(result => {
		if (result.errors)
			return reject(result.errors);

		const pageTemplate = path.resolve(`./src/templates/pen.js`);
		result.data.allPensJson.edges.map(d => d.node).forEach(pen => {
			createPage({
				path: `/pens/${pen.id}/`,
				component: slash(pageTemplate),
				context: {
					id: pen.id
				},
			})
		});

		return true;
	}));

	// render game pages
	queries.push(graphql(`
		{
			allGamesJson {
				edges {
					node {
						id
						demoURL
					}
				}
			}
		}
	`).then(result => {
		if(result.errors)
			return reject(result.errors);

		const gameTemplate = path.resolve('./src/templates/game.js');
		result.data.allGamesJson.edges.map(d => d.node).forEach(game => {
			createPage({
				path: `/games/${game.id}/`,
				component: slash(gameTemplate),
				context: {
					id: game.id
				},
			});
		})
	}));

	return Promise.all(queries);
};
