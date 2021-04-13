<template>
  <v-navigation-drawer
    v-if="$route.path.includes('/details') && isAuthorized"
    v-model="commentLocal"
    right
    permanent
    expand-on-hover
    :clipped="false"
    color="primary"
    app
    :mini-variant.sync="miniVariantSync"
  >
    <v-list rounded>
      <div
        v-if="!miniVariantSync"
        class="d-flex mb-5 justify-center secondary--text text-display-1"
      >
        COMMENTS
      </div>
      <v-divider v-if="!miniVariantSync" />
      <v-list-item
        v-for="(commentary, index) in details"
        :key="index"
        color="secondary"
      >
        <v-list-item-icon>
          <v-icon color="secondary"> mdi-drag-vertical</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="secondary--text">
            {{ `${commentary}` }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { eventBus } from '@/plugins/eventBus';
import weatherMixin from '@/helpers/weatherMixin';

export default {
  name: 'Commentbar',
  mixins: [weatherMixin],
  props: {
    comment: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({ details: null, miniVariantSync: true }),
  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    }),
    isAuthorized() {
      return !!this.getUser;
    },
    commentLocal: {
      get() {
        return this.comment;
      },
      set(value) {
        this.$emit('update:comment', value);
      }
    }
  },
  watch: {
    '$route.path': function () {
      this.loadData();
    }
  },
  mounted() {
    eventBus.$on('comments-update', this.loadData);
    this.loadData();
  },
  beforeDestroy() {
    eventBus.$off();
  },
  methods: {
    ...mapActions({
      getDetail: 'user/getDetail'
    }),
    async loadData() {
      console.log('asd');
      this.details = (await this.getDetail(this.$route.params.id))?.comments;
      console.log(this.details);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-divider {
  border-color: #fbe9c1 !important;
}
</style>
