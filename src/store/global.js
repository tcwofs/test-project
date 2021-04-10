import router from '../router';

export default {
  namespaced: true,
  mutations: {
    /**
     * Updates a specific property in the store
     * @param {object} state The store's state
     * @param {object} data An object containing the property and value
     */
    updateProperty: (state, data) => (state[data.property] = data.value)
  },
  actions: {
    login(_, user) {
      return new Promise((resolve) => {
        localStorage.setItem('user', JSON.stringify({ ...user, token: 'asd' }));
        setTimeout(() => {
          resolve(true);
        }, 2000);
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
