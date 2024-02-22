import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUsername } from "../features/userDetails";

function Home() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (username.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [username]);

  // handler function for the username
  const handleUsername = (e) => {
    dispatch(addUsername(username));
  };

  // async function for adding user details to the backend
  const addUserDetail = async () => {
    await fetch("http://localhost:8000/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        score: 0,
      }),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
    handleUsername();
  };

  return (
    <div className="flex flex-col justify-center items-center  min-h-screen bg-slate-500 text-white ">
      <h1 className="text-3xl text-black">Welcome to the card game</h1>
      <label htmlFor="username" className="text-black text-2xl m-3">
        {" "}
        Enter user name to Start
      </label>
      <input
        className="text-black  p-2 rounded-md"
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {isActive && (
        <Link
          onClick={addUserDetail}
          to="/game"
          className=" bg-black text-white p-2 rounded-md mt-4"
        >
          Start
        </Link>
      )}
    </div>
  );
}

export default Home;
