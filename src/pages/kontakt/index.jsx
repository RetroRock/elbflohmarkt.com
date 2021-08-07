import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="contact">
          <div className="contact-form-wrapper">
            <h1>Kontakt</h1>

            <form
              name="contact-form"
              method="post"
              action="/contact/thanks/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              data-netlify-recaptcha="true"
              onSubmit={this.handleSubmit}
            >
              {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
              <input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <label>
                  Don’t fill this out:{' '}
                  <input name="bot-field" onChange={this.handleChange} />
                </label>
              </div>
              <div className="field">
                <label className="label" htmlFor={'name'}>
                  Name
                </label>
                <div className="control">
                  <input
                    className="input"
                    type={'text'}
                    name={'name'}
                    onChange={this.handleChange}
                    placeholder="Max Mustermann"
                    id={'name'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor={'email'}>
                  Email
                </label>
                <div className="control">
                  <input
                    className="input"
                    type={'email'}
                    name={'email'}
                    onChange={this.handleChange}
                    placeholder="max-mustermann@e-mail.de"
                    id={'email'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor={'name'}>
                  Telefon
                </label>
                <div className="control">
                  <input
                    className="input"
                    type={'tel'}
                    pattern="[0-9]{12}"
                    placeholder="012345678910"
                    name={'telephone'}
                    onChange={this.handleChange}
                    id={'telephone'}
                    required={true}
                  />
                </div>
              </div>
              <div className="field-contact-message">
                <label className="label" htmlFor={'message'}>
                  Nachricht
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name={'message'}
                    onChange={this.handleChange}
                    id={'message'}
                    placeholder="Nachricht hier eingeben …"
                    required={true}
                  />
                </div>
              </div>
              <div data-netlify-recaptcha="true"></div>
              <div className="field">
                <button className="btn" type="submit">
                  Absenden
                </button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    )
  }
}
