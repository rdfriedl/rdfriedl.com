import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, withSiteData } from "react-static";
import NavLink from "./NavLink";
import { breakpoints } from "../utils";

const ColumnLayout = styled.div`
	display: flex;
	flex-direction: column;
`;

const AvatarContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 1rem;

	img {
		width: 10rem;
	}
`;

const Overlay = styled.label`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	opacity: 0;
	pointer-events: none;

	transition: opacity 0.25s ease;
`;

const Styles = styled.div`
	display: none;

	@media (${breakpoints.phone}) {
		display: block;
	}

	#drawer-checkbox:checked ~ label.overlay {
		opacity: 1;
		pointer-events: all;
	}
`;

export default withSiteData(
	class MobileNavDraw extends PureComponent {
		constructor(props) {
			super(props);

			this.closeDraw = this.closeDraw.bind(this);
			this.stateChanged = this.stateChanged.bind(this);
		}

		state = {
			open: false
		};

		static propTypes = {
			open: PropTypes.bool
		};

		static defaultProps = {
			open: false
		};

		closeDraw() {
			this.setState({
				open: false
			});
		}

		stateChanged(e) {
			this.setState({
				open: e.target.checked
			});
		}

		componentWillReceiveProps(nextProps) {
			this.setState({
				open: !!nextProps.open
			});
		}

		render() {
			let { name, avatar } = this.props;
			let { open } = this.state;

			return (
				<Styles>
					<input
						type="checkbox"
						id="drawer-checkbox"
						checked={open}
						onChange={this.stateChanged}
					/>
					<div className="drawer">
						<label htmlFor="drawer-checkbox" className="close" />

						<AvatarContainer>
							<img
								className="circular"
								src={avatar}
								alt="avatar"
								title={name}
							/>
						</AvatarContainer>
						<h2>{name}</h2>

						<ColumnLayout>
							<NavLink to="/" matchSubPaths={false} onClick={this.closeDraw} aria-label="home">
								<i className="fa fa-home" /> Home
							</NavLink>
							<NavLink to="/games/" onClick={this.closeDraw} aria-label="games">
								<i className="fa fa-gamepad" /> Games
							</NavLink>
							<NavLink to="/pens/" onClick={this.closeDraw} aria-label="pens">
								<i className="fa fa-codepen" /> Pens
							</NavLink>
							<NavLink to="/contact/" aria-label="contact">
								<i className="fa fa-envelope-o" /> Contact
							</NavLink>
						</ColumnLayout>
					</div>

					<Overlay className="overlay" htmlFor="drawer-checkbox" />
				</Styles>
			);
		}
	}
);
