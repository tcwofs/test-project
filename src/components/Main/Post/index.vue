<template>
  <div>
    <v-row
      v-if="!!post"
      dense
      class="mx-1"
      :class="[
        `max-width${
          ['xs', 'sm', 'md'].includes($vuetify.breakpoint.name) ? '-mobile' : ''
        }`
      ]"
    >
      <v-col cols="12" class="d-flex">
        <v-card width="100%">
          <v-card-text>
            <div>{{ convertDateWithTime(post.dt) }}</div>
            <v-row dense class="my-2" align="center">
              <v-col cols="4" class="d-flex align-center">
                <v-icon size="70">
                  {{ getIcon(post.weather[0].icon) }}
                </v-icon>
                <div class="ml-2 display-1 text--primary text-right">
                  {{ `${post.temp.toFixed()}°C,` }}
                  <br />
                  {{ `feels like ${post.feels_like.toFixed()}°C` }}
                </div>
              </v-col>
              <v-col cols="8">
                <div class="ml-2 display-1 text--primary text-right">
                  {{ post.weather[0].main }}
                </div>
                <p class="text-right">
                  {{ post.weather[0].description }}
                </p>
                <p class="text-right">
                  <v-icon> mdi-gauge </v-icon>
                  {{ post.pressure }}
                  <v-icon> mdi-water-outline </v-icon>
                  {{ `${post.humidity}%` }}
                  <v-icon> mdi-weather-sunny-alert </v-icon>
                  {{ post.uvi }}
                </p>
                <p class="text-right">
                  <v-icon> mdi-cloud </v-icon>
                  {{ `${post.clouds}%` }}
                  <v-icon> mdi-weather-cloudy-arrow-right </v-icon>
                  {{ `${post.wind_speed}%` }}
                  <v-icon> mdi-windsock </v-icon>
                  {{ `${post.wind_deg}%` }}
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="detail in post.randomDetails"
        :key="detail.id"
        cols="12"
        sm="6"
        md="3"
        class="d-flex"
      >
        <Tile :detail="detail" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Tile from './Tile';
import weatherMixin from '@/helpers/weatherMixin';

export default {
  name: 'Post',
  components: { Tile },
  mixins: [weatherMixin],
  data: () => ({
    post: null
  }),
  computed: {
    ...mapGetters({
      getUserData: 'user/getUserData'
    })
  },
  watch: {
    '$route.path': function () {
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    ...mapActions({
      getPost: 'user/getPost'
    }),
    async loadData() {
      this.post = (await this.getPost(this.$route.params.id))[0];
    }
  }
};
</script>

<style></style>
