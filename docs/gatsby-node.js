const path = require("path");
const fs = require("fs");
const layout = path.resolve(`./src/domains/@ui/layout/mdx-layout.tsx`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }

  // Create blog post pages.
  const posts = result.data.allMdx.nodes;

  // you'll call `createPage` for each result
  posts.forEach((node) => {
    createPage({
      path: node.frontmatter.slug,
      component: `${layout}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@dot/geul-react": path.resolve(
          __dirname,
          "../packages/geul.js/react/src/index.ts",
        ),
      },
    },
  });
};

exports.onPostBuild = () => {
  const exists = fs.existsSync(path.join(__dirname, "../dist"));
  exists &&
    fs.rmdirSync(path.join(__dirname, "../dist"), {
      recursive: true,
      force: true,
    });
  fs.renameSync(
    path.join(__dirname, "public"),
    path.join(__dirname, "../dist"),
  );
  // fs.renameSync(
  //   path.join(__dirname, "public_dev"),
  //   path.join(__dirname, "../dist_dev"),
  // );
};

// exports.onCreateBabelConfig = ({ actions }) => {
//   actions.setBabelPlugin({
//     name: "@babel/plugin-transform-react-jsx",
//     options: {
//       runtime: "automatic",
//     },
//   });
// };
