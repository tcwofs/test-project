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
import weatherMixin from '@/helpers/weatherMixin';

export default {
  name: 'HomeTile',
  mixins: [weatherMixin],
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
