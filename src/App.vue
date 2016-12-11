<template>
  <div id="app">
    <img src="./assets/logo.png">
    <shifter></shifter>
  </div>
</template>

<script>
// import Hello from './components/Hello'
import Shifter from './components/Shifter'

export default {
  name: 'app',
  components: {
    // Hello,
    Shifter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
