import React, { Component } from "react";
import styled from "styled-components";
import * as queryString from "query-string";
import { withRouteData, Head } from "react-static";

import { GamesLayout, PensLayout } from "../components/Layouts";
import Game from "../components/GameCard";
import Pen from "../components/PenCard";
import { createTitle } from "../utils";

const SearchForm = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;

	h1 {
		margin-right: 2rem;
	}

	input {
		flex-grow: 1;
	}
`;

const SearchSectionTitle = styled.div`
	display: flex;
	align-items: center;

	hr {
		flex-grow: 1;
	}
`;

class SearchPage extends Component {
	constructor(...args) {
		super(...args);

		let { q: inputValue } = this.getQueryParams();

		this.state = {
			inputValue
		};

		this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	getQueryParams() {
		let { history: { location } } = this.props;
		return location ? queryString.parse(location.search) : {};
	}
	getSearchTerm() {
		let { q: query } = this.getQueryParams();

		return new RegExp(query, "igm");
	}
	handleSearchInputChange(event) {
		this.setState({
			inputValue: event.currentTarget.value
		});
	}
	handleFormSubmit(event) {
		event.preventDefault();
		event.stopPropagation();

		this.props.history.push({
			pathname: "/search",
			search:
				"?" +
				queryString.stringify({
					q: this.state.inputValue
				})
		});
	}
	searchGames() {
		let { games } = this.props;
		let search = this.getSearchTerm();

		return games.filter(
			game =>
				search.test(game.title) ||
				search.test(game.description) ||
				search.test(game.shortDescription)
		);
	}
	renderGames() {
		let games = this.searchGames();

		if (!games.length) return null;

		return [
			<SearchSectionTitle key="games-title">
				<h2 id="games">Games</h2>
				<hr />
			</SearchSectionTitle>,
			<GamesLayout key="games">
				{games.map(game => <Game key={game.id} game={game} />)}
			</GamesLayout>
		];
	}
	searchPens() {
		let { pens } = this.props;
		let search = this.getSearchTerm();

		return pens.filter(pen => search.test(pen.title));
	}
	renderPens() {
		let pens = this.searchPens();

		if (!pens.length) return null;

		return [
			<SearchSectionTitle key="pens-title">
				<h2 id="pens">Pens</h2>
				<hr />
			</SearchSectionTitle>,
			<PensLayout key="pens">
				{pens.map(pen => <Pen key={pen.id} pen={pen} />)}
			</PensLayout>
		];
	}
	renderResults() {
		let games = this.renderGames();
		let pens = this.renderPens();
		let elements = [];

		if (games) {
			elements.push(...games);
		}
		if (pens) {
			elements.push(...pens);
		}

		if (!elements.length) {
			elements.push(<h1 key="no-results">No Results</h1>);
		}

		return elements;
	}
	render() {
		let { inputValue } = this.state;

		return (
			<React.Fragment>
				<Head>
					<title>{createTitle("Search")}</title>
				</Head>

				<SearchForm action="/search" onSubmit={this.handleFormSubmit}>
					<h1>Search</h1>
					<input
						type="Search"
						placeholder="Search"
						name="q"
						value={inputValue || ""}
						onChange={this.handleSearchInputChange}
					/>
					<input type="hidden" name="tags" />
					<button className="button primary">Search</button>
				</SearchForm>
				{this.renderResults()}
			</React.Fragment>
		);
	}
}

export default withRouteData(SearchPage);
