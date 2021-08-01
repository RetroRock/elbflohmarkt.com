import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const IndexPageTemplate = ({
  image,
  image2,
  heading,
  maplink,
  content,
  contentComponent,
  description,
}) => {
  const PageContent = contentComponent || Content
  return (
    <div >
      <section className='hero'>
        <div className="full-width-image" style={{
          backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
          backgroundAttachment: `fixed`,
        }}>
          <div className="flex-column flex-cc filter filter-color1">
            <h1>{heading}</h1>
            <h3>{description}</h3>
          </div>
        </div>
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
        <span className="flea-market-latest-date">
          <strong>Nächster Termin</strong>: dd:mm:YYYY h1h1:m1m1-h2h2:m2m2 Uhr
        </span>
      </section>
      <section className="flea-market-map-participants">
        <div className="full-width-image" style={{
          backgroundImage: `url(${!!image2.childImageSharp ? image2.childImageSharp.fluid.src : image2
            })`,
        }}>
          <div className="flex-column flex-cc filter filter-color2">
            <h2>Teilnehmer</h2>
            <p>In der verlinkten Karte finden Sie alle Teilnehmer des Flohmarktes.</p>
            <a className="btn" href={maplink}>Karte</a>
          </div>
        </div>
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
  // subheading: PropTypes.string,
  // mainpitch: PropTypes.object,
  description: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  // intro: PropTypes.shape({
  //   blurbs: PropTypes.array,
  // }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  console.log(data)
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        image2={frontmatter.image2}
        title={frontmatter.title}
        heading={frontmatter.heading}
        maplink={frontmatter.maplink}
        description={frontmatter.description}
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
query MyQuery {
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
          fluid(maxWidth: 2000, quality: 64) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      image2 {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 64) {
            ...GatsbyImageSharpFluid
          }
        }
      }
     
    }
  }
}

`
