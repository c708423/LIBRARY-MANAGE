<style>
html{
  height:100%;
}
body{
  height:100%;
}
#app{
  height:100%;
}

</style>
<template>
  <div id="app">
    <Header></Header>
    <Admin></Admin>
    <Footer></Footer>
  </div>
</template>
<script>

import LoginForm from './components/LoginForm'
import Admin from './components/Admin'
import Header from './components/Header'
import Footer from './components/Footer'
import Vue from 'vue'
const Bus = new Vue()
export default {
  name: 'app',
  components: {
    'LoginForm': LoginForm,
    'Admin': Admin,
    'Header': Header,
    'Footer': Footer
  }
}
</script>

<style>
#app {

}
</style>
