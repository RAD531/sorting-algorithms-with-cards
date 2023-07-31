/* eslint-disable
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";*/

var cardArr = [];

window.onload = () => {
  generateNewCards();
  sortButtonOnClick();
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

let sortButtonOnClick = () =>{
  document.getElementById("sortButton").addEventListener("click", function() {
    let sortOption = document.getElementById("sortOptionSet").value;

    if (sortOption === "Selection Sort"){
      selectionSort();
    }

    else if (sortOption === "Bubble Sort"){
      bubbleSort();
    }

    else if (sortOption === "Quick Sort"){

    }

    else if (sortOption === "Insertion Sort"){

    }
  })
};

let selectionSort = () => {
  if (cardArr.length < 2) {
    return;
  }

  let arr = cardArr.slice();
  console.log(JSON.stringify(cardArr));

  let rowParent = document.getElementById("card-populate-sort");
  rowParent.innerHTML = "";

  let rowChild = document.createElement("div");
  rowChild.className = "row p-3 d-flex justify-content-center";
  rowChild.id = "onHover";

  for (card of arr) {
    rowChild.innerHTML += card.getHTML().innerHTML;
  }

  let min = 0;
  while (min < arr.length - 1) {
    for (let i = min + 1; i < arr.length; i++) {
      if (arr[min].getIndexNumber() > arr[i].getIndexNumber()) {

        sortSwap(arr, min, i);

        let newRowChild = rowChild.cloneNode(true);
        sortSwapNode(newRowChild, min, i);

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

  let arr = cardArr.slice();
  console.log(JSON.stringify(cardArr));

  let rowParent = document.getElementById("card-populate-sort");
  rowParent.innerHTML = "";

  let rowChild = document.createElement("div");
  rowChild.className = "row p-3 d-flex justify-content-center";
  rowChild.id = "onHover";

  for (card of arr) {
    rowChild.innerHTML += card.getHTML().innerHTML;
  }
  
  let wall = arr.length - 1; //we start the wall at the end of the array
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      //compare the adjacent positions, if the right one is bigger, we have to swap
      if (arr[index].getIndexNumber() > arr[index + 1].getIndexNumber()) {
        sortSwap(arr, index, index + 1);

        let newRowChild = rowChild.cloneNode(true);
        sortSwapNode(newRowChild, index, index + 1);

        rowChild = newRowChild.cloneNode(true);
        rowParent.appendChild(newRowChild);
      }
      index++;
    }
    wall--; //decrease the wall for optimization
  }
};

let sortSwap = (arr, value1, value2) =>{
  let aux = arr[value1];
  arr[value1] = arr[value2];
  arr[value2] = aux;
}

let sortSwapNode = (parent, node1Index, node2Index) =>{
  let node1 = parent.childNodes[node1Index];
  let node2 = parent.childNodes[node2Index];

  const afterNode2 = node2.nextElementSibling;
  parent = node2.parentNode;
  node1.replaceWith(node2);
  parent.insertBefore(node1, afterNode2);
}