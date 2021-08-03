import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import { getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from 'gatsby-background-image'

// Use only for cms, remove export otherwise
// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  image2,
  heading,
  maplink,
  content,
  latestDate,
  contentComponent,
  description,
}) => {
  const PageContent = contentComponent || Content
  const img = getImage(image),
    bgImg = convertToBgImage(img),
    img2 = getImage(image2),
    bgImg2 = convertToBgImage(img2)



  return (
    <div >
      <section className='hero'>
        <BackgroundImage Tag="div"
          {...bgImg}
          preserveStackingContext>
          <div className="full-width-image flex-column flex-cc filter filter-color1">
            <h1>{heading}</h1>
            <h3>{description}</h3>
          </div>

        </BackgroundImage>
      </section>
      <section className='flea-market-latest'>
      </section>
      <section className="flea-market-map flex-column">
        <PageContent className="content" content={content} />
        <a href={maplink}>
          <span><strong>Elbflohmarkt</strong></span>
        </a>
        <div className="maps">
          <iframe title="Karte von Lenzen" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9582.702803459148!2d11.478644!3d53.098059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47aef608f4b44de7%3A0xebf1f8a12ceb2735!2sLenzen%20(Elbe)%2C%20Deutschland!5e0!3m2!1sde!2sus!4v1627736417337!5m2!1sde!2sus" allowFullScreen="" loading="lazy"></iframe>
        </div>
        {latestDate ?
          <Link to={latestDate.slug} className="flea-market-latest-date">
            <strong>Nächster Termin</strong>: {latestDate.date}
          </Link> : <span className="flea-market-latest-date">
            <strong>Nächster Termin</strong>: Es wurde noch kein neuer Termin vergeben.
          </span>}
      </section>
      <section className="flea-market-map-participants">
        <BackgroundImage Tag="div"
          {...bgImg2}
          preserveStackingContext>
          <div className="full-width-image flex-column flex-cc filter filter-color2">
            <h2>Teilnehmer</h2>
            <p>In der verlinkten Karte finden Sie alle Teilnehmer des Flohmarktes.</p>
            <a className="btn" href={maplink}>Karte</a>
          </div>
        </BackgroundImage>
      </section>
    </div >
  )
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  maplink: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
  latestDate: PropTypes.object,
  contentComponent: PropTypes.func,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { edges } = data.allMarkdownRemark

  console.log("Is this running in production?")

  let latestDate;
  const edgesCopy = [...edges]
  if (edgesCopy.length > 0) {
    const termin = edgesCopy.sort((a, b) => a.node.frontmatter.dateStart - b.node.frontmatter.dateStart).pop()
    latestDate = { date: new Date(termin.node.frontmatter.dateStart).toLocaleDateString(), slug: termin.node.fields.slug }
  }

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        image2={frontmatter.image2}
        title={frontmatter.title}
        heading={frontmatter.heading}
        maplink={frontmatter.maplink}
        description={frontmatter.description}
        latestDate={latestDate}
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdonwRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
query MyQuery {
  allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "termin"}}}) {
    edges {
      node {
        frontmatter {
          dateEnd
          dateStart
        }
        fields {
          slug
        }
      }
    }
  }
  markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
    id
    html
    frontmatter {
      title
      heading
      description
      maplink
      image {
        childImageSharp {
          gatsbyImageData(
            blurredOptions: {width: 100}
            placeholder: BLURRED
          )
        }
      }
      image2 {
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
`
