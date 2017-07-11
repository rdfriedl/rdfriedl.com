import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';

// import sass
import '../scss/main.scss';

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func
  };

  render() {
  	// tmp hack till i can figure out how to query graphql from a template
  	const { title, description, keywords } = {
			title: `Robert Friedl`,
			description: '',
			keywords: [
				'site'
			]
		};

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
					<div className="flex-100 flex-lg-80">
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
