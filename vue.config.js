module.exports = {
  devServer: {
    port: 3333,
    proxy: {
      '/*': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  outputDir: '../SpringBoot-Project/src/main/resources/static',
  publicPath: '/',
};
