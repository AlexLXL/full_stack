---
title: hexo部署博客005(结)  
date: 2021-11-14 15:40:17
categories:  
- [linux, hexo]  
tags:  
- linux
- hexo
---

### 一、部署准备

#### 1.环境

本地windows10操作系统

阿里云服务器（Centos7.6）

#### 2.准备

SSL证书下载到本地 [买域名后可在阿里云免费申请一年]

Winscp / Filezilla 软件来上传ssl证书


### 二.安装FTP服务

#### 1.安装vsftpd

```shell
yum install -y vsftpd
```

#### 2.修改配置文件

```shell
vim /etc/vsftpd/vsftpd.conf

anonymous_enable=No     #禁止匿名用户登录
```


### 三、部署SSL证书

#### 1.文件默认上传至我们的用户文件夹下

```shell
cd /home/alexlinux
ls
```

#### 2.解压缩文件

```shell
unzip ~.zip
```

#### 3.解压完成后，会在我们的文件夹下生成 Nginx Apache IIS Tomcat 文件夹 我们只需要用Nginx

#### 4.将Nginx文件夹下的文件复制到新建的文件夹下

```shell
mkdir /etc/nginx/ssl/
cd /home/alexlinux/Nginx
cp ~.crt /etc/nginx/ssl/
cp ~.key /etc/nginx/ssl/
```

#### 5.打开nginx.conf 文件夹 修改配置文件

```shell
vim /etc/nginx/nginx.conf
```

```nginx
    server {
        listen       443 ssl;
        listen       [::]:443 ssl;
        server_name  lixuelang.com;
        root         /home/hexo;

        ssl_certificate /etc/nginx/ssl/server.pem;
        ssl_certificate_key /etc/nginx/ssl/server.key;
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

       location / {
               root /home/hexo;
               index index.html;
       }

        #error_page 404 /404.html;
        #    location = /40x.html {
        #}

        #error_page 500 502 503 504 /50x.html;
        #    location = /50x.html {
        #}
    }
```

#### 6.查看是否有报错，无报错重启服务器

```shell
nginx -t
systemctl restart nginx
```

&nbsp;

```
 文章大部分内容转载于下列作者:
 文章作者: Fuchenchenle
 文章链接: http://fuchenchenle.cn/2020/08/17/%E8%85%BE%E8%AE%AF%E4%BA%91%EF%BC%8Bhexo-%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/
 视频地址: https://www.bilibili.com/video/BV1cp4y1i7C7?p=2&spm_id_from=pageDriver
```
