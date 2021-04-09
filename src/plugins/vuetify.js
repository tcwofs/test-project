import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import light from './themes/light.json';
import dark from './themes/dark.json';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light,
      dark
    }
  }
});
