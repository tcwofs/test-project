import Axios from 'axios';

const http = Axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
});

export default {
  namespaced: true,
  state: {
    data: null,
    loading: false,
    error: false
  },
  getters: {
    getData: (state) => state.data,
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
    enter(_, user) {
      return new Promise((resolve) => {
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...user,
            token: 'asd',
            firstName: user.firstName ?? 'Test',
            lastName: user.lastName ?? 'User'
          })
        );
        setTimeout(() => {
          resolve(true);
        }, 2000);
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
    }
  }
};
