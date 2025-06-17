import { useEffect, useRef, useState } from "react";
import "./App.css";
import Board from "./models/Board";
import BoardComp from "./components/BoardComp";
import type { Direction } from "./models/Snake";

export default function App() {
   const x = 10;
   const y = 10;
   const snakeLen = 5;
   const board = new Board(x, y, snakeLen, undefined, 6);

   const [direct, setDirect] = useState<Direction>("DOWN");
   const pushRef = useRef<{ push: (immediateDirection: Direction) => void }>(null);

   useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
         switch (e.key) {
            case "ArrowUp":
               pushRef.current?.push("UP");
               setDirect("UP");
               break;
            case "ArrowDown":
               pushRef.current?.push("DOWN");
               setDirect("DOWN");
               break;
            case "ArrowLeft":
               pushRef.current?.push("LEFT");
               setDirect("LEFT");
               break;
            case "ArrowRight":
               pushRef.current?.push("RIGHT");
               setDirect("RIGHT");
               break;
            default:
               break;
         }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   });

   return <BoardComp board={board} direction={direct} pushRef={pushRef}></BoardComp>;
}
