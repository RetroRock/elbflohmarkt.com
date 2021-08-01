import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const TerminTemplate = ({
    //   content,
    //   contentComponent,
    description,
    //   tags,
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
    helmet: PropTypes.object,
}

const Termin = ({ data }) => {
    const { markdownRemark: post } = data

    return (
        <Layout>
            <TerminTemplate
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
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
            }
        }
    }
`
