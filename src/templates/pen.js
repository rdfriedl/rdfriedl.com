import React from "react"
import Helmet from 'react-helmet';

class PenTemplate extends React.Component {
	render() {
		const { pen } = this.props.data;

		return (
			<div>
				<Helmet title={`Robert Friedl - ${pen.title}`}/>
				<div dangerouslySetInnerHTML={{ __html: JSON.stringify(pen) }} />
			</div>
		)
	}
}

export default PenTemplate

export const pageQuery = graphql`
query Pen($id: String) {
  pen: pensJson(id: {eq: $id}) {
    id
    title
    tags {
      message
      type
    }
    used
    thumbnail
  }
}
`;