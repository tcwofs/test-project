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
        v-for="card in getUserData"
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
  name: 'Dashboard',
  components: { ErrorLoading, Tile },
  computed: {
    ...mapGetters({
      getDataStatus: 'global/getDataStatus',
      getUserData: 'global/getUserData'
    })
  }
  name: 'Home'
};
</script>

<style></style>
