---
title: Sentry监控部署011-Alert警报
date: 2021-11-22 20:14:38
categories:  
- [linux, Sentry]  
tags:  
- linux
- Sentry
---
# Sentry 实战

## `Alert` 报警

在前面的探索中，我们看到了如何在Sentry管理界面中查看性能、错误等信息。但如果我们手动在页面查看发生了哪些错误，会非常耗时耗力，因此可以配置报警功能`Alert`

### 配置邮箱

首先我们配置一个可以通过 `Sentry` 服务发送邮件的邮箱配置

- 大部分的 `Sentry配置` 可以通过 `Sentry管理界面` 配置，但是有些默认配置，比如`代表Sentry服务的邮箱`，我们不希望通过 `Sentry管理界面` 修改，但可以通过下面文件修改

  ```bash
  cd onpremise
  vim ./sentry/config.yml
  ```

- 选择一个邮箱账号作为 `Sentry服务邮箱账号`，比如我选择的是我的阿里企业邮箱，找到他们的

  - 发件服务地址：例如阿里云企业邮箱是 `smtp.mxhichina.com`
  - 该邮箱账号
  - 该邮箱密码

- 将这些信息填写到 `onpremise/sentry/config.yml` 文件中

  ```vim
  # mail.backend: 'smtp'  # Use dummy if you want to disable email entirely
  mail.host: 'smtp.163.com'
  # mail.port: 465
  mail.username: 'xxx@xxx.com'
  mail.password: 'xxxxxx'
  # mail.use-tls: false
  # mail.use-ssl: true

  # NOTE: The following 2 configs (mail.from and mail.list-namespace) are set
  #       through SENTRY_MAIL_HOST in sentry.conf.py so remove those first if
  #       you want your values in this file to be effective!


  # The email address to send on behalf of
  mail.from: 'xxx@xxx.com'
  ```

- 停止 `Sentry` 服务

  ```bash
  docker-compose down
  ```

- 启动 `Sentry` 服务

  ```bash
  docker-compose up -d
  ```

- 测试 `Sentry` 服务能否发送邮件

  - 点击`Sentry管理界面左上角头像图标`，在下拉框中选择 `Admin`，在接下来的菜单中选择 `Mail`
  - 可以看到刚才配置的邮箱信息
  - 在页面最底部点击 `Send a test email to xxx@xxx.xxx`
  - 在`xxx@xxx.xxx`邮箱中查看是否收到 `Sentry` 发送的邮件

  ![mail-settings](https://lixuelang.com/test/Sentry/pic/011/mail-settings.jpg)

### 设置报警规则

我们可以设置一些报警规则，比如性能、错误，和对应的阈值。当触发报警规则后，会发送一封邮件到指定的邮箱，然后可以点击查看报警详情

- 在 `Sentry管理界面 -> Alerts` 页，可以查看、新增、编辑、删除报警规则

- 点击 `Create Alert Rule` 按钮

- 在新建报警规则页，选择一个监控的内容，分为`Errors`、`Performance`、`Other`

- 以 `Performance` 的 `LCP` 为例，选择之，并点击 `Set Conditions`

  ![create-rule](https://lixuelang.com/test/Sentry/pic/011/create-rule.jpg)

- 在 `Filter events` 条件设置中，可以对 `evironment` 筛选，选择 `All`

- 在 `2. Select function and time interval` ，可以设置报警程序定时任务的间隔时间，以及在间隔时间内监控的内容，选择 `P50 over 1 minute`，表示每1分钟总结一次，如果超过 `50%` 的 `transaction` 超过了阈值，则报警

- 接下来设置`阈值`，在 `3. Set thresholds to trigger alert` 中，分别设置 `Critical(危急)`、`Warning(警告)`、`Resolved(满足)`的阈值，为了容易看到效果，我们分别设置 `500`、`400`、`300`，单位毫秒

  ![add-rule-1](https://lixuelang.com/test/Sentry/pic/011/add-rule-1.jpg)

- 在 `4. Perform actions` 中设置报警后发送的邮件接收人

- 在 `5. Add a rule name and team` 设置本条报警规则的名称（例如，“Sentry监控到：超过50%的样本的LCP超过了 500ms ！”）和可以编辑这条报警规则的人，名称会体现在邮件内容中

  ![add-rule-1](https://lixuelang.com/test/Sentry/pic/011/add-rule-2.jpg)

### 制造一些很慢的访问

打开浏览器cra-test页面，在 `devtools -> network -> 节流模式` 中选择  `slow 3G`，多刷新几次页面，这些页面加载速度很慢，便会触发报警，很快我们会收到邮件，点击可以查看详情

![报警邮件](https://lixuelang.com/test/Sentry/pic/011/mail.jpg)