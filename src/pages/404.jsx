import React from 'react'
import Layout from '../components/Layout'
import { Link } from '@reach/router'

const NotFoundPage = () => (
  <Layout>
    <section className="not-found">
      <h1>404 - NOT FOUND</h1>
      <h2>Verirrt?</h2>
      <p><Link to="/"> Hier geht es zurück zur Homepage</Link></p>
    </section>
  </Layout>
)

export default NotFoundPage
