import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
				<Link to="/games/">Go to games</Link><br/>
				<Link to="/pens/">Go to pens</Link><br/>
				{process.env.NODE_ENV === 'development' && <a href="/___graphql" target="_blank">debugger</a>}
      </div>
    )
  }
}
