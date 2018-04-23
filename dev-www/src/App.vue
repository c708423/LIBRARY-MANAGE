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
