<template>
  <div id="app">
    <router-view/>
    <div class="background">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',

    mounted() {

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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .background {
    background-color: #F2F5F7;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
</style>
