const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
	entry: {
		app: './app/app.js',
		vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk']
	},
	output: {
		path: './build',
		filename: '[name].js'
	},
	devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' }
  },
	module: {
		loaders: [
			{ test: /\.jsx|\.js$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015', 'react']}},
			{
				test: /\.css$/,
				include: /stylesheets|node_modules/,
				loader: 'style!css?outputStyle=expanded'
			},
			{
				test: /\.scss$/,
				include: /stylesheets/,
				loader: ExtractTextPlugin.extract('style-loader', 'css!sass?outputStyle=expanded')
			},
			{
				test: /\.(jpg|png|gif|eot|woff|ttf|svg)/,
				loader: "file"
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
		new ExtractTextPlugin('[name].css'),
		devFlagPlugin
	]

};
