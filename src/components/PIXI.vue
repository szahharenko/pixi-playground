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

  private count = 0
  private start: number = (new Date()).getTime()
  private statusMessage: PIXI.Text = new PIXI.Text('Hurry up!', {fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'})
  private timerMessage: PIXI.Text = new PIXI.Text('Hurry up!', {x: 10, y: 10, fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'})  

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
              this.count--
            })
          )
          this.count++
        }
        this.statusMessage.x = 10
        this.statusMessage.y = 20
        this.timerMessage.x = 10
        this.timerMessage.y = 50        
        app.stage.addChild(this.statusMessage)
        app.stage.addChild(this.timerMessage)

        this.tick()

    }
  }
  private tick(): void {
        let interval = setInterval( () => {
          const now: number = (new Date()).getTime()
          if (this.count === 0) {
            clearInterval(interval)
            const letters = [...'Well done!']
            let step = 0
            let word = ''
            interval = setInterval( () => {
              const letter = letters[step]
              if(letter) {
                word += letter
                step++
              } else {
                word = ''
                step = 0
              }
              this.statusMessage.text = word
            },50)
          }
          this.timerMessage.text = msToTime( now - this.start )
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
