import Vue, { DirectiveOptions } from 'vue';
import 'normalize.css';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugins/element.js';
import '@/permission';
import * as filters from '@/filters';
import * as directives from '@/directives';

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});
// 注册自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
