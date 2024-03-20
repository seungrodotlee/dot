import dotenv from "dotenv";

import algoliaQueries from "./src/utils/algolia-queries";

import type { GatsbyConfig } from "gatsby";


dotenv.config();

const config: GatsbyConfig = {
  flags: {
		DEV_SSR: true,
	},
  pathPrefix: "/dot",
  siteMetadata: {
    title: `Geul.js`,
    siteUrl: `https://seungrodotlee.github.io/dot/`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-react-helmet',
    "gatsby-plugin-postcss", 
    /* "gatsby-plugin-google-gtag",*/ 
    "gatsby-plugin-image", 
    "gatsby-plugin-sitemap", 
    { resolve: `gatsby-plugin-emotion` }, 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/content/images/icon.png"
      }
    }, 
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          // remarkGfm,
          "gatsby-remark-gifs",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              
            },
          },
        ]
      }
    }, 
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp", 
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_APPLICATION_ID,
        apiKey: process.env.GATSBY_API_KEY,
        queries: algoliaQueries
      },
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Yaml`, // a fixed string
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/content/images/"
      },
      __key: "images"
    }, 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        // name: "postsIndex",
        path: "./src/content/",
      },
      // __key: "postsIndex"
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./src/content/posts",
      },
      __key: "posts"
    },
  ]
};

export default config;
