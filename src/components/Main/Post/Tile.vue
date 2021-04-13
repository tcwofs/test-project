<template>
  <v-card width="100%" :to="`/details/${detail.id}`">
    <v-img
      :src="`https://tile.openweathermap.org/map/wind_new/${detail.url}?appid=${api}`"
      class="secondary"
    />
  </v-card>
</template>

<script>
import weatherMixin from '@/helpers/weatherMixin';

export default {
  name: 'PostTile',
  mixins: [weatherMixin],
  props: {
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    api: () => process.env.VUE_APP_OPEN_WEATHER_KEY
  }
};
</script>
