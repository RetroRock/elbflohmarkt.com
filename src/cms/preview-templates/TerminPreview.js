import React from 'react'
import PropTypes from 'prop-types'
import { TerminTemplate } from '../../templates/termin'
import { getFormattedDateString } from '../../utils'

const TerminPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  const entryGallery = entry.getIn(['data', 'gallery'])
  const gallery = entryGallery ? entryGallery.toJS() : []

  return (
    <TerminTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={tags && tags.toJS()}
      title={entry.getIn(['data', 'title'])}
      gallery={gallery}
      dateStart={getFormattedDateString(entry.getIn(['data', 'dateStart']))}
      dateEnd={getFormattedDateString(entry.getIn(['data', 'dateEnd']))}
      datePublished={getFormattedDateString(entry.getIn(['data', 'datePublished']))}
    />
  )
}

TerminPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default TerminPreview
