import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    Vue,
    dsn: "http://b891ad75fd474b078846edef012ffe8b@localhost:9000/2",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    logErrors: true,
    release: 'pro@1.0.1'
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
