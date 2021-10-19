import Vue from 'vue'
import App from './App.vue'
import ProgressBar from './components/ProgressBar.vue'
import store from './store/index.js'
import router from "./router"

Vue.config.productionTip = false;

var bar = new Vue(ProgressBar).$mount();
Vue.prototype.$bar = bar;
document.body.appendChild(bar.$el);

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
