module.exports = {
  siteMetadata: {
    title: `Robert Friedl`,
    description: '',
		keywords: [
			'site'
		]
  },
  plugins: [
		`gatsby-plugin-catch-links`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-62048613-2'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Robert Friedl',
        short_name: 'RDFriedl',
        start_url: '/',
        background_color: '#000000',
        theme_color: '#ffffff',
        display: 'minimal-ui'
      }
    },
		'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass'
  ]
};
