import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Link from "gatsby-link";
import NavLink from './NavLink';
import config from '../siteConfig';

export default class MobileNavDraw extends PureComponent{
	constructor(props){
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

	closeDraw(){
		this.setState({
			open: false
		})
	}

	stateChanged(e){
		this.setState({
			open: e.target.checked
		})
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			open: !!nextProps.open
		});
	}

	render(){
		let {...props } = this.props;
		let { open } = this.state;

		return (
			<div {...props}>
				<input type="checkbox" id="drawer-checkbox" checked={open} onChange={this.stateChanged}/>
				<div className="drawer">
					<label htmlFor="drawer-checkbox" className="close"/>

					<div className="layout-column align-center-center">
						<img className="circular m-4 w-50" src={config.avatar} alt="avatar" title={config.name}/>
						<h2>{config.name}</h2>
					</div>

					<div className="layout-column">
						<NavLink to="/" matchSubPaths={false} onClick={this.closeDraw}>
							<i className="fa fa-home"/> Home
						</NavLink>
						<NavLink to="/games/" onClick={this.closeDraw}>
							<i className="fa fa-gamepad"/> Games
						</NavLink>
						<NavLink to="/pens/" onClick={this.closeDraw}>
							<i className="fa fa-codepen"/> Pens
						</NavLink>
					</div>
				</div>
			</div>
		);
	}
}
