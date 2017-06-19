import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueFire from 'vuefire';
import Vuex from 'vuex';
import moment from 'moment';
import firebaseApp from './firebase.js';
import store from './store.js'

Vue.use(VueFire);
Vue.use(VueResource);

Vue.filter('formattedDate', function (value) {
  return moment(value).format('HH:mm, MMM Do')
})

const db = firebaseApp.database()

firebaseApp.auth().onAuthStateChanged((user) => {
  let promise = Promise.resolve()
  let firebase = {}
  if (user) {
    const company = localStorage.getItem('company')
    store.state.user = user
    store.state.company = company
    promise = user.getToken().then((token) => {
      store.state.accessToken = token
    })
    firebase.rooms = db.ref(`/${company}/rooms`)
  }

  return promise.then(() => {

    new Vue({
      el: '#app',
      store,
      render: h => h(App),
      computed: Vuex.mapGetters([
        'rooms'
      ]),
      firebase
    })
  });
});
