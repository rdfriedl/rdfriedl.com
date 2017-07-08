import React from "react"
import Link from "gatsby-link"

export default class Index extends React.Component {
  render() {
    return (
      <div>
				<Link to="/games/">Go to games</Link><br/>
				<Link to="/pens/">Go to pens</Link><br/>
      </div>
    )
  }
}
