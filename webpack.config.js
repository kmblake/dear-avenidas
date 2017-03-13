var config = {
   entry: ['./main.js'],
   
   output: {
      path: __dirname + "/dist",
      publicPath : "/",
      filename: 'index.js',
   },
   
   devServer: {
      inline: true,
      port: 8080
   },
   
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            
            query: {
               presets: ['es2015', 'react']
            }
         },
         { 
            test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, 
            loader: "file-loader" 
         },
         {
           test: /\.json$/,
           use: 'raw-loader'
         },
         {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
         }
      ]
   }
}

module.exports = config;