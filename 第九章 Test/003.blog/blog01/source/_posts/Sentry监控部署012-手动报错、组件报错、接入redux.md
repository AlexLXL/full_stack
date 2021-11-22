---
title: Sentry监控部署012-手动报错、组件报错、接入redux
date: 2021-11-22 20:14:59
categories:  
- [linux, Sentry]  
tags:  
- linux
- Sentry
---

# Sentry 实战

## 手动上报错误

- `Sentry` 的 `SDK` 会自动上报错误、未捕获的异常和 `unhandled rejections` 以及其他类型的错误。

- 对于未捕获的异常，我们可以手动上报。 [官方文档](https://docs.sentry.io/platforms/javascript/guides/react/usage/)

  ```js
  import * as Sentry from "@sentry/react";

  try {
    aFunctionThatMightFail();
  } catch (err) {
    Sentry.captureException(err);
  }
  ```

- 我们同样可以在 `Sentry管理界面 -> Issues` 中查看手动上报的异常

- 另外我们还可以手动上报一些纯文本信息

  ```js
  Sentry.captureMessage("Something went wrong");
  ```

## 设置上报等级

- 我们可以对上报的信息定义等级，主要包括:

  ```ts
  export declare enum Severity {
    Fatal = "fatal",
    Error = "error",
    Warning = "warning",
    Log = "log",
    Info = "info",
    Debug = "debug",
    Critical = "critical"
  }
  ```

- 手动上报错误定义 `level`

  ```ts
  try {
    aFunctionThatMightFail();
  } catch (err) {
    Sentry.captureException(err, {
      level: Sentry.Severity.Warning,
    });
  }
  ```

- 手动上报纯文本定义 `level`

  ```ts
  Sentry.captureMessage("this is a debug message", Sentry.Severity.Warning);
  ```

- 定义一个范围，在范围内容统一定义 `level`

  ```ts
  Sentry.configureScope(function(scope) {
    scope.setLevel(Sentry.Severity.Warning);
    aFunctionThatMightFail();
    bFunctionThatMightFail();
  });
  ```

## `Sentry`错误边界组件

`Sentry`提供了错误边界组件，当 `react` 组件发生错误，可以上报相关信息

- 使用 `Sentry.ErrorBoundary` 组件  

  ```jsx
  // index.js
  const App = () => {
    return (
      <>
        { error && new Error('error') }
        <button onClick={() => setError(true)}>set error</button>
      </>
    );
  }
  const WithSentryErrorBoundaryApp = () => {
    return (
      <Sentry.ErrorBoundary fallback={<div>error boundary error</div>} showDialog>
        <App />
      </Sentry.ErrorBoundary>
    );
  }

  ReactDOM.render(
    <WithSentryApp />,
    document.getElementById('root')
  );
  ```

  - 点击按钮，页面会展示 `fallback` 内容，并且弹出反馈弹窗，向 `Sentry` 提交反馈，反馈内容可以在 `Sentry管理界面` 的 `User Feedback` 中查看
  - 而在 `Sentry管理界面` 的 `Issues` 中，我们可以看到上报了名称为 `Error` 错误，他的描述是以 `React ErrorBoundary Error` 开头的

    ![react-errorBoundary-error](https://lixuelang.com/test/Sentry/pic/012/react-errorBoundary-error.jpg)

- 也可以使用Sentry提供的高阶组件 `withErrorBoundary` 实现同样效果

  ```jsx
  const WithSentryApp = Sentry.withErrorBoundary(App, { fallback: <p>an error has occurred</p>, showDialog: true });
  ```

- 更多信息参考: [官方文档](https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/)

## 集成 `redux`

- 安装 `redux`

  ```bash
  npm i redux -S
  ```

- 集成 `redux`

  通过 `sentryReduxEnhancer` 中的 `actionTransformer` 和 `stateTransformer` 过滤不需要在sentry管理界面中展示的 `action` 和 `state`

  ```ts
  // index.js
  import React from 'react';
  import ReactDOM from 'react-dom';

  import * as Sentry from '@sentry/react';
  import { Integrations } from '@sentry/tracing';

  import { createStore } from 'redux';

  Sentry.init({
    dsn: "http://c96e4ce910524463a4e6a655a7eb054f@10.10.8.46:9000/3",
    environment: 'localhost',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    release: '0.0.1',
  });

  const initialState = {
    a: 'init',
    b: 'init',
    c: 'init',
  };

  const rootReducer = (state = initialState, action) => {
    if (action.type === 'SET_A') {
      return {
        ...state,
        a: 'a_changed',
      }
    }
    if (action.type === 'SET_B') {
      return {
        ...state,
        b: 'b_changed',
      }
    }
    if (action.type === 'SET_C') {
      return {
        ...state,
        c: 'c_changed',
      }
    }
    return state;
  }

  const sentryReduxEnhancer = Sentry.createReduxEnhancer({
    actionTransformer: action => {
      if (action.type === 'SET_B') {
        return null;
      }
      return action;
    },
    stateTransformer: state => {
      return {
        ...state,
        c: null,
      }
    },
  });

  const store = createStore(
    rootReducer,
    sentryReduxEnhancer,
  );

  const App = () => {
    function fn() {
      console.log(window.a.b);
      // axios.get('/dddd').catch(() => {});
    }
    return (
      <>
        <button onClick={() => store.dispatch({ type: 'SET_A' })}>dispatch SET_A</button>
        <button onClick={() => store.dispatch({ type: 'SET_B' })}>dispatch SET_B</button>
        <button onClick={() => store.dispatch({ type: 'SET_C' })}>dispatch SET_C</button>
        <button onClick={fn}>Break the world</button>
      </>
    );
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  ```

- 访问 `localhost:9000`，有4个按钮 `dispatch SET_A`、`dispatch SET_B`、`dispatch SET_C`、`Break the world`，依次点击，则报错

- 在 `Sentry管理界面 -> issues`菜单中找到刚才错误上报详情

- 在 `BREADCRUMBS` 中，可以看到有三条 `redux` 相关的 `CATEGORY`，分别表示 `redux init`、`dispatch SET_A`、`dispatch SET_C`。`dispatch SET_B`没有，是因为在 `actionTransformer` 中将其过滤掉了

  ![redux](https://lixuelang.com/test/Sentry/pic/012/redux.jpg)

- 页面往下翻，可以看到 `REDIX.STATE` 中记录了报错前最后的 `state`，有 `a`、`b` 值，但没有 `c` 的值，是因为在 `stateTransformer` 中过滤了 `c` 的值

  ![redux-state](https://lixuelang.com/test/Sentry/pic/012/redux-state.jpg)

- [官方文档](https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/redux/)

## `rrweb` 重播

`rrweb` 是一个开源的 `Web` 会话回放库，它提供易于使用的 `API` 来记录用户的交互并远程回放。

可以记录鼠标移动轨迹、交互动作和页面变化，并播放。

`@sentry/rrweb` 是 `rrweb` 的 `sentry` 插件。

- 安装

  ```bash
  npm install -S @sentry/rrweb rrweb
  ```

- 使用

  ```js
  import SentryRRWeb from '@sentry/rrweb';

  Sentry.init({
    integrations: [
      new SentryRRWeb({
        checkoutEveryNms: 10 * 1000, // 每10秒重新制作快照
        checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
        maskAllInputs: false, // 将所有输入内容记录为 *
      }),
    ],
  });
  ```

- 在页面中点击各个按钮，直到报错，在 `Sentry管理界面 -> Isseues` 中找到相关错误详情，在页面最底部有一个 `REPLAY` 模块，点击播放可以回放错误发生前的一系列操作

- 查看效果

  ![rrweb](https://lixuelang.com/test/Sentry/pic/012/sentry-rrweb.gif)
