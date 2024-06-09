// src/components/Button.js
import React from "react";
import rockImage from "../assets/icon-rock.svg";
import paperImage from "../assets/icon-paper.svg";
import scissorsImage from "../assets/icon-scissors.svg";

const images = {
  rock: rockImage,
  paper: paperImage,
  scissors: scissorsImage,
};

const Button = ({ type, onClick }) => {
  return (
    <button className={`button ${type}`} onClick={() => onClick(type)}>
      <img src={images[type]} alt={type} className="choice-image" />
    </button>
  );
};

export default Button;
