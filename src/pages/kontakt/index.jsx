import React, { useState } from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

const encode = (data) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')

const Kontakt = () => {
  const [form, setForm] = useState({ isValidated: false })

  const handleChange = (e) => setForm({ [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    try {

      await fetch("/", {
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          'form-name': form.getAttribute("name"),
          ...form
        })
      })
      navigate(form.getAttribute("action"))
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Layout>
      <section className="contact">
        <div className="contact-form-wrapper">
          <h1>Kontakt</h1>
          <form
            name="contact-form"
            method="post"
            action="/kontakt/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <label>
                Don’t fill this out:{' '}
                <input name="bot-field" onChange={handleChange} />
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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

export default Kontakt;
