<template>
  <v-card max-width="500px" :min-width="getWidth" outlined>
    <v-tabs v-model="tab" background-color="transparent" fixed-tabs hide-slider>
      <v-tab v-for="item in items" :key="item" :ripple="false">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="no-background">
      <v-tab-item>
        <Login />
      </v-tab-item>
      <v-tab-item>
        <Register />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

export default {
  name: 'Auth',
  components: { Register, Login },
  props: {
    type: {
      type: String,
      default: 'login'
    }
  },
  data: () => ({
    tab: null,
    items: ['Login', 'Register']
  }),
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    getWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%';
        case 'sm':
          return '75%';
        case 'md':
          return '50%';
        case 'lg':
          return '30%';
        case 'xl':
          return '30%';
        default:
          '100%';
      }
    }
  },
  created() {
    this.type === 'login' ? (this.tab = 0) : (this.tab = 1);
  }
};
</script>

<style lang="scss" scoped></style>
