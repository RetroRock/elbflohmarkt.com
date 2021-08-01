import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const TerminTemplate = ({
    //   content,
    //   contentComponent,
    description,
    //   tags,
    gallery,
    title,
    //   helmet,
}) => {
    // const PostContent = contentComponent || Content

    return (
        <section className="section">
            <h2>{title}</h2>
            <article>
                {description}
            </article>
            <ul>
                {gallery.map(item => {
                    console.log(item.image.id)
                    return (
                        <li key={item.image.id}>

                            <Link to={item.image.publicURL}>
                                <GatsbyImage image={getImage(item.image.childImageSharp.gatsbyImageData)} alt={item.image.name}></GatsbyImage>
                            </Link>
                        </li>
                    )
                })}

            </ul>
            {/* {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div> */}
        </section>
    )
}

TerminTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    gallery: PropTypes.array,
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    datePublished: PropTypes.string,
    helmet: PropTypes.object,
}

const Termin = ({ data }) => {
    const { markdownRemark: post } = data
    console.log(data)
    return (
        <Layout>
            <TerminTemplate
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
                dateStart={post.frontmatter.dateStart}
                dateEnd={post.frontmatter.dateStart}
                datePublished={post.frontmatter.datePublished}
                gallery={post.frontmatter.gallery}
                helmet={
                    <Helmet titleTemplate="%s | Termin">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.description}`}
                        />
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
            />
        </Layout>
    )
}

Termin.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
}

export default Termin

export const pageQuery = graphql`
        query TerminQuery($id: String!) {
            markdownRemark(id: {eq: $id}) {
            id
            html
            frontmatter {
                title
                description
                dateEnd(formatString: "DD.MMMM.YYYY HH:MM")
                dateStart(formatString: "DD.MMMM.YYYY HH:MM")
                datePublished(formatString: "DD.MMMM.YYYY HH:MM")
                tags
                gallery {
                    text
                    image {
                        id
                        name
                        publicURL
                        childImageSharp {
                            gatsbyImageData(
                                blurredOptions: {width: 100}
                                placeholder: BLURRED
                            )
                        }
                    }
                }
            }
        }
    }
`
