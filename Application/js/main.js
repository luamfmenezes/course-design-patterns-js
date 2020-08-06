const move = {
  right: (snake) => {
    const [currentX, currentY] = snake[snake.length - 1];
    if (currentX === 19) {
      snake.push([0, currentY]);
    } else {
      snake.push([currentX + 1, currentY]);
    }
  },
  left: (snake) => {
    const [currentX, currentY] = snake[snake.length - 1];
    if (currentX === 0) {
      snake.push([19, currentY]);
    } else {
      snake.push([currentX - 1, currentY]);
    }
  },
  bottom: (snake) => {
    const [currentX, currentY] = snake[snake.length - 1];
    if (currentY === 19) {
      snake.push([currentX, 0]);
    } else {
      snake.push([currentX, currentY + 1]);
    }
  },
  top: (snake) => {
    const [currentX, currentY] = snake[snake.length - 1];
    if (currentY === 0) {
      snake.push([currentX, 19]);
    } else {
      snake.push([currentX, currentY - 1]);
    }
  },
};

class Game {
  state = {
    direction: "right",
    snake: [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
  };

  moveSnake() {
    const { direction, snake } = this.state;
    snake.splice(0, 1);
    move[direction](snake);
  }

  setDirection(newDirection) {
    if (newDirection === "bottom" && this.state.direction !== "top") {
      this.state.direction = "bottom";
    }
    if (newDirection === "top" && this.state.direction !== "bottom") {
      this.state.direction = "top";
    }
    if (newDirection === "left" && this.state.direction !== "right") {
      this.state.direction = "left";
    }
    if (newDirection === "right" && this.state.direction !== "left") {
      this.state.direction = "right";
    }
  }

  addFruit() {}
}

function renderStage(stage, snake) {
  stage.empty();
  snake.forEach((snakePartBody) => {
    const bodyPart = `<div class="snake-body" style="left:${
      snakePartBody[0] * 30
    }px;top:${snakePartBody[1] * 30}px;"/>`;
    console.log(bodyPart);
    stage.append(bodyPart);
  });
}

$(window).ready(function () {
  const game = new Game();
  const stage = $(".stage");

  $(document).keypress(function (e) {
    if (e.key == "s") {
      game.setDirection("bottom");
    }
    if (e.key == "d") {
      game.setDirection("right");
    }
    if (e.key == "w") {
      game.setDirection("top");
    }
    if (e.key == "a") {
      game.setDirection("left");
    }
  });

  setInterval(() => {
    game.moveSnake();
    renderStage(stage, game.state.snake);
  }, 100);
});
