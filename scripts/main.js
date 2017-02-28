var context = document.getElementById('scenario-of-game').getContext('2d');
var snake = new Snake(context);
var food  = new Food(context);
var border = new Border(context);
var arena = new Arena(context);
var crashs = new Crashs();
//Crashs
var crashSnakeWithFood = new CrashSnakeWithFood(new GrowSnakeEvent(snake, food).action, snake.getPosition(), food.getPosition());
var crashBorderWithSnake = new CrashSnakeWithBorder(new GameOver(context).showMessage, snake.getPosition(), border.getPosition);
var crashSnakeWithSnake = new CrashSnakeWithSnake(new GameOver(context).showMessage, snake.getPosition(), snake.getBody());

crashs.addCrash(crashBorderWithSnake);
crashs.addCrash(crashSnakeWithSnake);
crashs.addCrash(crashSnakeWithFood);
//Arena Layers
arena.addLayer(food);
arena.addLayer(border);
arena.addLayer(snake);
arena.paint();
//Const of Game.
const FPS = 100;
function gameLoop() {
  arena.empty();
  snake.advance();
  crashSnakeWithFood.setSnakeHead(snake.getPosition());
  crashSnakeWithFood.setFoodPosition(food.getPosition());
  crashBorderWithSnake.setPositionSnake(snake.getPosition());
  crashSnakeWithSnake.setBody(snake.getBody());
  crashSnakeWithSnake.setPositionSnake(snake.getPosition());
  arena.paint();
  crashs.verifyCrash();
  setTimeout(gameLoop, FPS);
}
console.info('Snake Starting...');
console.info(Date.now());
console.info(FPS + '  FPS');
setTimeout(gameLoop, FPS);
