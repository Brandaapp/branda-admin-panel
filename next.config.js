module.exports = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.ya?ml$/,
            type: 'json', // Required by Webpack v4
            use: 'yaml-loader'
        })
    
        return config
    },
    env: {
        MONGO_URI: "mongodb+srv://branda:branda*1234@kevin.0cusy.mongodb.net/brandadb?retryWrites=true&w=majority",
        PORT: 3000
    }
};

//mongoshell connection string: "mongodb+srv://kevin.0cusy.mongodb.net/brandadb" --username branda