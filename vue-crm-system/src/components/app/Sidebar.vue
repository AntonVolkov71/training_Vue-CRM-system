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
import localizeFilter from '../../filters/localize.filter'
export default {
  props:['value'],
  data: () => ({
    links: [
      { title: localizeFilter("Menu_Bill"), url: "/", exact: true },
      { title: localizeFilter("Menu_History"), url: "/history" },
      { title: localizeFilter("Menu_Planning"), url: "/planning" },
      { title: localizeFilter("Menu_NewRecord"), url: "record" },
      { title: localizeFilter("Menu_Categories"), url: "categories" },
    ],
  }),
};
</script>
