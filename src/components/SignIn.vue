<template>
  <div id="sign-in">
    <input type="text" v-model="company">
    <button @click="signIn(false)">Sign in</button>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data () {
      return {
        company: 'lits'
      }
    },
    methods: {
      signIn (interactive) {
        chrome.identity.getAuthToken({interactive: !!interactive}, (token) => {
          localStorage.setItem('company', this.company);
          var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
          firebase.auth().signInWithCredential(credential).catch((error) => {
            // The OAuth token might have been invalidated. Lets' remove it from cache.
            if (error.code === 'auth/invalid-credential') {
              chrome.identity.removeCachedAuthToken({token: token}, () => {
                this.signIn(true);
              });
            }
          });
        });
      }
    }
  }
</script>

<style>
  #sign-in {
    margin-top: 50px;
  }
</style>
