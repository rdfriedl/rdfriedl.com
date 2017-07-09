import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../css/scroll.css';
import '../../node_modules/mini.css/dist/mini-dark.min.css';

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
      <div>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords.join(', ') },
          ]}
        />
        <Header/>
				<div className="container">
					<div className="row">
						<div className="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
							{this.props.children()}
						</div>
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
