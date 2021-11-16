---
title: hexo部署博客004  
date: 2021-11-14 15:09:34  
categories:  
- [linux, hexo]  
tags:  
- linux
- hexo
---

### 一、部署环境与准备

#### 1.环境

本地windows10操作系统

阿里云Centos7.6服务器

#### 1.准备

Hexo本地博客

Xshell连接到你的服务器（也可使用阿里云自带web连接）


### 二、云服务器配置Git

#### 1.安装依赖库

```shell
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
```

#### 2.安装编译工具

```shell
yum install  gcc perl-ExtUtils-MakeMaker package
```

#### 3.查看git的版本

```shell
git version
```

#### 4.删除git

git有问题时可删除, 下载最新版

```shell
yum remove git
```

#### 5.下载解压最新版

```shell
cd /usr/local/src #下载的目录 
wget https://www.kernel.org/pub/software/scm/git/git-2.28.0.tar.gz #下载最新版 
tar -zxvf git-2.28.0.tar.gz #解压到当前文件夹
```

#### 6.编辑并安装

```shell
cd git-2.28.0    #进入文件夹
make prefix=/usr/local/git all    #编译源码
make prefix=/usr/local/git install    #安装路径
```

#### 7.配置git的环境变量

```shell
echo 'export PATH=$PATH:/usr/local/git/bin' >> /etc/bashrc
```

#### 8.刷新环境变量

```shell
source /etc/bashrc
```

#### 9.查看版本号

```shell
git --version
```

#### 10.创建git用户并且修改权限

```shell
adduser alexlinux #添加用户
passwd alexlinux #添加密码
chmod 740 /etc/sudoers #文件夹配置权限
vim /etc/sudoers #添加下面配置

root ALL=(ALL) ALL 
alexlinux ALL=(ALL) ALL
```

#### 11.本地windows10使用Gitbash创建密钥

```shell
ssh-keygen -t rsa    // 生成在C:\Users\lang\.ssh
```

#### 12.将本地创建id_rsa.pub中文件复制

```shell
su alexlinux
mkdir ~/.ssh
vim ~/.ssh/authorized_keys  #拷贝id_rsa.pub内容进去
```

#### 13.本地测试

```shell
ssh -v alexlinux@服务器ip
```


### 三、云服务器网站配置

#### 1.创建网站目录并且设置权限

```shell
su root
mkdir /home/hexo
chown alexlinux:alexlinux -R /home/hexo
```

#### 2.安装Nginx

```shell
yum install -y nginx
systemctl start nginx.service    #启动服务
```

#### 3.修改Nginx配置文件

```nginx
vim /etc/nginx/nginx.conf 


    server {
        listen       9000;
        # listen       [::]:80;
        server_name  localhost;
        root         /home/test;

        autoindex on; # 开启文件目录
        autoindex_exact_size off;
        autoindex_localtime on;

        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';

        # location / {
        #     root   /home/hexo;
        # }     

        # Load configuration files for the default server block.
        # include /etc/nginx/default.d/*.conf;

        # error_page 404 /404.html;
        # location = /404.html {
        # }

        # error_page 500 502 503 504 /50x.html;
        # location = /50x.html {
        # }
    }
    
        server {
        listen       80;
        listen       [::]:80;
        server_name  localhost;
        root         /home/hexo;

        # autoindex on; # 开启文件目录
        # autoindex_exact_size off;
        # autoindex_localtime on;  

        # add_header 'Access-Control-Allow-Origin' '*';
        # add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        # add_header 'Access-Control-Allow-Credentials' 'true';  
        # add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        # add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';

        # location / {
        #     root   /home/hexo;
        # }     

        # Load configuration files for the default server block.
        # include /etc/nginx/default.d/*.conf;

        # error_page 404 /404.html;
        # location = /404.html {
        # }

        # error_page 500 502 503 504 /50x.html;
        # location = /50x.html {
        # }
    }
```

注意: 阿里云服务器需到控制台配置安全组, 即可开通想使用的端口

#### 4.重启服务器

```shell
systemctl restart nginx.service
```

#### 5.建立git仓库

```shell
su root
cd /home/alexlinux
git init --bare blog.git
chown alexlinux:alexlinux -R blog.git
```

#### 6.同步网站根目录

```shell
vim blog.git/hooks/post-receive

#!/bin/sh
git --work-tree=/home/hexo --git-dir=/home/alexlinux/blog.git checkout -f
```

#### 7.修改权限

```shell
chmod +x /home/alexlinux/blog.git/hooks/post-receive
```

#### 8.在windows10本地hexo目录修改_config.yml文件

```shell
// 安装插件: npm install --save hexo-deployer-git

deploy:
  type: git
  repository: fuchen@49.232.59.235:/home/fuchen/blog.git    #用户名@服务器Ip:git仓库位置
  branch: master
```

#### 9.在本机gitbash部署

```shell
hexo clean
hexo g -d
```

部署完毕, 即可通过服务器ip访问网站


### 四、常见报错

#### 1.git-upload-pack: 未找到命令

```
bash: git-upload-pack: command not found
fatal: Could not read from remote repository.
```

解决方法

```
sudo ln -s  /usr/local/git/bin/git-upload-pack  /usr/bin/git-upload-pack
```

#### 2.git-receive-pack: 未找到命令

```
bash: git-receive-pack: command not found
fatal: Could not read from remote repository.
```

解决方法

```
sudo ln -s /usr/local/git/bin/git-receive-pack  /usr/bin/git-receive-pack
```

#### 3.无法远程连接获取

```
fatal: Could not read from remote repository.
```

解决方法

```
重试或者 删掉本地ssh公钥重新上传至服务器
```

#### 4.key出错

```
Host key verification failed.
```

解决方法

```
ssh-keygen -R 你要访问的IP地址
```

&nbsp;

```
 文章大部分内容转载于下列作者:
 文章作者: Fuchenchenle
 文章链接: http://fuchenchenle.cn/2020/08/17/%E8%85%BE%E8%AE%AF%E4%BA%91%EF%BC%8Bhexo-%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/
 视频地址: https://www.bilibili.com/video/BV1cp4y1i7C7?p=2&spm_id_from=pageDriver
```