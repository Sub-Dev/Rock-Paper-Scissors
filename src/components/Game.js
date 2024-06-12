import React, { useState, useEffect } from "react";
import Button from "./Button";
import Score from "./Score";
import Modal from "./Modal";
import triangleImage from "../assets/triangle.svg";
import rulesImage from "../assets/image-rules.svg";
import closeImage from "../assets/icon-close.svg";
import rockImage from "../assets/icon-rock.svg";
import paperImage from "../assets/icon-paper.svg";
import scissorsImage from "../assets/icon-scissors.svg";

const images = {
  rock: rockImage,
  paper: paperImage,
  scissors: scissorsImage,
};

const Game = () => {
  const [open, setOpen] = useState(false);

  const getStoredData = () => {
    const storedScore = Number(localStorage.getItem("score"));
    const storedTimestamp = Number(localStorage.getItem("scoreTimestamp"));

    if (storedScore && storedTimestamp) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - storedTimestamp;

      const expirationTime = 10 * 60 * 1000;

      if (timeDifference > expirationTime) {
        localStorage.removeItem("score");
        localStorage.removeItem("scoreTimestamp");
        return 0;
      } else {
        return storedScore;
      }
    }
    return 0;
  };

  const initialScore = getStoredData();
  const [score, setScore] = useState(initialScore);

  const [message, setMessage] = useState("");
  const [currentScreen, setCurrentScreen] = useState("game");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const choices = ["rock", "paper", "scissors"];

  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  const addWinCssComputer = () => {
    const styleElement = document.createElement("style");
    styleElement.id = "win-css-computer-style";
    styleElement.innerHTML = `
    .result-computer::before {
      content: "";
      position: absolute;
      border-radius: 50%;
      top: -130%;
      left: -130%;
      right: -130%;
      bottom: -130%;
      background-image: repeating-radial-gradient(
        circle,
        transparent,
        #2b3956 20%,
        #253453 20%,
        #223351 20%
      );
      z-index: -1;
    }
    `;
    document.head.appendChild(styleElement);
  };

  const removeWinCssComputer = () => {
    const styleElement = document.getElementById("win-css-computer-style");
    if (styleElement) {
      styleElement.remove();
    }
  };

  const addWinCssUser = () => {
    const styleElement = document.createElement("style");
    styleElement.id = "win-css-user-style";
    styleElement.innerHTML = `
    .result-user::before {
      content: "";
      position: absolute;
      border-radius: 50%;
      top: -130%;
      left: -130%;
      right: -130%;
      bottom: -130%;
      background-image: repeating-radial-gradient(
        circle,
        transparent,
        #2b3956 20%,
        #253453 20%,
        #223351 20%
      );
      z-index: -1;
    }
    `;
    document.head.appendChild(styleElement);
  };

  const removeWinCssUser = () => {
    const styleElement = document.getElementById("win-css-user-style");
    if (styleElement) {
      styleElement.remove();
    }
  };

  const playGame = (userChoice) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    setUserChoice(userChoice);
    setComputerChoice(computerChoice);
    if (userChoice === computerChoice) {
      setMessage("IT'S A TIE");
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "scissors" && computerChoice === "paper") ||
      (userChoice === "paper" && computerChoice === "rock")
    ) {
      setScore((prevScore) => prevScore + 1);
      setMessage("YOU WIN");
      addWinCssUser();
    } else {
      setScore((prevScore) => (prevScore > 0 ? prevScore - 1 : 0));
      setMessage("YOU LOSE");
      addWinCssComputer();
    }
    setCurrentScreen("result");
  };

  const handleBack = () => {
    removeWinCssUser();
    removeWinCssComputer();
    setCurrentScreen("game");
  };

  useEffect(() => {
    const currentTime = new Date().getTime();
    localStorage.setItem("score", score);
    localStorage.setItem("scoreTimestamp", currentTime);
  }, [score]);

  return (
    <div className="game-container">
      <div>
        <div className="rock-paper-scissors-scoreboard">
          <h1 className="game-title">ROCK PAPER SCISSORS</h1>
          <Score score={score} />
        </div>
        {currentScreen === "game" && (
          <div className="triangle-container">
            <img src={triangleImage} alt="Triangle" className="triangle" />
            <div className="choices-container">
              {choices.map((choice) => (
                <Button
                  key={choice}
                  type={choice}
                  onClick={() => playGame(choice)}
                />
              ))}
            </div>
          </div>
        )}
        {currentScreen === "result" && (
          <div className="container-results">
            <h3 className="user-choice-text">YOU PICKED</h3>
            <div className={`result-user ${userChoice}`}>
              <img
                src={images[userChoice]}
                alt={userChoice}
                className="choice-image-user"
              />
            </div>
            <h3 className="computer-choice-text">THE HOUSE PICKED</h3>
            <div className={`result-computer ${computerChoice}`}>
              <img
                src={images[computerChoice]}
                alt={computerChoice}
                className="choice-image-computer"
              />
            </div>
            <div className="container-play-again">
              <h1>{message}</h1>

              <button className="play-again-button" onClick={handleBack}>
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
        <button className="rules-button" onClick={handleOpen}>
          RULES
        </button>
        <Modal isOpen={open} onClose={handleClose}>
          <>
            <h2 className="rules-title">RULES</h2>
            <img src={closeImage} alt="close" className="closeImage" />
            <img src={rulesImage} alt="rules" className="rulesImage" />
          </>
        </Modal>
      </div>
    </div>
  );
};

export default Game;
