export const createFont = async () => {
  const webFontLoader = await import('webfontloader')

  webFontLoader.load({
    google: {
      api: 'https://fonts.googleapis.com/css2',
      families: ['Space+Grotesk:wght@400;500;700&display=swap'],
    },
  })
}
