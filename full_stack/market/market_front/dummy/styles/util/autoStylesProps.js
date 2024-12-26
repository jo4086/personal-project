const autoStylesProps = (props) => {
   const baseStyles = Object.entries(props)
      .filter(([key]) => !key.startsWith('$hover') && !key.startsWith('$visited') && !key.startsWith('$active'))
      .map(([key, value]) => {
         if (key.startsWith('$')) {
            const cssKey = key
               .slice(1)
               .replace(/([A-Z])/g, '-$1')
               .toLowerCase()
            return `${cssKey}: ${value};`
         }
         return ''
      })
      .join('\n')

   const stateStyles = [
      ['hover', 'hoverColor', 'hoverBackground'],
      ['visited', 'visitedColor'],
      ['active', 'activeColor', 'activeBackground'],
   ].map(([state, ...keys]) => {
      const styles = keys
         .map((key) => {
            const cssKey = key.toLowerCase().replace(/color|background/i, (match) => (match === 'color' ? 'color' : 'background-color'))
            return props[`$${key}`] ? `${cssKey}: ${props[`$${key}`]};` : ''
         })
         .filter(Boolean)
         .join(' ')

      return styles ? `&:${state} { ${styles} }` : ''
   })

   return `${baseStyles}\n${stateStyles.join('\n')}`
}

export default autoStylesProps
