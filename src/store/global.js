import router from '../../router';

export default {
  namespaced: true,
  state: {
    accessToken: null
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken
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
    login({ commit, getters, dispatch }, user) {
      return new Promise((resolve, reject) => {
        dispatch(
          'http/serverSendRequest',
          {
            method: 'post',
            url: '/auth/login',
            data: {
              ...user,
              hash: getters.machineHash
            }
          },
          { root: true }
        )
          .then(({ data }) => {
            const { access_token, refresh_token, user } = data;

            commit('updateProperty', {
              property: 'accessToken',
              value: access_token
            });
            commit('updateProperty', {
              property: 'refreshToken',
              value: refresh_token
            });

            commit(
              'me/updateProperty',
              {
                property: 'user',
                value: user
              },
              { root: true }
            );

            resolve(true);
          })
          .catch((error) => reject(error));
      });
    },
    logout: ({ commit, dispatch }) =>
      new Promise((resolve) => {
        dispatch(
          'http/serverSendRequest',
          {
            method: 'post',
            url: '/auth/logout'
          },
          { root: true }
        ).finally(() =>
          commit('updateProperty', {
            property: 'accessToken',
            value: ''
          })
        );

        dispatch('tabs/clearTabs', null, { root: true });
        router.push('/');
        resolve();
      })
  }
};
