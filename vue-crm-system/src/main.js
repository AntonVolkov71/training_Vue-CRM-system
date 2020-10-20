import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import tooltipDirecrtive from '@/direcrtives/tooltip.direcrtive'
import messagePlugin from '@/utils/message.plugin';

import Loader from '@/components/app/Loader.vue';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirecrtive)
Vue.component('Loader', Loader);

const firebaseConfig = {
  apiKey: "AIzaSyAr3mA3gFcHdp8GmFY699r6PPog_9fxSUg",
  authDomain: "vue-crm-17cab.firebaseapp.com",
  databaseURL: "https://vue-crm-17cab.firebaseio.com",
  projectId: "vue-crm-17cab",
  storageBucket: "vue-crm-17cab.appspot.com",
  messagingSenderId: "1043521664722",
  appId: "1:1043521664722:web:4c2a070780e15ccb8c5f0b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
})


