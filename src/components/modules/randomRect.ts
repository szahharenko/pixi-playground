import * as PIXI from 'pixi.js'
import {randomInt, randColor} from './tools'

export default function addRandonElement (app: any, overcallback?: Function): PIXI.Graphics  {
    const size = randomInt(25,100)
    const px = randomInt(0, app.view.width - size)
    const py = randomInt(0, app.view.height - size)
    let pause = false
    const graphics = new PIXI.Graphics()
    graphics.interactive = true
    graphics.beginFill(randColor())
    graphics.lineStyle(2, randColor(), 2);    
    graphics.drawRoundedRect(0, 0, size, size, 10)
    graphics.endFill()
    graphics.blendMode = PIXI.BLEND_MODES.SCREEN;    
    graphics.x = px
    graphics.y = py
    graphics.on("mouseover", function() {
        if (typeof overcallback == 'function') overcallback()
        overcallback = () => false
        graphics.alpha = 0.3
        pause = true
    })

    app.stage.addChild(graphics)
    const move = {
      w: graphics.width,
      h: graphics.height,
      stepX: randomInt(1,3) * (randomInt(0,1) ? -1 : 1),
      stepY: randomInt(1,3) * (randomInt(0,1) ? -1 : 1),
      maxX: app.view.width,
      maxY: app.view.height,
      directionControl (x: number , y: number): void {
        if(x + this.w > this.maxX || x < 0) this.stepX = this.stepX * -1
        if(y + this.h > this.maxY || y < 0) this.stepY = this.stepY * -1
        this.tick()
      },
      tick (): void {
        graphics.x += this.stepX
        graphics.y += this.stepY
      }
    }
    app.ticker.add(() => {
      if (!pause) move.directionControl(graphics.x + 1, graphics.y + 1)
    })
    return graphics
  }