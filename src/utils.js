const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric" }
const countryCode = "de-DE"
export const getFormattedDateString = (dateObject) => dateObject.toLocaleDateString(countryCode, dateFormatOptions) + " Uhr"