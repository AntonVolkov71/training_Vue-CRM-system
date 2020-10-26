<template>
  <div>
    <div class="page-title">
      <h3>{{ "Menu_Planning" | localize }}</h3>
      <h4>{{ info.bill | currency }}</h4>
    </div>

    <Loader v-if="isLoading" />
    <p class="center" v-else-if="!categories.length">
      {{ "NoCategories" | localize }}.
      <router-link to="/categories">{{ "AddFirst" | localize }}</router-link>
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency }} {{ "Of" | localize }} {{ cat.limit | currency }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPersent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import currencyFilter from "../filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "Planning",
  metaInfo() {
    return {
      title: this.$title(`Menu_Planning`)
    };
  },
  data: () => ({
    categories: [],
    isLoading: true
  }),
  computed: {
    ...mapGetters(["info"])
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);

      const persent = (100 * spend) / cat.limit;

      const progressPersent = persent > 100 ? 100 : persent;
      const progressColor = persent < 60 ? "green" : persent < 100 ? "yellow" : "red";

      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? localizeFilter("MoreThan") : localizeFilter("Stayed")
      } ${currencyFilter(Math.abs(tooltipValue))}`;
      return {
        ...cat,
        progressPersent,
        progressColor,
        spend,
        tooltip
      };
    });
    this.isLoading = false;
  }
};
</script>
