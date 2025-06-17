import { useEffect, useImperativeHandle, useState, type Ref } from "react";
import type Board from "../models/Board";
import type { Direction } from "../models/Snake";
import styles from "./BoardComp.module.css";

const movingInterval = 1 * 1000; // 1s
export default function BoardComp({
   board: propBoard,
   direction,
   pushRef,
}: {
   board: Board;
   direction: Direction;
   pushRef: Ref<{
      push: (immediateDirection: Direction) => void;
   } | null>;
}) {
   const [board, setBoard] = useState(propBoard);

   useImperativeHandle(pushRef, () => ({
      push(immediateDirection: Direction) {
         const newBoard = board.shallowCopy();
         newBoard.moveSnake(immediateDirection);
         setBoard(newBoard);
      },
   }));

   useEffect(() => {
      const intervalID = setInterval(() => {
         const newBoard = board.shallowCopy();
         newBoard.moveSnake(direction);
         setBoard(newBoard);
      }, movingInterval);
      return () => clearInterval(intervalID);
   }, [direction]);
   return (
      <main>
         <div className={styles.board} style={{ gridTemplateColumns: `repeat(${board.x}, 1fr)` }}>
            {board.fill.map((row, y) =>
               row.map((fill, x) => {
                  if (fill) console.log(`${x}, ${y} : ${fill}`);
                  return (
                     <div
                        key={`${x}-${y}`}
                        className={`${styles.tile} ${fill === 1 ? styles.snake : fill === 2 ? styles.food : null}`}
                     />
                  );
               })
            )}
         </div>
      </main>
   );
}
