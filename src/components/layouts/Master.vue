<template>
  <div id="app">
    <ul class="nav">
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'todo' }">App</router-link></li>
      <li><router-link :to="{ name: 'about' }">About</router-link></li>
      <li v-if="!loggedIn"><router-link :to="{ name: 'login' }">Login</router-link></li>
      <li v-if="!loggedIn"><router-link :to="{ name: 'register' }">Register</router-link></li>
      <li v-if="loggedIn"><router-link :to="{ name: 'logout' }">Logout</router-link></li>

    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style lang="scss">

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 24px;
    height: 100vh;
  }

  .flex-center {
    display: flex;
    justify-content: center;
  }

  .nav {
    display: flex;
    list-style: none;
    padding: 15px 0;
    margin: 0;
    justify-content: flex-end;
    background: #F5F8FA;
    border-bottom: 1px solid lightgrey;
    margin-bottom: 24px;
  }

  .nav a {
    color: #636b6f;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .1rem;
    text-decoration: none;
    text-transform: uppercase;
  }

  // Auth Pages

  label {
    display: block;
    margin-bottom: 4px;
  }

  .login-heading {
    margin-bottom: 16px;
  }

  .form-control {
    margin-bottom: 24px;
  }

  .mb-more {
    margin-bottom: 42px;
  }

  .login-form {
    max-width: 500px;
    margin: auto;
  }

  .login-input {
    width: 100%;
    font-size: 16px;
    padding: 12px 16px;
    outline: 0;
    border-radius: 3px;
    border: 1px solid lightgrey;
  }

  .btn-submit {
    width: 100%;
    padding: 14px 12px;
    font-size: 18px;
    font-weight: bold;
    background: #60BD4F;
    color: white;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: darken(#60BD4F, 10%);
    }

  }

</style>

