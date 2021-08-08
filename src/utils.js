const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric" }
const countryCode = "de-DE"
export const googleRecaptchaKey = "6Le47ukbAAAAAKLgPsNDfS2xPywh8uSKWY2IO8_7"
export const getFormattedDateString = (dateObject) => dateObject.toLocaleDateString(countryCode, dateFormatOptions) + " Uhr"