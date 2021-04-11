<template>
  <div class="pa-5">
    <form @submit.prevent="submit">
      <v-text-field
        v-model="user.firstName"
        :error-messages="nameErrors('firstName')"
        label="First name*"
        color="primary"
        counter="128"
        outlined
        dense
        @input="$v.user.firstName.$touch()"
        @blur="$v.user.firstName.$touch()"
      />
      <v-text-field
        v-model="user.lastName"
        :error-messages="nameErrors('lastName')"
        label="Last name*"
        counter="128"
        color="primary"
        outlined
        dense
        @input="$v.user.lastName.$touch()"
        @blur="$v.user.lastName.$touch()"
      />
      <v-text-field
        v-model.trim="user.email"
        :error-messages="emailErrors"
        label="Email*"
        color="primary"
        outlined
        dense
        @input="$v.user.email.$touch()"
        @blur="$v.user.email.$touch()"
      />
      <v-text-field
        v-model.trim="user.phone"
        :error-messages="phoneErrors"
        label="Phone"
        type="n"
        color="primary"
        outlined
        dense
        @input="$v.user.phone.$touch()"
        @blur="$v.user.phone.$touch()"
      />

      <v-row no-gutters class="px-0 align-center">
        <v-col cols="12" sm="6" class="pr-1">
          <v-text-field
            v-model="user.password"
            label="Password*"
            color="primary"
            outlined
            dense
            :error-messages="passwordErrors"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            @input="$v.user.password.$touch()"
            @blur="$v.user.password.$touch()"
          />
        </v-col>
        <v-col cols="12" sm="6" class="pl-1">
          <v-text-field
            v-model="user.confirmPassword"
            label="Confirm password*"
            color="primary"
            outlined
            dense
            :error-messages="confirmPasswordErrors"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            @input="$v.user.confirmPassword.$touch()"
            @blur="$v.user.confirmPassword.$touch()"
          />
        </v-col>
      </v-row>

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
          Register
        </v-btn>
      </v-row>
    </form>
  </div>
</template>

<script>
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  alpha,
  numeric,
  email
  // sameAs
} from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'Register',
  data: () => ({
    user: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    show: false,
    loading: false,
    error: false,
    timeout: null
  }),
  validations: {
    user: {
      firstName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(128),
        alpha
      },
      lastName: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(128)
      },
      email: {
        required: requiredIf(function (user) {
          return !user.phone;
        }),
        email
      },
      phone: {
        required: requiredIf(function (user) {
          return !user.email;
        }),
        numeric
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        mustBeEqualToPassword(value) {
          return value === this.user.password;
        }
      }
    }
  },
  computed: {
    emailErrors() {
      if (!this.$v.user.email.$dirty) return '';
      if (!this.$v.user.email.email) return 'Please enter correct email.';

      return !this.$v.user.email.required
        ? 'Please enter correct email or phone.'
        : '';
    },
    phoneErrors() {
      if (!this.$v.user.phone.$dirty) return '';
      if (!this.$v.user.phone.numeric) return 'Field must conatin only numbers';

      return !this.$v.user.phone.required
        ? 'Please enter correct email or phone.'
        : '';
    },
    passwordErrors() {
      if (!this.$v.user.password.$dirty) return '';

      if (!this.$v.user.password.minLength)
        return `Min length of the password is ${this.$v.user.password.$params.minLength.min}`;
      return !this.$v.user.password.required ? 'Please enter password.' : '';
    },
    confirmPasswordErrors() {
      if (!this.$v.user.confirmPassword.$dirty) return '';

      return !this.$v.user.confirmPassword.mustBeEqualToPassword
        ? 'Passwords must be equal.'
        : '';
    }
  },
  methods: {
    ...mapActions({
      enter: 'global/enter'
    }),
    nameErrors(type) {
      if (!this.$v.user[type] || !this.$v.user[type].$dirty) return '';

      if (this.$v.user[type].$invalid) {
        if (!this.$v.user[type].required)
          return 'This field must not be empty.';
        if (!this.$v.user[type].minLength)
          return `Min length of the field is ${this.$v.user[type].$params.minLength.min}`;
        if (!this.$v.user[type].maxLength)
          return `Max length of the field is ${this.$v.user[type].$params.maxLength.max}`;
        if (!this.$v.user[type].alpha) return 'Field must conatin only letters';
      }
    },
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
