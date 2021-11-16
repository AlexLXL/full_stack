---
title: Sentry监控部署002-centOS安装git
date: 2021-11-17 01:50:11
categories:  
- [linux, Sentry]  
tags:  
- linux
- Sentry
---

### centOS安装git

#### 1.安装依赖

```shell
yum -y install curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker
```

#### 2.下载git

```shell
cd /usr/local/src #下载的目录 
wget https://www.kernel.org/pub/software/scm/git/git-2.28.0.tar.gz #下载最新版 
tar -zxvf git-2.28.0.tar.gz #解压到当前文件夹
```

#### 3.编辑并安装

```shell
cd git-2.28.0    #进入文件夹
make prefix=/usr/local/git all    #编译源码
make prefix=/usr/local/git install    #安装路径
```

#### 4.配置git的环境变量

```shell
echo 'export PATH=$PATH:/usr/local/git/bin' >> /etc/bashrc
```

#### 5.刷新环境变量

```shell
source /etc/bashrc
```

#### 6.查看版本号

```shell
git --version
```

&nbsp;

```
参考: https://blog.csdn.net/xiaoye319/article/details/89642875
```