const camelToKebab = (styleObject) =>
    Object.entries(styleObject)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
        .join(' ')

export default camelToKebab
