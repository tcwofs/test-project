<template>
  <v-app>
    <Drawerbar />
    <v-main>
      <v-container fluid fill-height class="justify-center">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Drawerbar from '@/components/Drawerbar';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: { Drawerbar },
  created() {
    this.dataDownload();
  },
  methods: {
    ...mapActions({
      dataDownload: 'global/dataDownload'
    })
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

#app {
  background-color: transparent;
  background-image: linear-gradient(
    to bottom right,
    #9c7fa6bb,
    #dc6b56bb,
    #e1a854bb
  );
}

.no-background-hover::before {
  background-color: transparent !important;
}

.no-background {
  background-color: transparent !important;
}

.v-card {
  background-color: #fbe9c1 !important;
  border-color: #39363a !important;
}
</style>
