/* eslint-disable
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";*/

var lastSuitName;

window.onload = () => {
  let number = generateRandomNumber();
  let suit = generateRandomSuit();

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
  let cardElement = document.getElementById('card');
  let computedStyle = window.getComputedStyle(cardElement);

  let heightElem = document.getElementById("heightInput");
  let widthElem = document.getElementById("widthInput");

  heightElem.value = parseInt(computedStyle.height, 10);
  widthElem.value = parseInt(computedStyle.width, 10);
}

let changeHeightAndWidth = () => {
  let card = document.getElementById('card');
  //let cardText = document.querySelector('#card span');

  document.getElementById("heightInput").addEventListener("input", function (e) {
    height = e.target.value;
    if (height < 150) {
      height = 150;
    }

    else if (height > 500){
      height = 500;
    }

    height = height + "px";
    card.style.height = height;

    changeSpanFontSize();
  });

  document.getElementById("widthInput").addEventListener("input", function (e) {
    width = e.target.value;
    if (width < 150) {
      width = 150;
    }

    else if (width > 500){
      width = 500;
    }


    width = width + "px";
    card.style.width = width;

    changeSpanFontSize();
  });

  //cardText.style.lineHeight = card.style.height;
};

let changeSpanFontSize = () =>{
  var spanElements = document.querySelectorAll('#card span');
  var cardElement = document.getElementById('card');

  let height = cardElement.style.height;
  let width = cardElement.style.width;

  height = parseInt(height);
  width = parseInt(width);

  let fontSize = width * height * 0.0005;

  if (fontSize > 60){
    fontSize = 60;
  }

  spanElements.forEach(function(span) {
    span.style.fontSize = fontSize + "px";
  });
}

let generateNewCard = () => {
  let number = generateRandomNumber();
  let suit = generateRandomSuit();
  createCardDesign(number, suit);
  changeSpanFontSize();
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

let createCardDesign = (indexNumber, indexSuit) => {
  createSuitDesign(indexNumber, indexSuit);
  createNumberDesign(indexNumber, indexSuit, "card-top-left", 10, 25, false);
  createNumberDesign(indexNumber, indexSuit, "card-bottom-right", 90, 75, true);
}

let createNumberDesign = (indexNumber, indexSuit, className, topNumberPos, topSuitPos, rotate) => {
  let cornerElement = document.getElementById(className);

  let numberElement = document.createElement("span");
  numberElement.textContent = indexNumber;
  numberElement.className = `position-absolute top-${topNumberPos} start-50`;
  numberElement.id = `card-suit-${indexSuit}`;
  numberElement.style.top = topNumberPos + "%";
  numberElement.style.transform = "translate(-50%, -50%)";

  if (rotate) {
    numberElement.style.transform += "rotate(180deg)";
  }

  if (cornerElement.childNodes.length > 0) {
    while (cornerElement.firstChild) {
      cornerElement.removeChild(cornerElement.firstChild);
    }
  }

  cornerElement.appendChild(numberElement);
  let suitElement = createSuitElement(indexSuit, 0, rotate, [`${topSuitPos}`, "50"]);
  suitElement.style.top = topSuitPos + "%";
  cornerElement.appendChild(suitElement);
}

let createSuitDesign = (indexNumber, indexSuit) => {
  let cardSuitRow = document.getElementById("card-suit");

  if (cardSuitRow.childNodes.length > 0) {
    while (cardSuitRow.firstChild) {
      cardSuitRow.removeChild(cardSuitRow.firstChild);
    }
  }

  let numOfRowsArr = [];
  let numOfAbsolutePos = 0;

  if (indexNumber === "A" || indexNumber === "J" || indexNumber === "Q" || indexNumber === "K") {
    numOfRowsArr.push(1);
  }

  if (indexNumber === "2") {
    numOfRowsArr.push(1);
    numOfRowsArr.push(0);
    numOfRowsArr.push(1);
  }

  else if (indexNumber === "3") {
    numOfRowsArr.push(1);
    numOfRowsArr.push(1);
    numOfRowsArr.push(1);
  }

  else if (indexNumber === "4") {
    numOfRowsArr.push(2);
    numOfRowsArr.push(0);
    numOfRowsArr.push(2);
  }

  else if (indexNumber === "5") {
    numOfRowsArr.push(2);
    numOfRowsArr.push(1);
    numOfRowsArr.push(2);
  }

  else if (indexNumber === "6") {
    numOfRowsArr.push(2);
    numOfRowsArr.push(2);
    numOfRowsArr.push(2);
  }

  else if (indexNumber === "7") {
    numOfRowsArr.push(2);
    numOfRowsArr.push(1);
    numOfRowsArr.push(2);
    numOfRowsArr.push(2);
  }

  else if (indexNumber === "8") {
    numOfRowsArr.push(2);
    numOfRowsArr.push(1);
    numOfRowsArr.push(2);
    numOfRowsArr.push(1);
    numOfRowsArr.push(2);
  }

  else if (indexNumber === "9") {
    numOfRowsArr.push(2);
    numOfRowsArr.push(2);
    numOfRowsArr.push(1);
    numOfRowsArr.push(2);
    numOfRowsArr.push(2);

    numOfAbsolutePos = 1;
  }

  else if (indexNumber === "10") {
    numOfRowsArr.push(2);
    numOfRowsArr.push(1);
    numOfRowsArr.push(2);
    numOfRowsArr.push(2);
    numOfRowsArr.push(1);
    numOfRowsArr.push(2);

    numOfAbsolutePos = 2;
  }


  createCardSuitRow(cardSuitRow, numOfRowsArr, indexSuit, indexNumber, numOfAbsolutePos);
}


let createCardSuitRow = (cardSuitParentRow, numOfRowsArr, indexSuit, indexNumber, numOfAbsolutePos) => {

  let indexAbsolute = 0;

  for (let row = 0; row < numOfRowsArr.length; row++) {

    let rotate = false;

    //rotate if at bottom, rotate 180
    if (row >= numOfRowsArr.length / 2) {
      rotate = true;
    }

    if (indexNumber === "9" && numOfRowsArr[row] === 1) {
      cardSuitParentRow.appendChild(createSuitElement(indexSuit, 0, rotate, indexNumber, ["50", "50"]));
      indexAbsolute++;
      continue;
    }

    if (indexNumber === "10" && numOfRowsArr[row] === 1) {
      if (indexAbsolute === 0) {
        cardSuitParentRow.appendChild(createSuitElement(indexSuit, 0, rotate, ["30", "50"]));
      }

      else if (indexAbsolute === 1) {
        cardSuitParentRow.appendChild(createSuitElement(indexSuit, 0, rotate, ["70", "50"]));
      }

      indexAbsolute++;
      continue;
    }

    let newRow = document.createElement("div");
    newRow.className = "row align-items-center";

    let height = 100 / (numOfRowsArr.length - numOfAbsolutePos);
    height = height + "%";
    newRow.style.height = height;

    cardSuitParentRow.appendChild(newRow);

    for (let i = 0; i < numOfRowsArr[row]; i++) {

      if (indexNumber === "J" || indexNumber === "Q" || indexNumber === "K") {
        //cardSuitParentRow.childNodes[row].appendChild(createPictureElement(indexSuit, indexNumber));
        cardSuitParentRow.childNodes[row].className += " m-0 p-0";
        cardSuitParentRow.childNodes[row].style.backgroundImage = `url('img/${indexNumber}_${indexSuit}.png')`;
        cardSuitParentRow.childNodes[row].style.backgroundRepeat = "no-repeat";
        cardSuitParentRow.childNodes[row].style.backgroundSize = "cover";
        cardSuitParentRow.childNodes[row].style.backgroundPosition = "center";
      }

      else {
        cardSuitParentRow.childNodes[row].appendChild(createSuitElement(indexSuit, 100 / numOfRowsArr[row], rotate));
      }
    }
  }
}

let createPictureElement = (indexSuit, indexNumber) => {
  let newElement = document.createElement("img");
  newElement.src = `img/${indexNumber}_${indexSuit}.png`;
  newElement.className = "img-fluid object-fit-contain border rounded";

  return newElement;
}

let createSuitElement = (indexSuit, width, rotate, absolutePos) => {

  let newElement = document.createElement("span");
  newElement.id = `card-suit-${indexSuit}`;
  newElement.textContent = getSuitSymbol(indexSuit);

  if (absolutePos != null || absolutePos != undefined) {
    newElement.className = `position-absolute top-${absolutePos[0]} start-${absolutePos[1]}`;
    newElement.style.transform = "translate(-50%, -50%)";
  }

  else {
    width = width + "%";
    newElement.style.width = width;
  }

  if (rotate) {
    newElement.style.transform += "rotate(180deg)";
  }

  return newElement;
}

let getSuitSymbol = (indexSuit) => {
  if (indexSuit === "spade") return " \u2660";
  if (indexSuit === "club") return " \u2663";
  if (indexSuit === "heart") return " \u2665";
  if (indexSuit === "diamond") return " \u2666";
};