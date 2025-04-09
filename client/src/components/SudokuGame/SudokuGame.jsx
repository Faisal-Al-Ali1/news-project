
import React, { useState, useEffect, useRef } from "react";
import NewsTicker from "../NewsTicker/NewsTicker";

import sudoku from "sudoku";

const SudokuGame = ({ onBack }) => {
  const generateNewGame = (level = "medium") => {
    const puzzle = sudoku.makepuzzle();
    const solution = sudoku.solvepuzzle(puzzle);
    return { puzzle, solution, level };
  };

  const [game, setGame] = useState(generateNewGame());
  const [userInput, setUserInput] = useState(game.puzzle);
  const [difficulty, setDifficulty] = useState("medium");
  const [timer, setTimer] = useState(900); // مؤقت تنازلي: 15 دقيقة
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleInputChange = (index, value) => {
    if (/^[1-9]?$/.test(value)) {
      if (!isTimerRunning) setIsTimerRunning(true);
      let newGrid = [...userInput];
      newGrid[index] = value ? parseInt(value, 10) - 1 : null;
      setUserInput(newGrid);
    }
  };

  const checkCompletion = () => {
    if (JSON.stringify(userInput) === JSON.stringify(game.solution)) {
      setGameCompleted(true);
    }
  };

  useEffect(() => {
    checkCompletion();
  }, [userInput]);

  // إعادة تشغيل نفس اللعبة بدون تغيير المستوى
  const restartGame = () => {
    setUserInput([...game.puzzle]);
    setTimer(900);
    setIsTimerRunning(false);
    setGameCompleted(false);
  };

  // إعادة تشغيل اللعبة مع تغيير مستوى الصعوبة
  const resetGame = (newLevel) => {
    const newGame = generateNewGame(newLevel);
    setGame(newGame);
    setUserInput(newGame.puzzle);
    setDifficulty(newLevel);
    setTimer(900);
    setIsTimerRunning(false);
    setGameCompleted(false);
  };

  // 🔥 دعم التنقل باستخدام الأسهم 🔥
  const handleKeyDown = (e, index) => {
    let newIndex = index;

    switch (e.key) {
      case "ArrowUp":
        do { newIndex -= 9; } while (newIndex >= 0 && game.puzzle[newIndex] !== null);
        break;
      case "ArrowDown":
        do { newIndex += 9; } while (newIndex < 81 && game.puzzle[newIndex] !== null);
        break;
      case "ArrowLeft":
        do { newIndex -= 1; } while (newIndex % 9 !== 8 && newIndex >= 0 && game.puzzle[newIndex] !== null);
        break;
      case "ArrowRight":
        do { newIndex += 1; } while (newIndex % 9 !== 0 && newIndex < 81 && game.puzzle[newIndex] !== null);
        break;
      default:
        return;
    }

    if (newIndex >= 0 && newIndex < 81) {
      setTimeout(() => {
        inputRefs.current[newIndex]?.focus();
      }, 10);
    }
  };

  return (
    <>
    <NewsTicker />

    <div className="p-6 bg-gray-200 rounded-lg shadow-lg max-w-4xl mx-auto text-center">
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">🧩 لعبة سودوكو</h2>

      <p className="text-lg font-semibold text-gray-700 mb-2">
        ⏳ الوقت المتبقي: {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}{timer % 60}
      </p>

      <div className="mb-4">
        <label className="font-semibold text-gray-700">اختر مستوى الصعوبة:</label>
        <select
          className="ml-2 p-2 border rounded bg-white text-black"
          value={difficulty}
          onChange={(e) => resetGame(e.target.value)}
        >
          <option value="easy">سهل 🟢</option>
          <option value="medium">متوسط 🟡</option>
          <option value="hard">صعب 🔴</option>
        </select>
      </div>

      <div className="grid grid-cols-9 gap-0 bg-black rounded-md p-1 border-4 border-black">
  {userInput.map((cell, index) => (
    <input
      key={index}
      ref={(el) => (inputRefs.current[index] = el)}
      type="text"
      maxLength="1"
      value={cell !== null ? cell + 1 : ""}
      onChange={(e) => handleInputChange(index, e.target.value)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      className={`w-full h-full text-center text-lg font-bold border border-gray-400 
        ${
          game.puzzle[index] !== null
            ? "bg-gray-300 text-gray-900 font-extrabold shadow-md border-gray-500"
            : showErrors && cell !== game.solution[index]
            ? "bg-red-200 text-red-600 border-red-500"
            : "bg-white"
        } 
        ${(index % 9 === 3|| index % 9 === 6) ? "border-r-4 border-black" : ""} /* ✅ الفاصل بعد كل 3 أعمدة */
        ${(index >= 18 && index < 27) || (index >= 45 && index < 54) ? "border-b-4 border-black" : ""} /* ✅ الفاصل بين كل 3 صفوف */
      `}
      disabled={game.puzzle[index] !== null}
    />
  ))}
</div>

      <div className="flex justify-center mt-4 space-x-4">
        <button 
          onClick={restartGame}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
        >
          🔄 إعادة اللعبة
        </button>

        <button 
          onClick={() => setShowErrors(!showErrors)}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg shadow hover:bg-yellow-400 transition"
        >
          {showErrors ? "❌ إخفاء الأخطاء" : "✅ إظهار الأخطاء"}
        </button>

        <button 
          onClick={onBack}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-500 transition"
        >
          🔙 العودة
        </button>
      </div>
    </div>
    </>
  );
};

export default SudokuGame;