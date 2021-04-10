<template>
  <div v-if="$route.path !== '/auth'">
    <v-navigation-drawer v-model="drawer" :clipped="clipped" app dark>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      flat
      :clipped-left="clipped"
      style="background-color: transparent"
    >
      <v-btn
        class="no-background-hover"
        icon
        color="primary"
        :ripple="false"
        depressed
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer />
      <div v-if="!!getName()" class="mr-2 text--primary">
        {{ `Hello, ${getName()}` }}
      </div>
      <div class="d-none d-md-flex">
        <v-btn
          v-if="!getName()"
          rounded
          class="ml-1"
          color="primary"
          outlined
          :to="{ path: '/auth', props: { type: 'login' } }"
        >
          Login
        </v-btn>
        <v-btn
          v-if="!getName()"
          rounded
          class="ml-1"
          color="primary"
          :to="{ path: '/auth', props: { type: 'register' } }"
        >
          Register
        </v-btn>
        <v-btn
          v-if="!!getName()"
          rounded
          class="ml-1"
          color="primary"
          @click.stop="logout"
        >
          Logout
        </v-btn>
      </div>
      <div class="d-flex d-md-none">
        <v-btn
          v-if="!getName()"
          rounded
          color="primary"
          class="ml-1 no-background-hover"
          :ripple="false"
          icon
          :to="{ path: '/auth', props: { type: 'login' } }"
        >
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
        <v-btn
          v-if="!getName()"
          rounded
          color="primary"
          class="ml-1 no-background-hover"
          :ripple="false"
          icon
          :to="{ path: '/auth', props: { type: 'register' } }"
        >
          <v-icon>mdi-clipboard-edit-outline</v-icon>
        </v-btn>
        <v-btn
          v-if="!!getName()"
          rounded
          color="primary"
          class="ml-1 no-background-hover"
          :ripple="false"
          icon
          @click.stop="logout"
        >
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Drawerbar',
  data: () => ({
    drawer: false,
    clipped: false
  }),
  methods: {
    getName: () => JSON.parse(localStorage.getItem('user'))?.login,
    logout() {
      localStorage.removeItem('user');
      this.$router.push(
        '/',
        () => {},
        () => this.$router.go(0)
      );

      // this.$router.push('/logout');
    }
  }
};
</script>

<style></style>
