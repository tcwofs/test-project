<template>
  <div v-if="$route.path !== '/auth'">
    <v-navigation-drawer
      v-if="!!getName()"
      v-model="drawer"
      :clipped="clipped"
      app
      dark
    >
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      flat
      dense
      :clipped-left="clipped"
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
      <v-spacer />
      <div v-if="!!getName()" class="mr-2 text--primary">
        {{ `Hello, ${getName()}` }}
      </div>
      <div class="d-none d-md-flex">
        <v-btn
          v-if="!!getName() || $route.path !== '/'"
          rounded
          class="ml-1"
          color="primary"
          :to="{ path: $route.path === '/' ? '/dashboard' : '/' }"
        >
          {{ `${$route.path === '/' ? 'Dashboard' : 'Home'}` }}
        </v-btn>
        <v-btn
          v-if="!getName()"
          rounded
          class="ml-1"
          color="primary"
          outlined
          :to="{ path: '/auth', name: 'auth', params: { type: 'login' } }"
        >
          Login
        </v-btn>
        <v-btn
          v-if="!getName()"
          rounded
          class="ml-1"
          color="primary"
          :to="{ path: '/auth', name: 'auth', params: { type: 'register' } }"
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
          v-if="!!getName() || $route.path !== '/'"
          bottom
          transition="fade-transition"
        >
          <template #activator="{ on }">
            <v-btn
              color="primary"
              class="ml-1 no-background-hover"
              :ripple="false"
              icon
              :to="{ path: $route.path === '/' ? '/dashboard' : '/' }"
              v-on="on"
            >
              <v-icon>
                {{
                  `${
                    $route.path === '/'
                      ? 'mdi-view-dashboard-outline'
                      : 'mdi-home-outline'
                  }`
                }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ `${$route.path === '/' ? 'Dashboard' : 'Home'}` }}</span>
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
export default {
  name: 'Drawerbar',
  data: () => ({
    drawer: !!+localStorage.getItem('drawer'),
    clipped: false,
    appBarClass: 'no'
  }),
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
    onScroll() {
      this.appBarClass = window.pageYOffset > 64 ? 'white' : 'no';
    },
    getName: () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return false;
      return `${user?.firstName} ${user?.lastName}`;
    },
    logout() {
      localStorage.removeItem('user');
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
