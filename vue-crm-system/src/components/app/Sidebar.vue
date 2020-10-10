<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
    v-for="({title, url, exact}) in links"
    :key='url'
    tag="li"
    active-class="active"
    :to='url'
    :exact='exact'
    >
      <a href="#" class="waves-effect waves-orange pointer">{{title}}</a>
    </router-link>

     </ul>
</template>
<script>
export default {
  props:['value'],
  data: () => ({
    links: [
      { title: "Счет", url: "/", exact: true },
      { title: "История", url: "/history" },
      { title: "Планирование", url: "/planning" },
      { title: "Новая запись", url: "record" },
      { title: "Категории", url: "categories" },
    ],
  }),
};
</script>
