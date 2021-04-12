import Axios from 'axios';
import { getRandomInt } from '@/helpers';

const http = Axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
});

export default {
  namespaced: true,
  state: {
    user: null,
    data: null,
    loading: false,
    error: false,
    userData: [],
    userRects: []
  },
  getters: {
    getUser: (state) => state.user,
    getDataDaily: (state) => state.data.daily,
    getDataHourly: (state) => state.data.hourly,
    getUserData: (state) => state.userData,
    getUserRects: (state) => state.userRects,
    getDataStatus: (state) =>
      state.loading ? 'loading' : state.error ? 'error' : 'done'
  },
  mutations: {
    /**
     * Updates a specific property in the store
     * @param {object} state The store's state
     * @param {object} data An object containing the property and value
     */
    updateProperty: (state, data) => (state[data.property] = data.value)
  },
  actions: {
    enter({ commit }, data) {
      return new Promise((resolve) => {
        const user = {
          ...data,
          token: 'asd',
          firstName: data.firstName ?? 'Test',
          lastName: data.lastName ?? 'User'
        };

        commit('updateProperty', {
          property: 'user',
          value: user
        });

        localStorage.setItem('user', JSON.stringify(user));

        setTimeout(() => {
          resolve(true);
        }, 2000);
      });
    },
    logout({ commit }) {
      commit('updateProperty', {
        property: 'user',
        value: null
      });
    },
    dataDownload: async ({ state, commit }) => {
      try {
        state.loading = true;
        const { data } = await http({
          method: 'get',
          url: '/onecall',
          params: {
            units: 'metric',
            lat: '49.988358',
            lon: '36.232845',
            exclude: 'current,minutely',
            appid: process.env.VUE_APP_OPEN_WEATHER_KEY
          }
        });

        await commit('updateProperty', {
          property: 'data',
          value: data
        });
      } catch (error) {
        state.error = true;
        console.error(error);
      } finally {
        state.loading = false;
      }
    },
    userDataDownload: ({ commit }) => {
      commit('updateProperty', {
        property: 'userData',
        value: JSON.parse(localStorage.getItem('userData')) ?? []
      });
      commit('updateProperty', {
        property: 'user',
        value: JSON.parse(localStorage.getItem('user')) ?? null
      });
    },
    addNewEntry: ({ commit, getters }) => {
      const userDataUpdated = [
        getters.getDataHourly[getRandomInt(getters.getDataHourly.length)],
        ...getters.getUserData
      ];

      commit('updateProperty', {
        property: 'userData',
        value: userDataUpdated
      });
      localStorage.setItem('userData', JSON.stringify(userDataUpdated));
    }
  }
};
