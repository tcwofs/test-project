<template>
  <div class="pa-5">
    <form @submit.prevent="submit">
      <v-text-field
        v-model.trim="login"
        :error-messages="loginErrors"
        label="Логин"
        color="accent"
        outlined
        dense
        @input="$v.login.$touch()"
        @blur="$v.login.$touch()"
      />
      <v-text-field
        v-model="password"
        label="Пароль"
        color="accent"
        class="mb-2"
        outlined
        dense
        :error-messages="passwordErrors"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      />

      <v-row no-gutters class="px-0 align-center">
        <v-spacer />
        <v-btn
          color="primary"
          type="submit"
          :loading="loading"
          :style="{
            'pointer-events': loading ? 'none' : 'auto'
          }"
        >
          Войти
          <v-icon right>mdi-login-variant</v-icon>
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
    login: '',
    password: '',
    show: false,
    loading: false,
    error: false,
    timeout: null
  }),
  validations: {
    login: {
      required
    },
    password: {
      required
    }
  },
  computed: {
    loginErrors() {
      if (!this.$v.login.$dirty) return '';
      return !this.$v.login.required ? 'Укажите корректный логин.' : '';
    },
    passwordErrors() {
      if (!this.$v.password.$dirty) return '';
      return !this.$v.password.required ? 'Укажите пароль.' : '';
    }
  },
  methods: {
    ...mapActions({
      tryToLogin: 'global/login'
    }),
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.loading = true;
      this.timeout && clearTimeout(this.timeout);

      try {
        const response = await this.tryToLogin({
          login: this.login,
          password: this.password
        });

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
