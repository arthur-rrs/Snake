const RIGTH = {x : 1, y:0};
const LEFT = {x : -1, y:0};
const UP = {x : 0, y:-1};
const DOWN = {x : 0, y:1};

document.body.addEventListener('keyup', function(event) {
  var keycode = Number(event.keyCode);
  
  switch(keycode) {
      case 40:
        snake.setDirection(DOWN);
        break;
      case 38: 
        snake.setDirection(UP);
        break;
      case 37:
        snake.setDirection(LEFT);
        break;
      case 39:
        snake.setDirection(RIGTH);
      break;
  }
});