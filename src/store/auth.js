export default {
  namespaced: true,
  actions: {
    enter({ commit }, data) {
      return new Promise((resolve) => {
        const user = {
          ...data,
          token: 'asd',
          firstName: data.firstName ?? 'Test',
          lastName: data.lastName ?? 'User'
        };

        commit(
          'user/updateProperty',
          {
            property: 'user',
            value: user
          },
          { root: true }
        );

        localStorage.setItem('user', JSON.stringify(user));

        setTimeout(() => {
          resolve(true);
        }, 2000);
      });
    },
    logout({ commit }) {
      commit(
        'user/updateProperty',
        {
          property: 'user',
          value: null
        },
        { root: true }
      );
      commit(
        'user/updateProperty',
        {
          property: 'userData',
          value: null
        },
        { root: true }
      );
      commit(
        'user/updateProperty',
        {
          property: 'userRect',
          value: null
        },
        { root: true }
      );

      localStorage.removeItem('user');
      localStorage.removeItem('userData');
      localStorage.removeItem('userRect');
    }
  }
};
