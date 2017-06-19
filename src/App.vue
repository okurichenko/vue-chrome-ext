<template>
  <div id="app">
    <div v-if="user">
      <button @click="signOut">Sign out</button>
      <rooms-list></rooms-list>
    </div>
    <div v-else>
      <sign-in></sign-in>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex'
  import firebaseApp from './firebase.js'

  import SignIn from './components/SignIn.vue';
  import RoomsList from './components/RoomsList.vue';

  export default {
    name: 'app',
    components: {
      RoomsList,
      SignIn
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      signOut() {
        firebaseApp.auth().signOut().then(() => {
          this.$store.state.user = null;
        });
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px;
  width: 300px;
  height: 220px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
