module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json', // Required by Webpack v4
      use: 'yaml-loader'
    });

    return config;
  },
  env: {
    API_TOKEN_SECRET: process.env.API_TOKEN_SECRET
  }
};
