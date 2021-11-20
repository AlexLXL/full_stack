---
title: Sentry监控部署004-开始部署Sentry
date: 2021-11-17 01:52:10
categories:  
- [linux, Sentry]  
tags:  
- linux
- Sentry
---
### 一、环境

onpremise版本: 21.7.0

注意: 文章标注的版本尽量保持一致, 重要!!!

### 二、Sentry部署

#### 1.下载

```shell
git clone https://github.com/getsentry/onpremise -b 21.7.0
```

#### 2.安装

```shell
cd onpremise
./install.sh --no-user-prompt

成功信息:
-----------------------------------------------------------------

You're all done! Run the following command to get Sentry running:

  docker-compose up -d

-----------------------------------------------------------------
```

#### 3.启动

```shell
docker-compose up -d
```

安装过程中会让我们创建 sentry 后台管理员账号，可以先跳过，后面再创建

#### 4.注册

```shell
docker-compose run --rm web createuser --superuser # 创建超级管理员账号
```

#### 5.登录

浏览器访问 http://localhost:9000/ ，输入刚才创建的超级管理员账号密码，登录

![图片](https://lixuelang.com/test/Sentry/pic/004/1.jpg)

&nbsp;

```
参考: 仓库: https://gitee.com/speedly_admin/zhufeng_sentry_20211112/blob/master/day01/%E7%AC%AC%E4%B8%80%E5%A4%A9%E7%9A%84%E8%AF%BE%E9%A2%98.md#1-%E4%B8%8B%E8%BD%BD
      视频: https://static.zhufengpeixun.com/sentry2020-09-20_20211112104628.mp4

设置中文: https://www.pianshen.com/article/67341101843/
```
