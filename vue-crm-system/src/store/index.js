import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import info from './info';
import category from './category';
import record from './record'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      // const key = process.env.VUE_APP_FIXER;
      // const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=RUB,USD,EUR`);


      const res = await fetch(`https://api.exchangeratesapi.io/latest`);
      const result =  await res.json()

      console.log(result)
      return result

//       base: "EUR"
// date: "2020-10-26"
// rates: Object
// EUR: 1
// RUB: 90.540904
// USD: 1.183565
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, category, record
  },
});
