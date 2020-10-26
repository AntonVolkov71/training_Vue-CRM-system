<template>
  <div>
    <div class="page-title">
      <h3>{{ "Bill" | localize }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates" />

      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from "../components/HomeBill";
import HomeCurrency from "../components/HomeCurrency";
export default {
  name: "Home",
  metaInfo() {
    return {
      title: this.$title(`Menu_Bill`)
    };
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    const currency = await this.$store.dispatch("fetchCurrency");
    this.currency = this.fixCurrency(currency);

    this.loading = false;
  },
  components: {
    HomeBill,
    HomeCurrency
  },
  methods: {
    fixCurrency(cur) {
      const currency = {};
      currency.rates = { EUR: 1 };
      currency.date = cur.date;
      this.base = cur.base;
      Object.keys(cur.rates).forEach(el => {
        if (el === "USD" || el === "RUB") {
          currency.rates[el] = cur.rates[el];
        }
      });
      return currency;
    },
    async refresh() {
      this.loading = true;
      const currency = await this.$store.dispatch("fetchCurrency");
      this.currency = this.fixCurrency(currency);
      this.loading = false;
    }
  }
};
</script>
