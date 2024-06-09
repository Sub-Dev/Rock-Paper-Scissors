import React, { useState } from "react";
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
  const [open, setOpen] = React.useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [currentScreen, setCurrentScreen] = useState("game"); // new state variable

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const choices = ["rock", "paper", "scissors"];

  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

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
      setScore(score + 1);
      setMessage("YOU WIN");
    } else {
      if (score === 0) {
        setMessage("YOU LOSE");
      } else setScore(score - 1);
      setMessage("YOU LOSE");
    }
    setCurrentScreen("result"); // navigate to result screen
  };

  const handleBack = () => {
    setCurrentScreen("game"); // navigate back to game screen
  };

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
