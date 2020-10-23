<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="isLoading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
        v-if="categories.length"
          :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "../components/CategoryEdit";

export default {
  name: "categorires",
  metaInfo() {
    return {
      title: this.$title(`Menu_Categories`)
    };
  },
  data: () => ({
    categories: [],
    isLoading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.isLoading = false;
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories({ id, title, limit }) {
      const idx = this.categories.findIndex((c) => c.id === id);
      this.categories[idx].title = title;
      this.categories[idx].limit = limit;
      this.updateCount++;
    },
  },
};
</script>
