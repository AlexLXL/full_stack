//放置着所有的模块定义 key模块ID 值是模块定义
var modules = {};
//已经加载的模块的缓存
var cache = {};

function require(moduleId) {
    if (cache[moduleId]) {
        return cache[moduleId];
    } else {
        var module = cache[moduleId] = { exports: {} };
        //执行模块定义方法，给module.exports赋值，导出对象就是module.exports
        modules[moduleId](module, module.exports, require);
        return module.exports;
    }
}
require.m = modules;//模块定义
require.c = cache;//模块的缓存
require.f={};
require.p = '';
require.r = (exports)=>{
    Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});
    Object.defineProperty(exports,'__esModule',{value:true});
}
require.d = (exports,definition)=>{
    for(var key in definition){
        Object.defineProperty(exports,key,{enumerable:true,get:definition[key]});
    }
}
require.u = (chunkId)=>chunkId+`.main.js`;
require.l = (url)=>{
    let script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
}
//已经安装好或者加载中的代码块 0已经就绪的
var installedChunks = {main:0};
require.f.j = (chunkId,promises)=>{
    var installedChunkData;
    var promise = new Promise((resolve,reject)=>{
        installedChunkData=installedChunks[chunkId]=[resolve,reject];
    });
    promises.push(installedChunkData[2]=promise);//这个就是JSONP要加载的脚本的路径或者说名称
    var url = require.p + require.u(chunkId);
    require.l(url);
}
require.e = (chunkId)=>{
    let promises = [];
    require.f.j(chunkId,promises);
    return Promise.all(promises);
}
//定义一个代码块加载的全局变量，它的值默认是一个空数组
var webpackJsonpCallback = ([chunkIds,moreModules])=>{
    var moduleId,chunkId,i=0,resolves=[];
    for(;i<chunkIds.length;i++){
        chunkId=chunkIds[i];
        resolves.push(installedChunks[chunkId][0]);//把promise的resovle方法取出放到了resolves数组中
        installedChunks[chunkId]=0;//表示此代码块已经 加载完成
    }
    for(let moduleId in moreModules){
        require.m[moduleId]= moreModules[moduleId];
    }
    //循环执行我们的所有的resolve方法，让promise完成
    while(resolves.length){
        resolves.shift()();
    }
}
var chunkLoadingGlobal = window["webpackChunk_2_bundle"]=[];
chunkLoadingGlobal.push = webpackJsonpCallback;
let playButton = document.getElementById('play');
playButton.addEventListener('click', () => {
    //./src/video.js => [src,video,js].join('_')
    debugger
    require.e("src_video_js").then((data)=>{
        debugger
        return require("./src/video.js");
    }).then(result => {
        debugger
        console.log(result.default);
    });
});
