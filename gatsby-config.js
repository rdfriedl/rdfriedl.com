module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
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
    'gatsby-plugin-react-helmet'
  ]
};
