const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist"),
    assets: "assets/"
};

module.exports = {
    externals: {
        paths: PATHS
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            Assets: `${PATHS.src}/assets/`,
            Ts: `${PATHS.src}/ts/`,
            App: `${PATHS.src}/ts/app/`,
            Components: `${PATHS.src}/ts/components/`,
            Redux: `${PATHS.src}/ts/redux/`,
            Actions: `${PATHS.src}/ts/redux/actions/`,
            Selectors: `${PATHS.src}/ts/redux/selectors/`,
            Services: `${PATHS.src}/ts/services/`,
            Utils: `${PATHS.src}/ts/utils/`,
            Pages: `${PATHS.src}/ts/app/pages/`
        }
    },
    entry: {
        app: `${PATHS.src}/index.tsx`
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /(\.sass$|\.scss$)/,
                // test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: { path: `./build/postcss.config.js` }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-resources-loader",
                        options: {
                            sourceMap: true,
                            resources: [
                                `${PATHS.src}/assets/scss/utils/mixins.scss`,
                                `${PATHS.src}/assets/scss/utils/vars.scss`
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.(png|jpg|gif|svg|mp4)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: "./build/postcss.config.js"
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/${PATHS.assets}img`,
                to: `${PATHS.assets}img`
            },
            {
                from: `${PATHS.src}/${PATHS.assets}video`,
                to: `${PATHS.assets}video`
            },
            {
                from: `${PATHS.src}/${PATHS.assets}fonts`,
                to: `${PATHS.assets}fonts`
            },
            { from: `${PATHS.src}/static`, to: "" }
        ]),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: "./index.html"
            // inject: false
        })
    ]
};
