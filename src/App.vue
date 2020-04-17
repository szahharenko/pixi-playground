<template>
  <div id="app">
    <div class="videobg">
      <video autoplay muted loop>
        <source src="https://agly.eu/img/appbg.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="logo"><img src="./assets/logo.png" alt="Catch me"></div>
    <PIXI />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PIXI from "./components/PIXI.vue";

@Component({
  components: {
    PIXI
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
* {margin:0;padding:0;overflow: hidden;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
.logo {
  position: fixed;z-index: 3;top:0;left:50%;
  transform: translateX(-50%);
  pointer-events: none;
  img {max-width: 25vw;height: auto;}
}
.pixiplayground {
  position: relative;
  z-index: 2;
  display: block;
  min-height: 100vh;
}
.videobg {
  position:fixed;top:0;left:0;z-index:-1;width:100%;height:100%;

  video {
    position:absolute;z-index:1;object-fit: cover;top: 0;left: 0;width: 100%;height: 100%;
  }
  &::after {
    content:'';position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;background:#000;opacity:0.8;
  }  
}
</style>
