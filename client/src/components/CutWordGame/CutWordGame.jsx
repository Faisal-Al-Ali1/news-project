// import React from "react";

// const CutWordGame = () => {
//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto text-center">
//       <h2 className="text-3xl font-bold text-gray-800 mb-4">✏️ لعبة الكلمات المتقاطعة</h2>
//       <p className="text-lg text-gray-600">اللعبة ستتوفر قريبًا! 🚀</p>
//     </div>
//   );
// };

// export default CutWordGame; // ✅ تأكد من وجود "export default"
import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";
import NewsTicker from "../NewsTicker/NewsTicker"

const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const initialDeck = () => {
  let deck = suits.flatMap(suit => values.map(value => ({ suit, value, id: `${suit}-${value}` })));
  return deck.sort(() => Math.random() - 0.5);
};

const generateColumns = (deck) => {
  const columns = Array(7).fill(null).map((_, index) => {
    return deck.splice(0, index + 1); // توزيع البطاقات على الأعمدة
  });
  return columns;
};

// مكون بطاقة
const CardComponent = ({ card, onDrop, isFaceUp }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: card.id, suit: card.suit, value: card.value },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <motion.div
      ref={drag}
      className={`p-2 border rounded-lg shadow-lg cursor-pointer ${isDragging ? "opacity-50" : ""}`}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      onDrop={(e) => onDrop(card)}
    >
      <div
        className={`w-20 h-32 flex items-center justify-center border-2 border-gray-500 rounded-lg ${isFaceUp ? 'bg-white' : 'bg-gray-800'}`}
        style={{
          backgroundImage: isFaceUp
            ? `url(/cards/${card.value}_of_${card.suit}.png)` // عرض البطاقة بواجهة الوجه
            : `url(/cards/card_back.png)`, // البطاقة المقلوبة
          backgroundSize: 'cover',
          boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
        }}
      >
        {!isFaceUp && (
          <div className="text-center text-lg font-bold text-white">?</div>
        )}
      </div>
    </motion.div>
  );
};

// مكون الأعمدة
const ColumnComponent = ({ column, onDropCard }) => {
  return (
    <div className="flex flex-col gap-2">
      {column.map((card, index) => (
        <CardComponent key={card.id} card={card} onDrop={onDropCard} isFaceUp={index === column.length - 1} />
      ))}
    </div>
  );
};

// مكون السوليتير
const CutWordGame= () => {
  const [deck, setDeck] = useState(initialDeck());
  const [columns, setColumns] = useState(generateColumns([...deck]));
  const [foundations, setFoundations] = useState([[], [], [], []]);

  useEffect(() => {
    setColumns(generateColumns([...deck]));
  }, [deck]);

  const handleCardDrop = (columnIndex, card) => {
    const newColumns = [...columns];
    newColumns[columnIndex].push(card);
    setColumns(newColumns);
  };

  const handleCardMoveToFoundation = (foundationIndex, card) => {
    const newFoundations = [...foundations];
    newFoundations[foundationIndex].push(card);
    setFoundations(newFoundations);
  };

  const handleRestart = () => {
    const newDeck = initialDeck();
    setDeck(newDeck);
    setColumns(generateColumns([...newDeck]));
    setFoundations([[], [], [], []]);
  };

  return (
        <div>
        
    <DndProvider backend={HTML5Backend}>
    <NewsTicker />
      {/* تعليمات اللعب */}
      <div className="text-center mt-4 text-lg font-bold">
        <p>كيفية اللعب:</p>
        <ul className="list-disc list-inside">
          <li>اسحب البطاقة من الأعمدة وضعها في الأساسيات.</li>
          <li>يمكنك فقط سحب البطاقات المقلوبة من الأعمدة.</li>
          <li>ضع البطاقات في الأساسيات حسب القيمة والترتيب الصحيح (من A إلى K).</li>
          <li>لإعادة اللعبة، اضغط على زر "Restart Game".</li>
        </ul>
      </div>
      <div className="flex justify-center gap-8 p-8">
        
        {/* الأساسيات */}
        
        <div className="flex gap-2">
          {foundations.map((foundation, index) => (
            <div key={index} className="w-20 h-32 bg-green-200 border-2 border-gray-500 rounded-lg p-2">
              {foundation.length > 0 ? (
                <CardComponent card={foundation[foundation.length - 1]} isFaceUp={true} />
              ) : (
                <div className="h-full w-full flex items-center justify-center">Foundation {index + 1}</div>
              )}
            </div>
          ))}
        </div>

        {/* الأعمدة */}
        {columns.map((column, index) => (
          <ColumnComponent
            key={index}
            column={column}
            onDropCard={(card) => handleCardDrop(index, card)}
          />
        ))}
      </div>

   

      <button
        className="m-11 px-9 py-2 bg-[#F4AE3F] text-white font-semibold rounded-lg shadow-lg hover:bg-[#ddb473] transition duration-300"
        onClick={handleRestart}
      >
        Restart Game
      </button>
    </DndProvider>
    </div>
  );
};

export default CutWordGame;