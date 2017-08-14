const webpack = require("webpack");
const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

const packageJson = require("./package");

module.exports = env => {

    const BUILD_FOLDER = "dist";
    const BUNDLE_NAME = "bundle";

    const configuration = {
        context: path.join(__dirname, "src"),
        entry: [
            "./index.js"
        ],
        output: {
            path: path.join(__dirname, BUILD_FOLDER),
            filename: `${BUNDLE_NAME}.js`,
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            attrs: ['img:src', 'img:data-src']
                        }
                    }],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.(css|scss)$/,
                    use: ["css-hot-loader"].concat(ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                            }, {
                                loader: "sass-loader",
                                options: {
                                    includePaths: ["src/assets/styles/sass"]
                                },
                            }
                        ]
                    }))
                },
                {
                    test: /\.(woff2?|ttf|eot)$/,
                    use: [{
                        loader: "file-loader",
                        options: { name: "./fonts/[hash].[ext]" }
                    }]
                },
                {
                    test: /\.(jpg|png|svg)$/,
                    use: [{
                        loader: "file-loader",
                        options: { name: "./images/[hash].[ext]" }
                    }]
                },
            ]
        },
        resolve: {
            modules: [
                path.join(__dirname, "node_modules"),
            ],
            alias: {
                locales: path.resolve(__dirname, "./src/locales/locales")
            }
        },
        plugins: [
            new ExtractTextPlugin(`${BUNDLE_NAME}.css`),
            new HtmlWebpackPlugin({
                baseUrl: "./",
                title: packageJson.name,
                name: packageJson.name,
                version: packageJson.version,
                template: "index.ejs"
            }),
            new webpack.ProvidePlugin({
                "window.CodeMirror": "codemirror",
                CodeMirror: "codemirror",
                "jQuery": "jquery",
                "jquery": "jquery",
                "$": "jquery",
                "window.jQuery": "jquery",
                "window.jquery": "jquery",
                Tether: 'tether',
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(env),
                $version: JSON.stringify(packageJson.version),
                $project: JSON.stringify(packageJson.project)
            }),
        ],
    };

    /** TESTS CONFIGURATION **/
    if (env == "test") {

        configuration.devtool = "inline-source-map";
        configuration.entry = undefined;

    }

    /** DEVELOPMENT CONFIGURATION **/
    if (env == "development") {

        configuration.devtool = "source-map";

        configuration.devServer = {
            historyApiFallback: true,
            contentBase: false,
            compress: true,
            open: true,
            openPage: "#!/",
            stats: "minimal"
        };

        configuration.plugins.push(new webpack.NamedModulesPlugin());

    }

    /** PRODUCTION CONFIGURATION **/
    if (env == "production") {

        configuration.plugins.push(new CleanWebpackPlugin([BUILD_FOLDER]));
        configuration.plugins.push(new UglifyJSPlugin());
        configuration.plugins.push(new OptimizeCSSAssets());

    }


    return configuration;
};