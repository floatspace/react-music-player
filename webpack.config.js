module.exports = {
    devtool: 'eval-source-map',
     entry: __dirname + '/App.js',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './', // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        disableHostCheck: true,
        inline: true  //实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, 
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    },
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                'style-loader', 'css-loader', {
                    loader: "postcss-loader",
                    options: {                        
                        sourceMap: true,
                        plugins: function() {
                            return [
                            require('autoprefixer')
                            ];
                        }
                    }
                }, 'stylus-loader'
                ]
            },
    　　　　{
    　　　　　　test: /\.(png|jpg)$/,
    　　　　　　loader: 'url-loader'
    　　　　},
    　　　　{
    　　　　　　test: /\.(mp3|mp4)$/,
    　　　　　　loader: 'file'
    　　　　}
        ]
    }
};