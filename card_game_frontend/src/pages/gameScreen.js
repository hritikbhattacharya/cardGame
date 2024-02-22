import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawCard, resetGame } from "../features/gameSlice";
import { addScore } from "../features/userDetails";
import { Link } from "react-router-dom";

function GameScreen() {
  const dispatch = useDispatch();

  // All the states from the redux store
  const gameStatus = useSelector((state) => state.game.gameStatus);
  const remainingCards = useSelector((state) => state.game.remainingCards);
  const cardDrawn = useSelector((state) => state.game.cardDrawn);
  const scoreUp = useSelector((state) => state.game.score);
  const username = useSelector((state) => state.user.username);

  // async function for sending data to backend
  const addUserDetail = async () => {
    await fetch("http://localhost:8000/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        score: scoreUp,
      }),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // All the handler functions for the game
  const handleDrawCard = (e) => {
    handleScore();
    dispatch(drawCard());
  };
  const handleResetGame = (e) => {
    addUserDetail();
    dispatch(resetGame());
  };
  const handleScore = (e) => {
    dispatch(addScore(scoreUp));
  };
  const handleLeaderBoard = (e) => {
    addUserDetail();
  };

  return (
    <div>
      {remainingCards > 0 ? (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-500 ">
          <h1 className="text-black text-2xl m-3">Hi {username}</h1>
          <h1 className="mt-4 text-black text-1xl ">Your draw</h1>
          <h1 className="text-black text-2xl h-28 w-28 bg-white flex justify-center items-center my-4 rounded-md ">
            {cardDrawn}
          </h1>
          <h3 className="text-black">Remaining Cards: {remainingCards}</h3>
          <button
            className="bg-black text-white p-2 rounded-md mt-4"
            onClick={handleDrawCard}
          >
            Draw Card
          </button>
        </div>
      ) : (
        <div className=" flex flex-col justify-center items-center min-h-screen bg-slate-500 ">
          <h1 className="text-black text-2xl m-3"> {username}</h1>

          <h1 className="text-black text-2xl ">{gameStatus} </h1>
          <h1 className="text-black text-2xl "> Score : {scoreUp} </h1>

          <div className="flex justify-center ">
            <button
              onClick={handleResetGame}
              className="bg-black text-white p-2 rounded-md m-3"
            >
              Play again
            </button>
            <Link
              onClick={handleLeaderBoard}
              to="/leaderboard"
              className=" bg-black text-white p-2 rounded-md m-3"
            >
              LeaderBoard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
