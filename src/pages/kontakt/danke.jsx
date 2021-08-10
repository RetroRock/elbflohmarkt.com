import React from 'react'
import Layout from '../../components/Layout'
import { Link } from "gatsby"

const ThanksPage = () => (
  <Layout>
    <section className="thanks">
      <h1>Vielen Dank!</h1>
      <p>Wir werden uns so schnell wie möglich um Ihr Anliegen kümmern.</p>
      <Link to={"/"}>Zurück zur Homepage</Link>
    </section>
  </Layout>
)

export default ThanksPage
