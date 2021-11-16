### 一、环境

docker版本: 20.10.10

docker-compose版本: 1.25.1

注意: 文章标注的版本尽量保持一致, 重要!!!

### 二、centOS安装docker和docker-compose

#### 1.安装docker

```shell
yum -y install docker # 使用yum安装docker
systemctl start docker.service # 启动
systemctl enable docker.service # 设置为开机自启动
```

#### 2.安装docker-compose

##### 2.1 下载docker-compose, 两种方式。

第一种方式:github或者道客云网站拉取后放入/usr/local/bin/目录下并赋予权限 (推荐)
```shell
道客云的网址：curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose（强烈推荐使用这个 ，速度快些）
GitHub的网址：curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose（强烈不推荐这个，慢的可以让人发疯）
```
第二种方式: `pip install docker-compose` (强烈不推荐)
```
pip install docker-compose

或者去这个网址下载: https://pypi.org/search/?q=docker-compose，
由于是Python所编写的，下载下来的东东也就使用Python的方式安装就可以了。
版本可能比较高，可以找低版本的1.25安装。
```

##### 2.2 添加权限: `sudo chmod +x /usr/local/bin/docker-compose`

##### 2.3 查看docker-compose版本: `docker-compose --version`

### 二、问题

#### 1.yum被占用, 使用 `kill -9 xxxx` 杀死进程

&nbsp;

```
参考: https://www.cnblogs.com/nieqibest/p/9846655.html
      https://www.cnblogs.com/thescholar/p/12168295.html
      https://blog.csdn.net/alwaysbefine/article/details/106717823
      https://www.jianshu.com/p/8b569bd79541

注意: 在centOS7, pip装docker-compose会一直报python的错，网上的解答无法解决
      删除docker-compose-直接删文件即可
```

```
附送docker命令:

docker ps 查看当前正在运行的容器
docker ps -a 查看所有容器的状态
docker start/stop id/name 启动/停止某个容器
docker attach id 进入某个容器(使用exit退出后容器也跟着停止运行)
docker exec -ti id 启动一个伪终端以交互式的方式进入某个容器（使用exit退出后容器不停止运行）
docker images 查看本地镜像
docker rm id/name 删除某个容器
docker rmi id/name 删除某个镜像
#  复制ubuntu容器并且重命名为test且运行，然后以伪终端交互式方式进入容器，运行bash
docker run --name test -ti ubuntu /bin/bash 
docker build -t soar/centos:7.1 .  通过当前目录下的Dockerfile创建一个名为soar/centos:7.1的镜像
# 以镜像soar/centos:7.1创建名为test的容器，并以后台模式运行，并做端口映射到宿主机2222端口，P参数重启容器宿主机端口会发生改变
docker run -d -p 2222:22 --name test soar/centos:7.1
```
