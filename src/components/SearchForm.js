import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import qs from "qs";

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0;
	margin: 0;
	background: none;
	border: none;
`;

class SearchForm extends Component {
	constructor(...args) {
		super(...args);

		let { q: inputValue } = this.getQueryParams();

		this.state = {
			inputValue
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search !== this.props.location.search) {
			let { q: inputValue } = this.getQueryParams(nextProps);

			this.setState({
				inputValue
			});
		}
	}
	getQueryParams(props = this.props) {
		let { location } = props;
		return location ? qs.parse(location.search.replace(/^\?/g, "")) : {};
	}
	handleInputChange(event) {
		this.setState({
			inputValue: event.currentTarget.value
		});
	}
	handleFormSubmit(event) {
		event.preventDefault();
		event.stopPropagation();

		this.props.history.push({
			pathname: "/search",
			search: `?q=${this.state.inputValue}`
		});
	}
	render() {
		let { inputValue } = this.state;

		return (
			<Form action="/search" onSubmit={this.handleFormSubmit}>
				<input
					type="search"
					name="q"
					placeholder="Search"
					value={inputValue || ""}
					onChange={this.handleInputChange}
				/>
				<button className="button primary" type="submit">
					Search
				</button>
			</Form>
		);
	}
}

export default withRouter(SearchForm);
