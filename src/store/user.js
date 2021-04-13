import { nanoid } from 'nanoid';
import { getRandomInt } from '@/helpers';

export default {
  namespaced: true,
  state: {
    user: null,
    userData: [],
    userRects: []
  },
  getters: {
    getUser: (state) => state.user,
    getUserData: (state) => state.userData,
    getUserRects: (state) => state.userRects
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
    addNewPost: ({ commit, getters, rootGetters }) => {
      const postId = nanoid(5);

      const randomDetails = [...Array(4).keys()].map((el) => {
        el = {
          id: nanoid(5),
          rect: [],
          comments: [],
          url: `${[3, getRandomInt(8), getRandomInt(8)].join('/')}.png`,
          postId
        };

        return el;
      });

      const randomPost = {
        id: postId,
        randomDetails,
        ...rootGetters['data/getDataHourly'][
          getRandomInt(rootGetters['data/getDataHourly'].length)
        ]
      };

      const userDataUpdated = [randomPost, ...getters.getUserData];

      commit('updateProperty', {
        property: 'userData',
        value: userDataUpdated
      });
      localStorage.setItem('userData', JSON.stringify(userDataUpdated));
    },
    getPost: (_, id) =>
      Promise.resolve(localStorage.getItem('userData'))
        .then(JSON.parse)
        .then((data) => data.filter((el) => el.id === id)),
    getDetail: (_, id) =>
      Promise.resolve(localStorage.getItem('userData'))
        .then(JSON.parse)
        .then((data) =>
          data.filter((el) =>
            Array.isArray(el) ? el.filter((item) => item.id === id) : null
          )
        )
  }
};
