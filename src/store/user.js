import { nanoid } from 'nanoid';
import { getRandomInt } from '@/helpers';
import { eventBus } from '@/plugins/eventBus';

export default {
  namespaced: true,
  state: {
    user: null,
    userData: []
  },
  getters: {
    getUser: (state) => state.user,
    getUserData: (state) => state.userData
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
        const id = nanoid(5);
        el = {
          id,
          rects: [],
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
          data
            ?.find((el) => el.randomDetails?.find((item) => item.id === id))
            .randomDetails?.find((el) => el.id === id)
        ),
    addRect: ({ commit }, { id, postId, rect }) => {
      const userData = JSON.parse(localStorage.getItem('userData'));

      userData
        .find((el) => el.id === postId)
        .randomDetails.find((el) => el.id === id)
        .rects.push(rect);

      commit('updateProperty', {
        property: 'userData',
        value: userData
      });

      localStorage.setItem('userData', JSON.stringify(userData));
    },
    addComment: ({ commit }, { id, postId, comment }) => {
      const userData = JSON.parse(localStorage.getItem('userData'));

      userData
        .find((el) => el.id === postId)
        .randomDetails.find((el) => el.id === id)
        .comments.push(comment);

      commit('updateProperty', {
        property: 'userData',
        value: userData
      });

      localStorage.setItem('userData', JSON.stringify(userData));

      eventBus.$emit('comments-update');
    }
  }
};
