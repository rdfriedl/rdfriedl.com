import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func,
  };

  render() {
    return (
      <div>
        <Helmet
          title='Robert Friedl'
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
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
