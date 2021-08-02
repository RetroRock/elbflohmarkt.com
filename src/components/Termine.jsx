import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

const TermineTemplate = ({ data }) => {
  const { edges: termine } = data.allMarkdownRemark
  return (
    <div>
      {termine.map(({ node: termin }) => (
        <div key={termin.id}><Link to={termin.fields.slug}>Flohmarkt von {termin.frontmatter.dateStart} bis {termin.frontmatter.dateEnd}</Link><br /></div>
      ))}
    </div>
  )
}

TermineTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

const Termine = () => (
  <StaticQuery
    query={graphql`
    query TermineQuery {
      allMarkdownRemark(sort: {order: DESC, fields: frontmatter___title}, 
        filter: {frontmatter: {templateKey: {eq: "termin"}}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            html
            frontmatter {
              templateKey
              description
              dateEnd(formatString: "DD.MMMM.YYYY HH:MM")
              dateStart(formatString: "DD.MMMM.YYYY HH:MM")
            }
          }
        }
      }
    }
    `}
    render={(data, count) => <TermineTemplate data={data} count={count} />}
  />
)

export default Termine;