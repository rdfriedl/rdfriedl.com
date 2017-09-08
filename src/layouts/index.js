import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import config from '../siteConfig';

import * as types from '../types';

// import sass
import '../scss/main.scss';

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func
  };

	static childContextTypes = {
		location: types.location
	};

	getChildContext(){
		return {
			location: this.props.location
		};
	}

	render() {
  	const { title, description, keywords } = config;

    return (
      <div id="page" className="layout-column">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords.join(', ') },
					]}>
					<link rel="stylesheet" href="https://unpkg.com/font-awesome/css/font-awesome.min.css"/>
				</Helmet>
        <Header/>
				<div className="flex layout-row align-center">
					<div className="flex-100 flex-lg-80 layout-row">
						{this.props.children()}
					</div>
				</div>
        <Footer/>
      </div>
    )
  }
}