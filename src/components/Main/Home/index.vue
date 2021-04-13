<template>
  <div>
    <error-loading v-if="['loading', 'error'].includes(getDataStatus)" />
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
        v-for="card in getDataDaily"
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
import { mapGetters } from 'vuex';
import ErrorLoading from '../ErrorLoading';
import Tile from './Tile';

export default {
  name: 'Home',
  components: { Tile, ErrorLoading },
  computed: {
    ...mapGetters({
      getDataStatus: 'data/getDataStatus',
      getDataDaily: 'data/getDataDaily'
    })
  }
};
</script>

<style lang="scss">
.max-width {
  max-width: 1000px;
  width: 100vw;
}

.max-width-mobile {
  max-width: 95vw;
  width: 100vw;
}
</style>
