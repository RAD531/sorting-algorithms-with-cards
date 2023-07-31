/* eslint-disable
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";*/

var cardArr = [];

window.onload = () => {
  generateNewCards();
};

let generateNewCards = () => {
  cardArr = [];
  let cardTotal = document.getElementById("numOfCards").value;

  cardTotal = parseInt(cardTotal);

  if (cardTotal === undefined || cardTotal === null || isNaN(cardTotal) || cardTotal < 0) {
    cardTotal = 1;
  }

  else if (cardTotal > 200) {
    cardTotal = 200;
  }

  document.getElementById("card-populate").innerHTML = "";

  for (let i = 0; i < cardTotal; i++) {
    let card = new Card();
    cardArr.push(card);
    document.getElementById("card-populate").innerHTML += card.getHTML().innerHTML;
  }
}

let selectionSort = () => {
  if (cardArr.length < 2) {
    return;
  }

  let rowParent = document.getElementById("card-populate-sort");
  rowParent.innerHTML = "";

  let rowChild = document.createElement("div");
  rowChild.className = "row p-3 d-flex justify-content-center";
  rowChild.id = "onHover";

  for (card of cardArr) {
    rowChild.innerHTML += card.getHTML().innerHTML;
  }

  let min = 0;
  while (min < cardArr.length - 1) {
    for (let i = min + 1; i < cardArr.length; i++) {
      if (cardArr[min].getIndexNumber() > cardArr[i].getIndexNumber()) {


        let aux = cardArr[min];
        cardArr[min] = cardArr[i];
        cardArr[i] = aux;

        let newRowChild = rowChild.cloneNode(true);
        let node1 = newRowChild.childNodes[min];
        let node2 = newRowChild.childNodes[i];

        const afterNode2 = node2.nextElementSibling;
        const parent = node2.parentNode;
        node1.replaceWith(node2);
        parent.insertBefore(node1, afterNode2);

        rowChild = newRowChild.cloneNode(true);
        rowParent.appendChild(newRowChild);
      }
    }
    min++;
  }
};

let bubbleSort = () => {

  if (cardArr.length < 2) {
    return;
  }

  let rowParent = document.getElementById("card-populate-sort");
  rowParent.innerHTML = "";

  let rowChild = document.createElement("div");
  rowChild.className = "row p-3 d-flex justify-content-center";
  rowChild.id = "onHover";

  for (card of cardArr) {
    rowChild.innerHTML += card.getHTML().innerHTML;
  }
  
  let wall = cardArr.length - 1; //we start the wall at the end of the array
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      //compare the adjacent positions, if the right one is bigger, we have to swap
      if (cardArr[index].getIndexNumber() > cardArr[index + 1].getIndexNumber()) {
        let aux = cardArr[index];
        cardArr[index] = cardArr[index + 1];
        cardArr[index + 1] = aux;

        let newRowChild = rowChild.cloneNode(true);
        let node1 = newRowChild.childNodes[index];
        let node2 = newRowChild.childNodes[index + 1];

        const afterNode2 = node2.nextElementSibling;
        const parent = node2.parentNode;
        node1.replaceWith(node2);
        parent.insertBefore(node1, afterNode2);

        rowChild = newRowChild.cloneNode(true);
        rowParent.appendChild(newRowChild);
      }
      index++;
    }
    wall--; //decrease the wall for optimization
  }
};