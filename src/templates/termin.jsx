import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'
import UpdateIcon from "../img/update.svg"
import DateIcon from "../img/date.svg"

// Use only for cms, remove export otherwise
// eslint-disable-next-line
export const TerminTemplate = ({
    content,
    contentComponent,
    description,
    datePublished,
    dateStart,
    dateEnd,
    gallery,
    title,
}) => {
    const PostContent = contentComponent || Content
    return (
        <section className="termin-container">
            <div className="termin-wrapper">
                <h2>{title}</h2>
                <div className="termin-meta-wrapper">
                    <span title="Termin" className="termin-meta">
                        <img src={DateIcon} alt="" />
                        {dateStart} - {dateEnd}
                    </span>
                    <div title="Zuletzt aktualisiert" className="termin-meta">
                        <img src={UpdateIcon} alt="" />
                        Zuletzt aktualisiert: {datePublished}
                    </div>
                </div>
                <article>
                    {description}
                </article>
                <div className="termin-content">
                    < PostContent style={{ width: '100%', overflow: 'hidden' }} content={content} />
                </div>
                <h2 id="galleryHeading">Galerie</h2>
                <SimpleReactLightbox>
                    <SRLWrapper>
                        <div className="gallery">
                            {gallery.map(item => {
                                return (
                                    <a key={item.image?.id ? item.image.id : item.text}
                                        href={item.image?.publicURL ? item.image.publicURL : item.image}>
                                        {item.image?.childImageSharp ?
                                            <GatsbyImage
                                                image={getImage(item.image.childImageSharp.gatsbyImageData)}
                                                alt={item.text} /> : <img src={item.image} style={{ width: "100%" }} alt="" />}
                                    </a>
                                )
                            })}
                        </div>
                    </SRLWrapper>
                </SimpleReactLightbox>
            </div>
        </section >
    )
}

TerminTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    gallery: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
            text: PropTypes.string,
        })
    ),
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    datePublished: PropTypes.string,
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
                                height: 600
                                width: 900
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
`
