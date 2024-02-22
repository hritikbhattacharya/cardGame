import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetGame } from "../features/gameSlice";
import { Link } from "react-router-dom";

function LeaderBoard() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  // async function for fetching data from backend
  const userList = async () => {
    await fetch("http://localhost:8000/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => b.score - a.score);
        setData(sortedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Handler function for the reset button
  const handleResetGame = (e) => {
    dispatch(resetGame());
  };

  useEffect(() => {
    userList();
    const intervalId = setInterval(userList, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-500">
      <h1 className="text-3xl text-black">Leader board</h1>
      {data.map((user) => {
        return (
          <div
            key={user.username}
            className="flex flex-row justify-around items-center w-52 bg-gray-600 mt-3 p-2 text-white rounded"
          >
            <h1 className="mx-5">{user.username}</h1>
            <h2 className="mx-5">{user.score}</h2>
          </div>
        );
      })}
      <Link
        onClick={handleResetGame}
        to="/"
        className=" bg-black text-white p-2 rounded-md m-3"
      >
        Play
      </Link>
    </div>
  );
}

export default LeaderBoard;
