<template>
  <div>
    post {{ $route.params.id }} <br />
    {{ post }}
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Post',
  data: () => ({
    post: null
  }),
  async mounted() {
    this.post = await this.getPost(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      getPost: 'user/getPost'
    })
  }
};
</script>

<style></style>
