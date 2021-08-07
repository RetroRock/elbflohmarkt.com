import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const TermineTemplate = ({ data }) => {
  const { edges: termine } = data.allMarkdownRemark
  console.log(termine[0])
  return (
    <section className="termine">
      <div className="termin-list-wrapper">
        {termine.map(({ node: termin }) => (
          <div className="termin-list-item-wrapper" key={termin.id}>
            <GatsbyImage
              image={getImage(termin.frontmatter.gallery[0].image.childImageSharp.gatsbyImageData)}
              alt={""} />
            <div>
              <h3>{termin.frontmatter.title}</h3>
              <p>{termin.frontmatter.description}</p>
              <p>
                Start: <strong>{termin.frontmatter.dateStart}</strong><br />
                Ende: <strong>{termin.frontmatter.dateEnd}</strong><br />
              </p>
              <Link to={termin.fields.slug}>Mehr Informationen</Link>

            </div>
          </div>
        ))}
      </div>
    </section>
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
              title
              templateKey
              description
              dateEnd(formatString: "DD.MMMM.YYYY HH:MM")
              dateStart(formatString: "DD.MMMM.YYYY HH:MM")
              gallery {
                text
                image {
                    id
                    name
                    publicURL
                    childImageSharp {
                        gatsbyImageData(
                            height: 300
                            width: 450
                            transformOptions: {fit: COVER}
                            blurredOptions: {width: 100}
                            placeholder: BLURRED
                            webpOptions: {quality: 50}
                        )
                    }
                }
              }
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