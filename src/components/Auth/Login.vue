<template>
  <div class="pa-5">
    <form @submit.prevent="submit">
      <v-text-field
        v-model.trim="user.login"
        :error-messages="loginErrors"
        label="Login"
        color="primary"
        outlined
        dense
        @input="$v.user.login.$touch()"
        @blur="$v.user.login.$touch()"
      />
      <v-text-field
        v-model="user.password"
        label="Password"
        color="primary"
        class="mb-2"
        outlined
        dense
        :error-messages="passwordErrors"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        @input="$v.user.password.$touch()"
        @blur="$v.user.password.$touch()"
      />

      <v-row no-gutters class="px-0 align-center">
        <router-link
          to="/"
          class="text--disabled"
          :event="!loading ? 'click' : ''"
          :disabled="loading"
          href="javascript:void(0)"
        >
          Go Back
        </router-link>
        <v-spacer />
        <v-btn
          rounded
          color="primary"
          type="submit"
          :loading="loading"
          :style="{
            'pointer-events': loading ? 'none' : 'auto'
          }"
        >
          Login
        </v-btn>
      </v-row>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    user: {
      login: '',
      password: ''
    },
    show: false,
    loading: false,
    error: false,
    timeout: null
  }),
  validations: {
    user: {
      login: {
        required
      },
      password: {
        required
      }
    }
  },
  computed: {
    loginErrors() {
      if (!this.$v.user.login.$dirty) return '';
      return !this.$v.user.login.required ? 'Please enter correct login.' : '';
    },
    passwordErrors() {
      if (!this.$v.user.password.$dirty) return '';
      return !this.$v.user.password.required
        ? 'Please enter your password.'
        : '';
    }
  },
  methods: {
    ...mapActions({
      enter: 'global/enter'
    }),
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.loading = true;
      this.timeout && clearTimeout(this.timeout);

      try {
        const response = await this.enter(this.user);

        if (response) {
          this.loading = false;
          this.error = false;
          this.$router.push('/dashboard');
        }
      } catch (error) {
        this.loading = false;
        this.error = true;
        this.timeout = setTimeout(() => (this.error = false), 2000);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
