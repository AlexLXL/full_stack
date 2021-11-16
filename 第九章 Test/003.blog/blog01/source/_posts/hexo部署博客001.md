---
title: hexo部署博客001  
date: 2021-11-14 13:56:37  
categories:  
- [linux, hexo]  
tags:  
- linux
- hexo
---

### 安装与准备hexo

#### 1.安装node-js和git

下载安装Node和git:  
[Git下载](https://git-scm.com/downloads)  
[node下载](https://nodejs.org/zh-cn/)  

配置环境变量

注意: node版本在12.0以上,

#### 2.安装Hexo

`npm install -g hexo-cli`	// 安装hexo

`hexo init name `		    // 初始化hexo脚手架

#### 3.通过node启动本地服务器

`hexo s`

#### 4.添加文章

`hexo n "xxx"`	// source/_posts目录内生成对应md

#### 5.删除文章
在source_posts内删除md, 跑命令hexo g & hexo s

&nbsp;

```
 文章大部分内容转载于下列作者:
 文章作者: Fuchenchenle
 文章链接: http://fuchenchenle.cn/2020/08/17/%E8%85%BE%E8%AE%AF%E4%BA%91%EF%BC%8Bhexo-%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/
 视频地址: https://www.bilibili.com/video/BV1cp4y1i7C7?p=2&spm_id_from=pageDriver
```