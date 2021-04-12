<template>
  <v-card width="100%">
    <v-card-text>
      <div>{{ convertDate(card.dt) }}</div>
      <v-row dense class="my-2" align="center">
        <v-col cols="4">
          <v-icon size="70">
            {{ getIcon(card.weather[0].icon) }}
          </v-icon>
        </v-col>
        <v-col cols="8">
          <div class="ml-2 display-1 text--primary text-right">
            {{ card.weather[0].main }}
          </div>
          <p class="text-right">
            {{ `${card.weather[0].description}, ${card.temp.day.toFixed()}°C` }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    convertDate(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000);

      const day = `0${date.getDate()}`.substr(-2);
      const month = `0${+date.getMonth() + 1}`.substr(-2);
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
    getIcon(iconCode) {
      switch (iconCode) {
        case '01d':
        case '01n':
          return 'mdi-weather-sunny';
        case '02d':
        case '02n':
          return 'mdi-weather-partly-cloudy';
        case '03n':
        case '03d':
          return 'mdi-weather-cloudy';
        case '04d':
        case '04n':
          return 'mdi-cloud';
        case '09d':
        case '09n':
          return 'mdi-weather-rainy';
        case '10d':
        case '10n':
          return 'mdi-weather-pouring';
        case '11d':
        case '11n':
          return 'mdi-weather-lightning-rainy';
        case '13d':
        case '13n':
          return 'mdi-weather-snowy';
        case '50d':
        case '50n':
          return 'mdi-weather-fog';
      }
    }
  }
};
</script>
