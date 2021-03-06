import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import ECharts from 'echarts'
import VueECharts from 'vue-echarts' 

import './plugins/vcharts'
import './style/index.css'
Vue.component('v-chart', VueECharts)

Vue.config.productionTip = false;
Vue.prototype.$echarts = ECharts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
