import Point from "./Point";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export default class Snake {
   private body: Point[] = [];
   private isValidPoint: (p: Point) => boolean;
   private isFoodPoint: (p: Point) => boolean;
   constructor(length: number, isValidPoint: (p: Point) => boolean, isFoodPoint: (p: Point) => boolean) {
      this.isValidPoint = isValidPoint;
      this.isFoodPoint = isFoodPoint;
      while (length-- > 0) {
         this.body.push(new Point(length, Math.floor(0)));
      }
   }

   public getBody() {
      return this.body[Symbol.iterator]();
   }

   public rebindFunction(isValidPoint: (p: Point) => boolean, isFoodPoint: (p: Point) => boolean) {
      this.isFoodPoint = isFoodPoint;
      this.isValidPoint = isValidPoint;
   }

   public move(direction: Direction): [oldTail: Point, newHead: Point] {   // return null to eat food and grow
      let nextPoint;
      console.log('this.body.len', this.body.length);
      this.body.forEach(p => console.log("body", p));
      const head = this.body[0];
      switch (direction) {
         case "UP":
            nextPoint = new Point(head.x, head.y - 1);
            break;
         case "DOWN":
            nextPoint = new Point(head.x, head.y + 1);
            break;
         case "LEFT":
            nextPoint = new Point(head.x - 1, head.y);
            break;
         case "RIGHT":
            nextPoint = new Point(head.x + 1, head.y);
            break;
      }

      if (!this.isValidPoint(nextPoint))
         throw new Error("Cannot move " + direction + " because " + nextPoint + " is not a valid point");

      const oldTail = this.body[this.body.length - 1];
      if (
         !(nextPoint.x === oldTail.x && nextPoint.y === oldTail.y) &&
         this.body.some((p) => p.x === nextPoint.x && p.y === nextPoint.y)
      ) {
         throw new Error("nextPoint" + nextPoint + " colide with body, cannot move " + direction);
      }
      
      this.body.unshift(nextPoint);
      if (this.isFoodPoint(nextPoint)) {
         return [nextPoint, nextPoint];  // switch food to snake body
      }
      this.body.pop()!;
      return [oldTail, nextPoint];
   }
}
