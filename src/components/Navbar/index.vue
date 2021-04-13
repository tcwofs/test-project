<template>
  <div v-if="$route.path !== '/auth'">
    <Drawerbar :drawer.sync="drawer" />
    <Commentbar :comment.sync="comment" />
    <v-app-bar
      fixed
      app
      flat
      dense
      :clipped-left="false"
      :clipped-right="false"
      :class="[`${appBarClass}-background`]"
    >
      <v-btn
        v-if="!!getName()"
        class="no-background-hover"
        icon
        color="primary"
        :ripple="false"
        depressed
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn
        v-if="!!getName() && ['post', 'details'].includes($route.name)"
        class="no-background-hover"
        icon
        color="primary"
        :ripple="false"
        depressed
        @click.stop="$router.go(-1)"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer />

      <v-tooltip v-if="!!getName()" bottom transition="fade-transition">
        <template #activator="{ on }">
          <div
            class="mr-2 text--primary text-caption text-sm-body-1 text-truncate"
            v-on="on"
          >
            {{ `Hello, ${getName()}` }}
          </div>
        </template>
        <span> {{ `Hello, ${getName()}` }}</span>
      </v-tooltip>

      <div class="d-none d-md-flex">
        <v-btn
          v-if="$route.path !== '/'"
          rounded
          class="ml-1"
          color="primary"
          to="/"
        >
          Home
        </v-btn>
        <v-btn
          v-if="!!getName() && $route.path !== '/dashboard'"
          rounded
          class="ml-1"
          color="primary"
          to="/dashboard"
        >
          Dashboard
        </v-btn>
        <v-btn
          v-if="!getName()"
          rounded
          class="ml-1"
          color="primary"
          outlined
          :to="{ name: 'auth', params: { type: 'login' } }"
        >
          Login
        </v-btn>
        <v-btn
          v-if="!getName()"
          rounded
          class="ml-1"
          color="primary"
          :to="{ name: 'auth', params: { type: 'register' } }"
        >
          Register
        </v-btn>
        <v-btn
          v-if="!!getName()"
          outlined
          rounded
          class="ml-1"
          color="primary"
          @click.stop="logout"
        >
          Logout
        </v-btn>
      </div>
      <div class="d-flex d-md-none">
        <v-tooltip
          v-if="$route.path !== '/'"
          bottom
          transition="fade-transition"
        >
          <template #activator="{ on }">
            <v-btn
              color="primary"
              class="ml-1 no-background-hover"
              :ripple="false"
              icon
              to="/"
              v-on="on"
            >
              <v-icon> mdi-home-outline </v-icon>
            </v-btn>
          </template>
          <span>Home</span>
        </v-tooltip>
        <v-tooltip
          v-if="!!getName() && $route.path !== '/dashboard'"
          bottom
          transition="fade-transition"
        >
          <template #activator="{ on }">
            <v-btn
              color="primary"
              class="ml-1 no-background-hover"
              :ripple="false"
              icon
              to="/dashboard"
              v-on="on"
            >
              <v-icon> mdi-view-dashboard-outline </v-icon>
            </v-btn>
          </template>
          <span> Dashboard</span>
        </v-tooltip>
        <v-tooltip v-if="!getName()" bottom transition="fade-transition">
          <template #activator="{ on }">
            <v-btn
              color="primary"
              class="ml-1 no-background-hover"
              :ripple="false"
              icon
              :to="{ path: '/auth', name: 'auth', params: { type: 'login' } }"
              v-on="on"
            >
              <v-icon>mdi-login-variant</v-icon>
            </v-btn>
          </template>
          <span>Login</span>
        </v-tooltip>
        <v-tooltip v-if="!getName()" bottom transition="fade-transition">
          <template #activator="{ on }">
            <v-btn
              color="primary"
              class="ml-1 no-background-hover"
              :ripple="false"
              icon
              :to="{
                path: '/auth',
                name: 'auth',
                params: { type: 'register' }
              }"
              v-on="on"
            >
              <v-icon>mdi-clipboard-edit-outline</v-icon>
            </v-btn>
          </template>
          <span>Register</span>
        </v-tooltip>
        <v-tooltip v-if="!!getName()" bottom transition="fade-transition">
          <template #activator="{ on }">
            <v-btn
              v-if="!!getName()"
              color="primary"
              class="ml-1 no-background-hover"
              :ripple="false"
              icon
              v-on="on"
              @click.stop="logout"
            >
              <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
          </template>
          <span>Logout</span>
        </v-tooltip>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Drawerbar from './Drawerbar';
import Commentbar from './Commentbar';

export default {
  name: 'Navbar',
  components: { Drawerbar, Commentbar },
  data: () => ({
    drawer: !!+localStorage.getItem('drawer'),
    comment: true,
    clipped: false,
    appBarClass: 'no'
  }),
  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    })
  },
  watch: {
    drawer(newStatus) {
      localStorage.setItem('drawer', +newStatus);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    ...mapActions({
      removeUser: 'auth/logout'
    }),
    onScroll() {
      this.appBarClass = window.pageYOffset > 64 ? 'white' : 'no';
    },
    getName() {
      const user = this.getUser;
      if (!user) return false;
      return `${user?.firstName} ${user?.lastName}`;
    },
    logout() {
      this.removeUser();
      this.$router.push(
        '/',
        () => {},
        () => this.$router.go(0)
      );
    }
  }
};
</script>

<style lang="scss">
.white-background {
  background-color: rgba(255, 255, 255, 0.7) !important;
}

.no-background {
  background-color: transparent !important;
}
</style>
