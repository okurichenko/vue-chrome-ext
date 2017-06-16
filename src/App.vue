<template>
  <div id="app">
    <button @click="getValues">Get values</button>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'app',
    data () {
      return {
        token: null,
        upworkTask: {}
      }
    },
    mounted() {
      const bp = chrome.extension.getBackgroundPage();

      bp.getToken().then((token) => {
        console.log(token);
        Vue.http.headers.common['Authorization'] = `Bearer ${token}`;

      this.token = token;
    })
      ;
    },
    methods: {
      getValues() {
        return this.$http.get('https://www.googleapis.com/drive/v3/files').then((data) => {
              console.log(data)
      })
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
  margin-top: 60px;
  width: 300px;
  height: 200px;
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
