<template>
  <v-row dense>
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ErrorLoading',
  computed: {
    ...mapGetters({
      getDataStatus: 'data/getDataStatus'
    })
  },
  methods: {
    ...mapActions({
      dataDownload: 'data/dataDownload'
    })
  }
};
</script>

<style></style>
