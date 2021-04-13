<template>
  <v-navigation-drawer
    v-if="isAuthorized"
    v-model="drawerLocal"
    :clipped="false"
    color="primary"
    app
  >
    <v-list rounded>
      <div v-if="['loading', 'error'].includes(getDataStatus)">
        <v-list-item
          v-if="getDataStatus === 'loading'"
          class="align-center justify-center"
        >
          <v-progress-circular
            v-if="getDataStatus === 'loading'"
            :size="100"
            :width="7"
            color="secondary"
            indeterminate
          />
        </v-list-item>
        <v-list-item v-else-if="getDataStatus === 'error'">
          <row>
            <v-col cols="12">
              <v-icon :size="200" color="secondary"> mdi-close </v-icon>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn rounded color="secondary" large @click="dataDownload()">
                <div class="primary--text">Retry</div>
              </v-btn>
            </v-col>
          </row>
        </v-list-item>
      </div>

      <div v-else>
        <v-list-item
          id="add-button"
          class="justify-center"
          color="secondary"
          @click="addNewPost"
        >
          <v-icon color="secondary" size="36">mdi-plus</v-icon>
        </v-list-item>

        <v-list-item-group v-model="selectedItem" color="secondary" dark>
          <v-list-item
            v-for="card in getUserData"
            :key="card.id"
            :to="`/post/${card.id}`"
          >
            <v-list-item-icon>
              <v-icon> {{ getIcon(card.weather[0].icon) }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{
                  `${convertDateWithTime(card.dt)}, ${card.temp.toFixed()}°C`
                }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import weatherMixin from '@/helpers/weatherMixin';

export default {
  name: 'Drawerbar',
  mixins: [weatherMixin],
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    getName: {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({
    selectedItem: null
  }),
  computed: {
    ...mapGetters({
      getDataStatus: 'data/getDataStatus',
      getUserData: 'user/getUserData',
      getUser: 'user/getUser'
    }),
    isAuthorized() {
      return !!this.getUser;
    },
    drawerLocal: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit('update:drawer', value);
      }
    }
  },
  methods: {
    ...mapActions({
      dataDownload: 'data/dataDownload',
      addNewPost: 'user/addNewPost'
    })
  }
};
</script>

<style lang="scss">
#add-button {
  border: #fbe9c1 dashed 2px;
}
</style>
