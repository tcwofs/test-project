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
      <v-col cols="12" sm="6" md="3" class="d-flex">
        <v-card width="100%" @click="addNewPost">
          <v-card-text style="height: 100%" class="d-flex align-center">
            <v-row dense align="center">
              <v-col cols="4">
                <v-icon size="70"> mdi-plus </v-icon>
              </v-col>
              <v-col cols="8">
                <div class="ml-2 display-1 text--primary text-right">
                  Add new
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="card in getUserData"
        :key="card.id"
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
  },
  methods: {
    ...mapActions({
      addNewPost: 'global/addNewPost'
    })
  }
};
</script>

<style></style>
