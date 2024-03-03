arcade.minesweeper.flag = function(minesweeper, container) {
  this.minesweeper = minesweeper;
  container.appendChild(this.get_element());
}

arcade.minesweeper.flag.prototype.minesweeper;
arcade.minesweeper.flag.prototype.state;
arcade.minesweeper.flag.prototype.element;
arcade.minesweeper.flag.prototype.mouse_left = 1;
arcade.minesweeper.flag.prototype.mouse_right = 3;

arcade.minesweeper.flag.prototype.get_element = function() {
  var self = this;
  if(!this.element) {
    this.element = $.createElement("div")
      .style({"width": 26, "height": 26, "margin": "auto", "background-image": "url('image/sprite.png')", "background-repeat": "no-repeat"})
  
      .addEventListener("pointerdown", function() {
        if(self.state == "bombMode") {
          return self.set_state("redFlagMode");
          
        }
        if(self.state == "redFlagMode") {
          return self.set_state("bombMode");
          
        }
      })

      
    this.set_state("bombMode");
  }
  return this.element[0];
}


arcade.minesweeper.flag.prototype.set_state = function(state) {
  this.state = state;
  console.log(this.state)
  switch(state) {
    case "bombMode":
      this.element.style({"background-position": "-72px -81px"});
    break;
    case "redFlagMode":
      
      this.element.style({"background-position": "-46px -81px"})
    break;
  }
}
arcade.minesweeper.flag.prototype.get_state = function() {
  return this.state;
}