import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deck: ["Cat", "Bomb", "Defuse", "Shuffle", "Bomb"], //we can increase or decrease the hardness of the game by manipulating the deck array
  gameStatus: "playing",
  totalCards: 5,
  remainingCards: 5,
  defuseCards: 0,
  cardDrawn: "",
  score: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    drawCard: (state) => {
      const randomIndex = Math.floor(Math.random() * state.deck.length);
      const drawnCard = state.deck[randomIndex];

      if (drawnCard === "Cat") {
        state.remainingCards = state.remainingCards - 1;
        state.cardDrawn = "Cat";
      }

      if (drawnCard === "Bomb") {
        state.defuseCards -= 1;
        state.remainingCards = state.remainingCards - 1;
        state.cardDrawn = "Bomb";
      }

      if (drawnCard === "Defuse") {
        state.defuseCards += 1;
        state.remainingCards = state.remainingCards - 1;
        state.cardDrawn = "Defuse";
      }

      if (drawnCard === "Shuffle") {
        state.remainingCards = state.totalCards;
        state.cardDrawn = "Shuffle";
        state.defuseCards = 0;
      }

      if (state.remainingCards === 0) {
        if (state.defuseCards >= 0) {
          state.gameStatus = "won";
          state.score += 1;
          //   return;
        } else {
          state.gameStatus = "lost";
          state.score = 0;
        }
        console.log("done");
        return;
      }
    },
    resetGame: () => initialState,
  },
});

export const { drawCard, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
