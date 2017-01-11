require("./style.css"); // 载入 style.css
document.write('It works.');
document.write(require('./mod.js'));


//异步加载
document.getElementById('btn').onclick=function(){
	require.ensure(["./file"], function() {
	  require("./file");
	});
}