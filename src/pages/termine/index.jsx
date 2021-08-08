import React from 'react'

import Layout from '../../components/Layout'
import Termine from '../../components/Termine'

export default class TermineIndexPage extends React.Component {
    render() {
        return (
            <Layout>
                <div>
                    <h1>
                        Alle Termine
                    </h1>
                </div>
                <section >
                    <div className="content">
                        <Termine />
                    </div>
                </section>
            </Layout>
        )
    }
}
