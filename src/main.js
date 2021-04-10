import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from '@/App';
import './registerServiceWorker';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import '@babel/polyfill';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
