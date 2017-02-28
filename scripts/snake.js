var Snake = function(context) {
  
  const COLOR_BODY = '#306d30';
  this.xCurrent = 1;
  this.yCurrent = 0;
  this.body = [{x:50,y:20}, {x:40, y:20}, {x:30, y:20}, {x:20, y:20}];
  this.context = context;
  
  this.setDirection = function(direction) {
    if (this.xCurrent == 1 && direction.x == -1) {
      
      return this;
    }
    if (this.xCurrent == -1 && direction.x == 1) {
      
      return this;
    }
    if (this.yCurrent == 1 && direction.y == -1) {
      
      return this;
    }
    if (this.yCurrent == -1 && direction.y == 1) {
      
      return this;
    }
    this.xCurrent = direction.x;
    this.yCurrent = direction.y;
    
    return this;
  }
  
  this.getBody = function() {
    
    return this.body;
  }
  
  this.grow = function(calbackScore) {
    var tail = this.body[this.body.length - 1];
    var newTail = {x : tail.x - 10*this.xCurrent, y : tail.y - 10*this.yCurrent};
    this.body.push(newTail);
    calbackScore(this.body.length - 4);
    
    return this;
  }
  
  this.advance = function() {
    var headSnake = this.body[0];
    headSnake.x += this.xCurrent * 10;
    headSnake.y += this.yCurrent * 10;
    var tailSnake = this.body.pop();
    tailSnake.x = headSnake.x;
    tailSnake.y = headSnake.y;
    this.body.unshift(tailSnake);
    
    return this;
  };
  
  this.paint = function() {
    for (var index = 0; index < this.body.length; index++) {
      this.context.fillStyle = COLOR_BODY;
      this.context.fillRect(this.body[index].x, this.body[index].y, 10, 10);
      this.context.fillStyle = '#FFFFFF';
      this.context.strokeRect(this.body[index].x, this.body[index].y, 10, 10);
    }
    
    return this;
  }
  
  this.getPosition = function() {
    
    return { x : this.body[0].x, 
             y : this.body[0].y };
  }
  
  return this;
}

var Border = function(context) {
  
  const WIDTH = 300;
  const HEIGHT = 300;
  const COLOR = '#306d30';
  this.context = context;
  
  this.paint = function() {
    this.context.fillStyle = COLOR;
    this.context.strokeRect(0, 0, WIDTH, HEIGHT);
    
    return this;
  }
  
  this.getPosition = {x:WIDTH, y: HEIGHT};
  
  return this;  
  
  this.paint = function() {
    this.context.fillStyle = COLOR;
    this.context.strokeRect(0, 0, WIDTH, HEIGHT);
    
    return this;
  }
  
  this.getPosition = {x:WIDTH, y: HEIGHT};
  
  return this;
}

var Arena = function(context) {
  
  this.layers = [];
  this.context = context;
  
  this.empty = function() {
    this.context.fillStyle = '#010201';
    this.context.fillRect(0, 0, 300, 300);
    
    return this;
  }
  
  this.addLayer = function(layer) {
    this.layers.push(layer);
    
    return this;
  }
  
  this.paint = function() {
    for(var index = 0; index < this.layers.length; index++) {
      this.layers[index].paint();
    }
    
    return this;
  }
  
  return this;
}

var Food = function(context) {
  
  this.x = 80;
  this.y = 50;
  const COLOR = '#FF1010';
  this.context = context;
  
  this.newPositionRadom = function() {
    this.x = Math.round(Math.random()*(300-10)/10)*10;
    this.y = Math.round(Math.random()*(300-10)/10)*10;
    
    return this;
  };
  
  this.paint = function() {
    this.context.fillStyle = COLOR;
    this.context.fillRect(this.x, this.y, 10, 10);
    
    return this;
  }
  
  this.getPosition = function() {
    
    return {
      x : this.x, 
      y : this.y
    };
  }
  
  return this;
  
}

var Crashs = function() {
  
  this.crashs = [];
  
  this.addCrash = function(crash) {
    this.crashs.push(crash);
    
    return this;
  };
  
  this.verifyCrash = function() {
    for(var index = 0; index < this.crashs.length; index++) {
      this.crashs[index].crash();
    }
  };
  
  return this;
}

var CrashSnakeWithBorder = function(crashCallback, snakePosition, borderPosition) {
  
  this.snakePosition = snakePosition;
  this.borderPosition = borderPosition;
  this.crashCallback = crashCallback;
  
  this.setPositionSnake = function(positionSnake) {
    this.snakePosition = positionSnake;
  };
  
  this.crash = function() {
    if ( (this.snakePosition.x+9) >= this.borderPosition.x || (this.snakePosition.y+9) >= this.borderPosition.y 
        || this.snakePosition.x <= -2 || this.snakePosition.y <= -2 ) {
      this.crashCallback();
    }
  }
  
  return this;
}

var CrashSnakeWithSnake = function(crashCallback, snakeHeadPosition, snakeBody) {
  this.snakeHeadPosition = snakeHeadPosition;
  this.snakeBody = snakeBody;
  this.crashCallback = crashCallback;
  
  this.setPositionSnake = function(snakeHeadPosition) {
    this.snakeHeadPosition = snakeHeadPosition;
  };
  
  this.setBody = function(bodySnake) {
    this.snakeBody = snakeBody;
  } 
  
  this.crash = function() {
    for (var index = 2; index < this.snakeBody.length; index++) {
      if (this.snakeBody[index].x == this.snakeHeadPosition.x && this.snakeBody[index].y == this.snakeHeadPosition.y) {
        this.crashCallback();
      }
    }
  }
  
  return this;
}

var CrashSnakeWithFood = function(crashCallback, snakeHeadPosition, foodPosition) {
  this.crashCallback = crashCallback;
  this.snakeHeadPosition = snakeHeadPosition;
  this.foodPosition = foodPosition; 
  
  this.setSnakeHead = function(positionHeadSnake) {
    this.snakeHeadPosition = positionHeadSnake;
    
    return this;
  }
  
  this.setFoodPosition = function(foodPos) {
    this.foodPosition = foodPos;
    
    return this;
  }
  this.crash = function() {
    if (this.snakeHeadPosition.x == this.foodPosition.x && this.snakeHeadPosition.y == this.foodPosition.y) {
      this.crashCallback();
    }
  };
  
  return this;
}

var GrowSnakeEvent = function(snake,food) {
  var box = {};
  box.snake = snake;
  box.food = food;
  
  this.action = function() {
    console.log(box);
    box.food.newPositionRadom();
    box.snake.grow(function(score) {
      document.getElementById('score').textContent = score;
    });
    console.info('Snake Grow!');
  };
  
  return this;
}

var GameOver = function(context) {
  
  var context = context;
  
  this.showMessage = function() {
    context.fillStyle = '#306d30';
    context.font = '48px monospaced';
    context.fillText('Game Over', 50, 70, 250); 
    throw new Error('Game Over.');
  }
  
  return this;
}