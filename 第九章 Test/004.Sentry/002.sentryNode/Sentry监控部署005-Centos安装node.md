### 一、Centos安装node

"Sentry监控部署006"会把项目放到服务器并开本地服务器访问,需要使用node和http-server

#### 1.下载解压

方式一:

从官网下下载最新的nodejs，https://nodejs.org/en/download/

ftp工具上传到服务器

解压
```
tar -xvf node-v12.22.0-linux-x64.tar.gz
```

方式二:(推荐)

```
wget https://mirrors.huaweicloud.com/nodejs/v12.22.0/node-v12.22.0-linux-x64.tar.gz
tar -xvf node-v12.22.0-linux-x64.tar.gz
```

#### 2.移动并改名文件夹

```
mv ./node-v10.16.0-linux-64 /usr/local/nodejs
```

#### 3.让npm和node命令全局生效

方式一: 环境变量方式（这种方式似乎只对登录用户有效?）

```
vi /etc/profile

export PATH=$PATH:/usr/local/nodejs/bin
```
```
source /etc/profile
```

方式二: 软链接方式（推荐）

```
ln -s /usr/local/nodejs/bin/npm /usr/local/bin/
ln -s /usr/local/nodejs/bin/node /usr/local/bin/
```

#### 4.查看版本

```
node -v
npm -v
```


### 二、安装http-server

```
npm install -g http-server
ln -s /usr/local/nodejs/bin/http-server /usr/local/bin/ # 创建软链
```

&nbsp;

```
参考: 仓库: https://gitee.com/speedly_admin/zhufeng_sentry_20211112/blob/master/day01/%E7%AC%AC%E4%B8%80%E5%A4%A9%E7%9A%84%E8%AF%BE%E9%A2%98.md#1-%E4%B8%8B%E8%BD%BD
      视频: https://static.zhufengpeixun.com/sentry2020-09-20_20211112104628.mp4
```
