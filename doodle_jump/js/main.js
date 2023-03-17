import { Background } from "./background.js"
import { InputHandler } from "./input.js"
// import { Platform } from "./platform.js"

window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 400
  canvas.height = 600

  class Game {
    constructor(width, height){
      this.width = width
      this.height = height
      this.gameStart = false
      this.platforms = []
      this.platform_gap = 85
      this.add_platforms(0, this.height-15)
      this.add_platforms(-this.height, -15)
      this.background = new Background(this)
      this.inputHandler = new InputHandler(this)
    }
  
    update() {
      this.background.update()

      this.platforms.forEach(platform => 
        platform.update()
      )}
  
    draw(context) {
      this.background.draw(context)

      if (!this.gameStart) {
        context.font = 'bold 25px Helvetica'
        context.fillStyle = 'Black'
        context.textAlign = 'center'
        context.fillText('PRESS ENTER TO START', this.width*0.5, this.height*0.5)
      } else {
        this.platforms.forEach(platform => {
          platform.draw(context)
        })
      }
    }

    add_platforms(lowerY, upperY){
      do{
        let type = 'green'

        this.platforms.unshift(new Platform(this, lowerY, upperY, type))
      } while(this.platforms[0].y >= lowerY)
    }
  }
  
  const game = new Game(canvas.width, canvas.height)
  
  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(game.gameStart) game.update()
    game.draw(ctx)
    requestAnimationFrame(animate)
  }
  
  animate()
})



