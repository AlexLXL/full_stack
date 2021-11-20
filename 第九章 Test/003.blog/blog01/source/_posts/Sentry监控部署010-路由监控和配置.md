---
title: Sentry监控部署010-路由监控和配置
date: 2021-11-20 22:08:44
categories:  
- [linux, Sentry]  
tags:  
- linux
- Sentry
---
# Sentry 实战

## 导航操作检测

在前面**页面加载与性能指标**的介绍中，我们了解到性能信息都是有 `SDK` 的 `BrowserTracing` 功能采集的，而 `BrowserTracing` 除了采集页面加载性能指标外，还可以采集路由导航时的相关信息，这在单页面应用中非常有用

### 1. 基本导航操作检测

- 首先我们在前端项目中加上前端路由

  ```bash
  # 安装React路由
  npm i -S react-router-dom
  ```

  ```js
  // App.js
  import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';

  function App() {
    function fn() {
      console.log(window.a.b);
    }
    return (
      <Router>
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Router path="/about">
              about
            </Router>
            <Router path="/">
              <button onClick={fn}>Break the world</button>
            </Router>
          </Switch>
        </>
      </Router>
    );
  }

  export default App;
  ```

- 接下来我们打开页面 `localhost:9000`，点击`About`，跳转到`/about`页，可以看到此时 `SDK` 多上报了一条 `transaction`

  ![router](https://lixuelang.com/test/Sentry/pic/010/router.jpg)

- 过一会儿，在 `Sentry管理界面` -> `Discover菜单 -> All Events`中，我们可以看到刚才上报的 `transaction`: `/about`，点击打开详情

- 在 `Breadcrumbs` 中，我们可以看到这是一个 `TYPE` 为 `navigation`，`CATEGORY` 为 `navigation` 的 `transaction`，并告诉了我们 `from`，从 `/` 路由，`to`，跳转到了 `/about` 路由。

- 在跳转之前，经历了 `pageload`，和 `ui.click`

  ![router-detail](https://lixuelang.com/test/Sentry/pic/010/router-detail.jpg)

### 2. `React router` 导航操作检测

- 目前为止，对于 `/user/:id` 的路由，不同的 `id`，上报的 `transaction` 名称是不同的，例如 `/user/1`、`/user/2`。

- 我们可以分别在 `/user/1`、`/user/2` 路由下刷新页面，然后在Sentry管理界面的Performance菜单里查看效果，会看到两条不同的 `TRANSACTION`: `/user/1`、`/user/2`

  ![react-router-1](https://lixuelang.com/test/Sentry/pic/010/react-router-1.jpg)

- 实际上我们希望他们是一条，预期应该显示: `/user/:id`，在 `React` 项目中，我们可以通过 `Sentry.reactRouterV5Instrumentation`配置。

#### `React` 配置

- 安装history

  ```bash
  npm i -S history@4
  ```

- 配置 `React router` 集成

  ```js
  // index.js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { Router, Route, Switch, Link, matchPath } from 'react-router-dom';

  import { createBrowserHistory } from 'history';

  import * as Sentry from '@sentry/react';
  import { Integrations } from '@sentry/tracing';

  const history = createBrowserHistory();

  const routes = [{ path: '/about' }, { path: '/user/:id' }, { path: '/' }];

  Sentry.init({
    dsn: "http://xxxxxxxxxxxxxxxx@127.0.0.1:9000/3",
    environment: 'localhost',
    integrations: [new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV5Instrumentation(history, routes, matchPath),
    })],
    tracesSampleRate: 1.0,
    release: '0.0.1',
  });

  const App = () => {
    function fn() {
      console.log(window.a.b);
    }
    return (
      <Router history={history}>
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/user/1">User1</Link>
              </li>
              <li>
                <Link to="/user/2">User2</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/about" children={
              () => <div>about</div>
            } />
            <Route path="/user/:id" children={
              () => <div>user</div>
            } />
            <Route exact path="/" children={
              () => <button onClick={fn}>Break the world</button>
            } />
          </Switch>
        </>
      </Router>
    );
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  ```

- 然后我们再在`/user/1`、`/user/2`路由下刷新页面，查看上报的`transaction`，已经变成了一种: `/user/:id`

  ![react-router-2](https://lixuelang.com/test/Sentry/pic/010/react-router-2.jpg)

- 还有一种方式可以也达到这个目的：使用 `Sentry.withSentryRouting` 高阶组件包裹 `Route`，具体可以参考 [官方文档](https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/)

### 3. `Vue router` 导航操作检测

[sentry 的 vue-router 配置](https://docs.sentry.io/platforms/javascript/guides/vue/configuration/integrations/vue-router/)

```
Sentry.init({
  Vue: Vue,
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  tracesSampleRate: 1.0,
  integrations: [
    new Integrations.BrowserTracing({
      // 加这行
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
  ],
  trackComponents: true,
});
```
