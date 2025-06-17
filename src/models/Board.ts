import Point from "./Point";
import Snake, { type Direction } from "./Snake";

function getRandomInt(x: number) {
   return Math.floor(Math.random() * (x + 1));
}

export default class Board {
   public x: number;
   public y: number;
   public fill: number[][];
   private snake: Snake;

   constructor(x: number, y: number, snake: number | Snake, fill?: number[][], foodNum?: number) {
      this.x = x;
      this.y = y;
      if (typeof snake === "number") {
         this.snake = new Snake(snake, this.isValidPoint.bind(this), this.isPointFood.bind(this));
      } else {
         this.snake = snake;
         this.snake.rebindFunction(this.isValidPoint.bind(this), this.isPointFood.bind(this));
      }
      if (fill) {
         this.fill = fill;
      } else {
         this.fill = Array.from({ length: y }, () => Array.from({ length: x }, () => 0));
      }

      if (foodNum) {
         for (let i = 0; i < foodNum; i++) {
            const foodX = getRandomInt(x - 1);
            const foodY = getRandomInt(y - 1);
            this.fill[foodX][foodY] = 2;
         }
      }

      this.putSnake(this.snake);
   }

   public isValidPoint(p: Point) {
      return p.x >= 0 && p.x < this.x && p.y >= 0 && p.y < this.y;
   }

   public isPointFood(p: Point) {
      return this.fill[p.y][p.x] === 2;
   }

   public putSnake(snake: Snake) {
      for (const p of snake.getBody()) {
         this.fill[p.y][p.x] = 1;
      }
   }

   public swiftPoint(pIn: Point, pOut: Point) {
      if (!this.isValidPoint(pIn) || !this.isValidPoint(pOut)) {
         throw new Error("Point out of bounds");
      }
      console.log("swiftpoint", pOut, pIn);
      this.fill[pOut.y][pOut.x] = 0;
      this.fill[pIn.y][pIn.x] = 1;
   }

   public moveSnake(direct: Direction) {
      const [oldPoint, newPoint] = this.snake.move(direct);
      this.swiftPoint(newPoint, oldPoint);
      console.log("after moveSnake", this.fill);
   }

   public shallowCopy() {
      return new Board(this.x, this.y, this.snake, this.fill);
   }
}
