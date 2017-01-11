//依赖插件
var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var path = require("path");
var WebpackDevServer = require("webpack-dev-server");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//正常编译
var webpackConfig={
	entry: './src/entry.js',
	output: {
		path: path.join(__dirname, "dist"),
		filename: 'bundle.js',
		chunkFilename:'[id].js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css'
		}]
	},
	plugins: [
		//添加注释插件
		new webpack.BannerPlugin(new Date()+' By 前端老徐'),
		//自动注入打包后的资源
		new HtmlWebpackPlugin({
			title: 'laoxu App',
			filename: 'dist.html',
			template: 'src/index.html'
		})
		// , 
		// new webpack.optimize.UglifyJsPlugin({ //压缩插件
		// 	compress: {
		// 	    warnings: false
		// 	}
		// })
	]
}
gulp.task("webpack", function(callback) {
	webpack(webpackConfig, function(err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			// output options
		}));
		callback();
	});
});

//启动webpack服务
gulp.task("webpack-dev-server", function(callback) {
    var compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
        // server and middleware options
        stats: { colors: true }
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});


//老徐的前端自动化部署工具
gulp.task('default', function() {
	console.log(' | ');
	console.log(' | 老徐的前端自动化部署工具');
	console.log(' | BLOG：www.loveqiao.com');
	console.log(' | GIT ：github.com/waihaolaoxu/gulp.git');
	//console.log(' | 集成：sass编译、混淆压缩、合并文件、webpack为一体的超级工具');
	console.log(' | ');
	console.log(' | 参考资料：');
	console.log(' | webpack.github.io 、www.gulpjs.com.cn');
	console.log(' | ');
});

