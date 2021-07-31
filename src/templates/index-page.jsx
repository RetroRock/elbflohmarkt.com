import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  image,
  image2,
  title,
  heading,
  maplink,
  html,
  description,
}) => {

  console.log(html)
  return (
    <div >
      <section className='hero'>
        <div className="full-width-image" style={{
          backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
          backgroundAttachment: `fixed`,
        }}>
          <h1>{heading}</h1>
          <h3>{description}</h3>
          <div className="filter filter-color1" />
        </div>
      </section>
      <section className='flea-market-latest'>
      </section>
      <section className="flea-market-map flex-column">
        {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
        <a href={maplink}>
          <span><strong>Elbflohmarkt</strong></span>
        </a>
        <div className="maps">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9582.702803459148!2d11.478644!3d53.098059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47aef608f4b44de7%3A0xebf1f8a12ceb2735!2sLenzen%20(Elbe)%2C%20Deutschland!5e0!3m2!1sde!2sus!4v1627736417337!5m2!1sde!2sus" allowFullScreen="" loading="lazy"></iframe>
        </div>
        <span className="flea-market-latest-date">
          <strong>Nächster Termin</strong>: dd:mm:YYYY h1h1:m1m1-h2h2:m2m2 Uhr
        </span>
      </section>
      <section className="flea-market-map-participants">
        <div className="full-width-image" style={{
          backgroundImage: `url(${!!image2.childImageSharp ? image2.childImageSharp.fluid.src : image2
            })`,
          // backgroundAttachment: `fixed`,
        }}>

          <h2>Teilnehmer</h2>
          <p>In der verlinkten Karte finden Sie alle Teilnehmer des Flohmarktes.</p>
          <a className="btn" href={maplink}>Karte</a>
          <div className="filter filter-color2" />
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
  html: PropTypes.string
  // intro: PropTypes.shape({
  //   blurbs: PropTypes.array,
  // }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  console.log(data.markdownRemark.html)
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        image2={frontmatter.image2}
        title={frontmatter.title}
        heading={frontmatter.heading}
        maplink={frontmatter.maplink}
        // subheading={frontmatter.subheading}
        // mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        html={data.markdownRemark.html}
      // intro={frontmatter.intro}
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
  markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}, html: {}) {
    id
    frontmatter {
      title
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
      heading
      description
      maplink
    }
    html
  }
}

`
