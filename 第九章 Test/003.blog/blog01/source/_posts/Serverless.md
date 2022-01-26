---
title: Serverless_未完成
date: 2022-01-25 18:20:38
categories:
- [物理机, 虚拟机, Docker, K8s, 阿里云函数计算Serverless]  
tags:
- 物理机
- 虚拟机
- Docker
- K8s
- 阿里云函数计算Serverless
---

# Serverless

## 第1讲 Serverless介绍

### 1.1 历史

分为四个时代: 物理机时代、虚拟机时代、容器时代、Serverless时代

#### 1.物理机时代

![物理机时代发展历程](https://lixuelang.com/test/Serverless/0002.png)
![物理机时代网站部署架构](https://lixuelang.com/test/Serverless/0003.png)

> 简单理解: 手动部署服务器、网站的过程;
>
> 缺点:
> 1.断电、断网容易导致服务中断;
> 2.出现硬件烧毁, 无法保证新环境与原来一致,
> 网站的持续可用,各种问题接连产生...;
> 3.承担服务器购买、场地、电力、网络、运维开销;

#### 2.虚拟机时代

为解决物理机时代问题, 经历了虚拟机时代（不再关心硬件底层, 关心运行环境）。

![虚拟机时代发展历程](https://lixuelang.com/test/Serverless/0004.png)
![虚拟机时代网站部署架构](https://lixuelang.com/test/Serverless/0005.png)

> 简单理解:　在云平台购买虚拟机/数据库;
>
> 优点:
> 1.不用担心断电断网, 硬件故障;
> 2.成本更低, 无需运维;
> 3.云数据库做了性能优化, 承载千万级别写入
> (且有异地容灾)
> (计算和存储分离,提升数据安全性);
> 4.硬盘可无限扩展;
>
> 缺点:
> 1.服务器型号一直迭代更新,下一次购买可能已经没上次的型号
> 只有新型号;
> 2.新的服务器都要初始化环境和配置;
>
> 名词解释:   
> laaS(基础设施即服务) - 卖云服务器  
> PaaS(平台即服务) - 云服务厂商卖的一些通用平台，如: 中间件、数据库
>

#### 3.容器时代

2013年Docker的发布, 代表容器技术替代了
虚拟化技术,云计算进入容器时代。

![容器时代发展历程](https://lixuelang.com/test/Serverless/0006.png)
![容器时代网站部署架构](https://lixuelang.com/test/Serverless/0007.png)

> 简单理解:　容器就是讲代码和运行环境一起打包,
> 这样代码就可以在任何地方运行。有了容器技术，
> 在服务器部署的不再是应用了，而是容器。但容器多了，
> 如何管理成了问题，于是出现了容器编排技术，
> 比如2014年Google开源的Kubernetes。
>
> 自此，你不仅使用了容器，你还使用了 Kubernetes 来做管理容器集群。
> 基于 Kubernetes 和云厂商提供的弹性能力，
> 你可以实现网站的自动弹性伸缩。
> 这样在流量洪峰到来时，就可以自动弹出更多的资源；
> 当流量低谷时，自动释放多余的资源
>
> 优点:
> 1.新的服务器不在需要初始化环境和配置;
> 2.可以使用主流K8S服务提供商的服务, 方便管理硬件
> （如 EKS (Amazon Elastic Kubernetes Service) 和 ACK（阿里云容器服务））;
>
> 缺点:
> 1.时间一久，需要去规划节点和 Pod 的 CPU、内存、
> 磁盘等资源，需要编写复杂的 YAML 去部署 Pod、
> 服务，需要经常排查 Pod 出现的异常，渐渐地，
> 你好像变成了 Kubernetes 运维工程师;  
> 2.如果前期,服务器资源准备不足,如双十一来了,
> 瞬时流量太大,集群虽然感知到了需要弹出更多资源,
> 但由于服务器弹出需要一定时间,会没来得及反应这种瞬时流量。
> 对此的解决方案:一、秒级别的弹性, Serverless;
> 二、定时扩容: [公交类公司,可以指定一个定时伸缩策略，
> 每天早晨 5 点将集群规模扩大 x 倍，
> xx 业务规模扩大 y 倍，
> 11 点再缩容至原规模，下午 4 点再进行扩容，
> 以此类推。](https://www.cnblogs.com/ssgeek/p/12181102.html)
> 3.k8s提供分钟级的弹性, 而不是秒级
>
> 名词解释:  
> Pod - 一个或多个容器的组合。
> 这些容器共享存储、网络和命名空间，
> 以及如何运行的规范。可以理解为一个小主机.;

```
基于容器, 部署网站:
1.搭建 Kubernetes 集群；
2.构建容器镜像；
3.部署镜像；
```

#### 4.Serverless

发展阶段,局限还是很大。

此前三者属于Serverful架构，Serverless指构建运行不需要服务器的架构概念,
但这并不代表应用运行不需要服务器，而是开发者不关心服务器。

![Serverless 时代发展历程](https://lixuelang.com/test/Serverless/0008.png)
![Serverless 时代部署架构图](https://lixuelang.com/test/Serverless/0009.png)

> 简单理解:　FaaS（函数即服务） + BaaS （后端即服务）。
> FaaS能够运行开发者写的函数代码(处理业务逻辑, 调用BaaS),每次会生成一个新的空间运行函数,运行完销毁。
> BaaS就是正常些后台, 读写数据库、文件存储等;
>
> 优点:
> 1.FaaS平台能实现业务的秒级弹性,理论上没有并发上限。
> 2.开发者只关心业务开发, 不关心服务器。
> 3.节省成本,按函数的运行次数和消耗CPU、内存等资源收费。
> 4.FaaS和BaaS是一种计算和存储分离的架构。
>
> 缺点:
> 1.过度依赖第三方厂商服务(向切换云厂商要做好适配);
> 2.代码关注底层硬件的话, 会受影响;
> 3.函数通信效率低(只能通过HTTP通信/现在也有事件总线通信), 不像应用那样共享内存变量;
> 4.调试困难, 各个厂商各玩各的也不统一;

#### 5.总结
- 物理机时代：2000 年之前，我们需要通过物理机部署网站。
- 虚拟机时代：2000 年之后，虚拟化技术发展成熟，不再关注物理机, 云服务提供稳定性。
- 容器时代：2013 年云计算进入容器时代，不再关心运行环境。
- Serverless 时代：云计算进入 Serverless 时代，不再关心服务器和运维工作，应用也天然具有弹性。专注业务开发。

问题:  
1.Serverless依赖厂商?  
答: 我们使用 Serverless 有两个途径，一是使用公有云 Serverless 产品，二是自己私有化部署 Serverless 平台。
即可以在自己服务器集群(支持秒级弹性)上部署Serverless平台，但这样需要自己维护底层机器，运维成本和经济成本都很高。

&nbsp;

2.为什么需要一个网管承接用户流量?  
答: 基于网关，就可以实现你说的负载均衡以及流量控制、白黑名单、权限校验等复杂功能了。

&nbsp;

3.Serverless会取代k8s时代, 成为下一代主流?  
答: 肯定的, 因为目前使用 k8s 的成本还比较高，还需要开发者自己去维护集群，编写繁多的 YAML 来部署应用。
K8s是按资源付费的,而不是实际使用。成本和效率一直是开发者和企业关注的问题。

&nbsp;

4.SaaS没有提及?  
答:  好问题。因为是按照应用部署架构演进的时间线来介绍的，而 SaaS 的话，是厂商直接提供软件服务，用户花钱购买使用，也就不用自己设计网站架构了，所以没有拿出来介绍，刚好借此问题简单补充一下。使用 SaaS 的优点就是方便简单，缺点也很明显，定制差。SaaS 在云计算早起就出现了，第一家通过互联网提供应用程序的公司是 Salesforce.com，它在 1999 年就成了。

&nbsp;

5.Faas弹性扩容针对业务层，但实际web应用开发中，性能瓶颈在Backend ，如何弹性扩容?  
答: 我理解 Backend 应该指的是云厂商提供的 BaaS？BaaS 性能瓶颈，的确是现在基于 FaaS 和 BaaS 这种 Serverless 实现面临的一个问题。基于 FaaS 我们可以实现计算资源的自动弹性伸缩，而 BaaS 多种多样，存储的弹性伸缩面临的挑战也更大。使用 BaaS，我们就需要依赖 BaaS 服务的能力，有些 BaaS 比如 DynamoDB、表格存储等 NoSQL 都支持自动弹性扩容，而 RDS 则不具备弹性能力，这时就需要人工根据业务流量进行容量规划了。

&nbsp;

6.开源的serverless解决方案?  
现在开源的 Serverless 解决方案有很多，比如 OpenWhisk、Fission、Kubeless、OpenFaaS、Fn 等。

> OpenWhisk 起源于2016年2月，是由 IMB 开发的，IBM 的 Cloud Functions 就是基于OpenWhisk 实现的。后来 IMB 将 OpenWhisk 捐赠给了 Apache 基金会。OpenWhisk可以运行在物理机、虚拟机和 kubernetes 等多种不同的基础架构上。 OpenWhisk 是用 Scale 编写的。

> Fisson 起源于 2016年 11 月，是 Platform9 公司的 Soam Vasani 及少数几位工程师开源的 Serverless 解决方案。Fisson 运行在 kubernetes 集群上。通常基于 Docker 的 FaaS 冷启动要 200 毫秒左右，而 Fisson 通过预热容器、容器重用等技术，实现了低于 100毫秒的冷启动。Fisson 是用 Go 编写的。

> Kubeless 起源于 2016 年 8 月，是纯开源的软件。和 Fisson 一样，kubeless 也是运行在运行 kubernetes 的，kubernetes 使用了很多 Kubernetes原生的组件，如 Service、 Ingress、 HPA（ Horizontal Pod Autoscaler）等。Kubeless 是用Go 编写的。

> OpenFaaS 起源于 2016 年 12 月，最初是由一个 Alex Ellis 编写的，主要特点是简单易用，并且支持 Kubernetes 和 Docker Swarm。OpenFaaS 也是用Go 编写的。










## 2.学习路径图

![](https://lixuelang.com/test/Serverless/0001.png)














## 3.Serverless应用

### 3.1选择FaaS平台

![FaaS平台区别](https://lixuelang.com/test/Serverless/0010.jpg)

从表格中，你可以总结出这样几点信息。

- FaaS 平台都支持 Node.js、Python 、Java 等编程语言；

- FaaS 平台都支持 HTTP 和定时触发器（这两个触发器最常用）。此外各厂商的 FaaS 支持与自己云产品相关的触发器，函数计算支持阿里云表格存储等触发器；

- FaaS 的计费都差不多，且每个月都提供一定的免费额度。其中 GB-s 是指函数每秒消耗的内存大小，比如1G-s 的含义就是函数以 1G 内存执行 1 秒钟。超出免费额度后，费用基本都是 0.0133元/万次，0.00003167元/GB-s。所以，用 FaaS 整体费用非常便宜，对一个小应用来说，几乎是免费的。

总的来说，国外开发者经常用 Lambda，相关的第三方产品和社区更完善，国内经常用函数计算，因为函数计算使用方式更符合国内开发者的习惯。

### 3.2阿里云demo

1.[开通阿里云 函数计算 ](https://help.aliyun.com/document_detail/253972.html)

2.添加函数(使用HTTP触发器)
![serverless测试函数](https://lixuelang.com/test/Serverless/0011.jpg)
![访问地址](https://lixuelang.com/test/Serverless/0012.jpg)

3.测试
```
curl https://1853774509549073.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/myserverless.LATEST/test01/?name=Serverless
// OUTPUT: Hello Serverless!
```

4.如果想在页面请求,需添加域名
[添加域名](https://help.aliyun.com/document_detail/90763.html)

5.基础知识
> 1. index.handler是入口函数  
     > 所以一般会将业务逻辑拆到入口函数外
```
// logic.js
exports.sayHello = function (name) {
  return `Hello, ${name}!`;
}
```
```
// index.js
const logic = require('./logic');
exports.handler = (request, response, context) => {
  // 从 request 中获取
  const { name } = request.queries;
// 处理业务逻辑
  const message = logic.sayHello(name)

// 设置 HTTP 响应
  response.setStatusCode(200);
  response.setHeader("Content-Type", "application/json");
  response.send(JSON.stringify({ message })); 
}
```

> 2. node代码的具体使用可以看文档(比如上面handler函数的参数)

> 3. 触发器
- HTTP触发器  
  在众多 FaaS 平台中，函数计算直接提供了 HTTP 触发器，HTTP 触发器通过发送 HTTP 请求来触发函数执行，一般都会支持 POST、GET、PUT、HEAD 等方法。所以你可以用 HTTP 触发器来构建 Restful 接口或 Web 系统。
  ![HTTP触发器](https://lixuelang.com/test/Serverless/0013.png)


- API网关触发器  
  API 网关触发器与 HTTP 触发器类似，它主要用于构建 Web 系统。本质是利用 API 网关接收 HTTP 请求，然后再产生事件，将事件传递给 FaaS。FaaS 将函数执行完毕后将函数返回值传递给 API 网关，API 网关再将返回值包装为 HTTP 响应返回给用户。
  ![API网关触发器](https://lixuelang.com/test/Serverless/0014.png)


- 定时触发器  
  定时触发器就是定时执行函数，它经常用来做一些周期任务，比如每天定时查询天气并给自己发送通知、每小时定时处理分析日志等等。
  ![定时触发器](https://lixuelang.com/test/Serverless/0015.png)















## 4.Serverless是如何运行的

### 4.1 函数调用链路

![函数调用链路](https://lixuelang.com/test/Serverless/0016.png)
可以看到有同步和异步的调用, 在执行异步操作的时候,
是通过排队列的方式, 所以当实例太多(同时在线实例最多100个),
部分实例运行可能延迟。

可通过SKD的方式在Node代码控制同步/异步。

### 4.2 生命周期

![函数启动过程](https://lixuelang.com/test/Serverless/0017.png)

整个函数的运行过程可以分为四个阶段。

- 下载代码： FaaS 平台本身不会存储代码，而是将代码放在对象存储中，需要执行函数的时候，再从对象存储中将函数代码下载下来并解压，因此 FaaS 平台一般都会对代码包的大小进行限制，通常代码包不能超过 50MB。
- 启动容器： 代码下载完成后，FaaS 会根据函数的配置，启动对应容器，FaaS 使用容器进行资源隔离。
- 初始化运行环境： 分析代码依赖、执行用户初始化逻辑、初始化入口函数之外的代码等。
- 运行代码： 调用入口函数执行代码。

一般冷启动后会存活几分钟, 如果继续调用会沿用该存活实例，
也就是上面的`热启动`，`热启动` 的耗时就完全是启动函数的耗时了,
只会执行启动函数，其他文件函数会沿用之前的！！

### 4.3 特性

- 实例的默认超时时间为60s










---

后台接口太过纯粹导致一个页面请求多个接口，其实可以通过BFF聚合成一个接口处理业务
BFF: https://www.jianshu.com/p/eb1875c62ad3

曾经你部署一个 BFF 或者服务端渲染应用，要购买机器、
安装环境，甚至考虑负载均衡、分布式缓存、流量控制等
复杂后端问题，而 Serverless 把这些能力封装成服务，
让你开箱即用，解决你不会服务器运维的困难

serverless: 不关注服务器，开发者更关注业务，快速迭代

---

通过适配器模式抹平云厂商API差异, 将业务代码抽离

---














## 5.如何提高应用开发调试和部署效率？











