import Vue from 'vue'
import Vuex from 'vuex'
import {FeathersVuex} from '../feathers-client'
import auth from './store.auth'

Vue.use(Vuex)
Vue.use(FeathersVuex)

const requireModule = require.context(
  // the path were the service module lives
  './services',
  // wether to look in subfolders
  false,
  // only include .js files
  /.js$/
)

const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default)

console.log('servicePlugins =', servicePlugins);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [...servicePlugins, auth]
})
