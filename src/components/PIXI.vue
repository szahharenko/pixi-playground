<template>
  <div class="pixiplayground">
    <div id="pixiplayground"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as PIXI from 'pixi.js'
import addRandonElement from './modules/randomRect'
import {msToTime} from './modules/tools'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string
  @Prop() private time!: number

  private statusMessage: PIXI.Text = new PIXI.Text('Hurry up!', {fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'})
  private start: number = (new Date()).getTime()
  private count = 0  

  mounted () {
    const app = new PIXI.Application({transparent: true, width: window.innerWidth, height: window.innerHeight})
    const mainContainer = document.getElementById('pixiplayground')
    if (mainContainer) {
        mainContainer.appendChild(app.view)
        const randomElementsCount = 15
        const randomElements = []
        
        while(this.count < randomElementsCount) {
          randomElements.push(
            addRandonElement(app, () => {
              console.log('catched')
              this.count--
            })
          )
          this.count++
        }
                
        app.stage.addChild(this.statusMessage)
        const logo = PIXI.Sprite.from('/assets/logo.png')
        console.log(logo)
        app.stage.addChild(logo)        

    }
  }
  private tick(): void {
        const interval = setInterval( () => {
          const now: number = (new Date()).getTime()
          if (this.count === 0) {
            this.statusMessage.text = 'Well done in: ' + msToTime( now - this.start )
            clearInterval(interval)
          } else {
            this.statusMessage.text = 'Hurry up! ' + msToTime( now - this.start )
          }
        } ,100)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #pixiplayground {
    display: block;
    canvas {width:100%;height: 100vh;}
  }
</style>
