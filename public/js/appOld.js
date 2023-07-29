/* eslint-disable
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";*/

var lastSuitName;

window.onload = () => {
  setHeightAndWidth();
  changeHeightAndWidth();
  generateNewCard();
  createTimer();

};

let createTimer = () => {
  // Check the checkbox on load
  if (document.getElementById("toggleTimer").checked) {
    setTimer();
  }

  // Add an event listener to monitor changes to the checkbox
  document.getElementById("toggleTimer").addEventListener("change", function () {
    if (this.checked) {
      setTimer();
    }
    else {
      clearTimeout(window.cardTimer);
    }
  });
}

let setTimer = () => {
  window.cardTimer = setTimeout(() => {
    generateNewCard();
    setTimer(); // Re-set the timer to create the next card after 10 seconds
  }, 10000); // 10 seconds
};

let setHeightAndWidth = () => {
  let cardElement = document.querySelector('.card');
  let computedStyle = window.getComputedStyle(cardElement);

  let heightElem = document.getElementById("heightInput");
  let widthElem = document.getElementById("widthInput");

  heightElem.value = parseInt(computedStyle.height, 10);
  widthElem.value = parseInt(computedStyle.width, 10);
}

let changeHeightAndWidth = () => {
  let card = document.getElementById('card');
  let cardText = document.querySelector('.card span');

  document.getElementById("heightInput").addEventListener("input", function (e) {
    let height = e.target.value;
    if (height < 20){
      height = 20;
    }
    height = height + "px";
    card.style.height = height;
  });

  document.getElementById("widthInput").addEventListener("input", function (e) {
    let width = e.target.value;
    if (width < 100){
      width = 100;
    }
    width = width + "px";
    card.style.width = width;
  });

  cardText.style.lineHeight = card.style.height;
};


let generateNewCard = () => {
  if (lastSuitName != null || lastSuitName != undefined) {
    console.log(lastSuitName);
    document.querySelector('.card').classList.remove(lastSuitName);
  }

  lastSuitName = generateRandomSuit();
  document.querySelector('.card').classList.add(lastSuitName);
  document.querySelector('.card span').innerHTML = generateRandomNumber();
}

let generateRandomNumber = () => {
  let numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let indexNumbers = Math.floor(Math.random() * numbers.length);
  return numbers[indexNumbers];
}

let generateRandomSuit = () => {
  var suit = ["diamond", "spade", "heart", "club"];
  let indexSuit = Math.floor(Math.random() * suit.length);
  return suit[indexSuit];
}