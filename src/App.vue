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

export default {
  name: 'App',
  components: { Drawerbar }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.no-background-hover::before {
  background-color: transparent !important;
}

* {
  font-family: 'Roboto', sans-serif;
}
</style>
