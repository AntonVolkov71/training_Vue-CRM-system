<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'Amount'|localize}}</th>
        <th>{{'Date'|localize}}</th>
        <th>{{'Category'|localize}}</th>
        <th>{{'Type'|localize}}</th>
        <th>{{'Open'|localize}}</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="({ id, amount, date, categoryName, typeText,typeClass }, idx) of records"
        :key="id"
      >
        <td>{{ idx + 1 }}</td>
        <td>{{ amount | currency("RUB") }}</td>
        <td>{{ date | date("datetime") }}</td>
        <td>{{ categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[typeClass]">{{ typeText }}</span>
        </td>
        <td>
          <button
          class="btn-small btn"
          @click="$router.push(`/detail/${id}`)"
            v-tooltip="'OpenRecord'"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
};
</script>
