import React, { useState, useEffect } from "react";
import "./App.css"; // O puedes usar CSS en línea

const cardSymbols = ["🍕", "🍔", "🍟", "🌮", "🍣", "🍩"];

const shuffleArray = (array) => {
  return [...array]
    .concat([...array])
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({ id: index, symbol, matched: false }));
};

function App() {
  const [cards, setCards] = useState(shuffleArray(cardSymbols));
  const [flipped, setFlipped] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      const [first, second] = flipped;
      if (cards[first].symbol === cards[second].symbol) {
        const newCards = [...cards];
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  }, [flipped, cards]);

  const handleClick = (index) => {
    if (flipped.includes(index) || cards[index].matched || disabled) return;
    setFlipped((prev) => [...prev, index]);
  };

  const resetGame = () => {
    setCards(shuffleArray(cardSymbols));
    setFlipped([]);
  };

  return (
    <div className="app">
      <h1>🎴 Encuentra el Par 🎴</h1>
      <div className="grid">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || card.matched;
          return (
            <div
              key={card.id}
              className={`card ${isFlipped ? "flipped" : ""}`}
              onClick={() => handleClick(index)}
            >
              <div className="inner">
                <div className="front">❓</div>
                <div className="back">{card.symbol}</div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="reset" onClick={resetGame}>
        🔄 Reiniciar
      </button>
    </div>
  );
}

export default App;