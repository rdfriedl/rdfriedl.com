import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';

import * as types from '../types';

// import sass
import '../scss/main.scss';

const tmpMetaData = {
	title: `Robert Friedl`,
	description: '',
	sourceUrl: 'https://github.com/rdfriedl/rdfriedl.github.com',
	keywords: [
		'site'
	]
};

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func
  };

	static childContextTypes = {
		location: types.location,
		siteMetadata: PropTypes.object
	};

	getChildContext(){
		return {
			location: this.props.location,
			siteMetadata: tmpMetaData
		};
	}

	render() {
  	// tmp hack till i can figure out how to query graphql from a template
  	const { title, description, keywords } = tmpMetaData;

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

// export const pageQuery = graphql`
// query metaData {
// 	site {
//     siteMetadata {
//       title
//     }
//   }
// }`;
