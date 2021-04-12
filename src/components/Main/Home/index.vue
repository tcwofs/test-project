<template>
  <div>
    <v-row v-if="['loading', 'error'].includes(getDataStatus)" dense>
      <v-col cols="12">
        <v-progress-circular
          v-if="getDataStatus === 'loading'"
          :size="200"
          :width="7"
          color="primary"
          indeterminate
        />
        <row v-else-if="getDataStatus === 'error'">
          <v-col cols="12">
            <v-icon :size="200" color="primary"> mdi-close </v-icon>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn rounded color="primary" large @click="dataDownload()">
              Retry
            </v-btn>
          </v-col>
        </row>
      </v-col>
    </v-row>
    <v-row
      v-else
      dense
      class="mx-1"
      :class="[
        `max-width${
          ['xs', 'sm', 'md'].includes($vuetify.breakpoint.name) ? '-mobile' : ''
        }`
      ]"
    >
      <v-col
        v-for="card in getData.daily"
        :key="card.dt"
        cols="12"
        sm="6"
        md="3"
        class="d-flex"
      >
        <Tile :card="card" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Tile from './Tile';

export default {
  name: 'Home',
  components: { Tile },
  computed: {
    ...mapGetters({
      getDataStatus: 'global/getDataStatus',
      getData: 'global/getData'
    })
  },
  methods: {
    ...mapActions({
      dataDownload: 'global/dataDownload'
    })
  }
};
</script>

<style lang="scss">
.max-width {
  max-width: 1000px;
}

.max-width-mobile {
  max-width: 95vw;
}
</style>
