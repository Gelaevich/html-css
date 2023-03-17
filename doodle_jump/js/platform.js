export class Platform{
  constructor(game, lowerY, upperY, type){
    this.game = game
    this.width = 90
    this.height = 15
    this.type = type
    this.x = Math.floor(Math.random() * ((this.game.width-this.width) - 0 + 1)) + 0
    this.y = this.calc_Y(upperY, lowerY)
    this.image = document.querySelector(`#${this.type}_platform`)
  }

  update(){
    this.y += 3
  }

  draw(context){
    context.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  calc_Y(upperY, lowerY){
    if (!this.game.platforms.length) {
      return Math.floor(Math.random() * (upperY - (upperY-100) +1)) + (upperY-100)
    } else{
      return this.game.platforms[0].y - (Math.floor(Math.random() * (this.game.platform_gap - (this.game.platform_gap-30) +1)) + (this.game.platform_gap-30))
    }
  }
}