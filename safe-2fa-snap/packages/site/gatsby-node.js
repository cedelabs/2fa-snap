module.exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        constants: require.resolve("constants-browserify"),
        buffer: require.resolve("buffer"),
      },
    },
  });
};
