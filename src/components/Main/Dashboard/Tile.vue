<template>
  <v-card width="100%" :to="`/post/${card.id}`">
    <v-card-text>
      <div>{{ convertDateWithTime(card.dt) }}</div>
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
            {{ `${card.weather[0].description}, ${card.temp.toFixed()}°C` }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import weatherMixin from '@/helpers/weatherMixin';

export default {
  name: 'DashboardTile',
  mixins: [weatherMixin],
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
