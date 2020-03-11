import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#009688',
        secondary: '#8bc34a',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#ffc107',
        info: '#607d8b',
        success: '#4caf50'
      }
    }
  }
});
