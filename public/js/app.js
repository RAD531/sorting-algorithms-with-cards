/* eslint-disable
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";*/

var cardArr = [];

window.onload = () => {
  generateNewCards();
  sortButtonOnClick();
  setChangeHeightAndWidth();
  changeHeightAndWidth();
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

let sortButtonOnClick = () => {
  document.getElementById("sortButton").addEventListener("click", function () {
    let sortOption = document.getElementById("sortOptionSet").value;

    if (sortOption === "Selection Sort") {
      selectionSort();
    }

    else if (sortOption === "Bubble Sort") {
      bubbleSort();
    }
  })
};

let selectionSort = () => {
  if (cardArr.length < 2) {
    return;
  }

  let arr = cardArr.slice();
  let { rowParent, rowChild, headingIndex } = createRowElements(arr);
  let count = 0;
  let min = 0;

  while (min < arr.length - 1) {
    for (let i = min + 1; i < arr.length; i++) {
      if (arr[min].getIndexNumber() > arr[i].getIndexNumber()) {

        count++;
        sortSwap(arr, min, i);

        let newRowChild = rowChild.cloneNode(true);
        newRowChild.removeChild(newRowChild.firstChild);

        sortSwapNode(newRowChild, min, i);

        let headingIndexClone = headingIndex.cloneNode(true); // Create a new deep clone of the heading element
        headingIndexClone.innerHTML = "Iteration " + count; // Set the innerHTML of the cloned heading element
        newRowChild.insertBefore(headingIndexClone, newRowChild.firstChild);

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
  let { rowParent, rowChild, headingIndex } = createRowElements(arr);
  let count = 0;
  let wall = arr.length - 1; //we start the wall at the end of the array
  
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      //compare the adjacent positions, if the right one is bigger, we have to swap
      if (arr[index].getIndexNumber() > arr[index + 1].getIndexNumber()) {
        count++;
        sortSwap(arr, index, index + 1);

        let newRowChild = rowChild.cloneNode(true);
        newRowChild.removeChild(newRowChild.firstChild);
        sortSwapNode(newRowChild, index, index + 1);

        let headingIndexClone = headingIndex.cloneNode(true); // Create a new deep clone of the heading element
        headingIndexClone.innerHTML = "Iteration " + count; // Set the innerHTML of the cloned heading element
        newRowChild.insertBefore(headingIndexClone, newRowChild.firstChild);

        rowChild = newRowChild.cloneNode(true);
        rowParent.appendChild(newRowChild);
      }
      index++;
    }
    wall--; //decrease the wall for optimization
  }
};

let createRowElements = (arr) => {
  let rowParent = document.getElementById("card-populate-sort");
  rowParent.innerHTML = "";

  let rowChild = document.createElement("div");
  rowChild.className = "row p-3 d-flex justify-content-center";
  rowChild.id = "onHover";

  let headingIndex = document.createElement("h5");
  headingIndex.className = "text-light";
  rowChild.append(headingIndex);

  for (card of arr) {
    rowChild.innerHTML += card.getHTML().innerHTML;
  }

  rowParent.appendChild(rowChild);

  return { rowParent, rowChild, headingIndex };
};

let sortSwap = (arr, value1, value2) => {
  let aux = arr[value1];
  arr[value1] = arr[value2];
  arr[value2] = aux;
}

let sortSwapNode = (parent, node1Index, node2Index) => {
  let node1 = parent.childNodes[node1Index];
  let node2 = parent.childNodes[node2Index];

  const afterNode2 = node2.nextElementSibling;
  parent = node2.parentNode;
  node1.replaceWith(node2);
  parent.insertBefore(node1, afterNode2);
}

let setChangeHeightAndWidth = () => {
  document.documentElement.style.setProperty('--cardHeight', "150px");
  document.documentElement.style.setProperty('--cardWidth', "150px");
  document.documentElement.style.setProperty('--spanFontSize', "20px");
}

let changeHeightAndWidth = () => {

  document.getElementById("heightInput").addEventListener("input", function (e) {
    height = e.target.value;
    if (height < 150) {
      height = 150;
    }

    else if (height > 500) {
      height = 500;
    }

    height = height + "px";
    document.documentElement.style.setProperty('--cardHeight', `${height}`);

    changeSpanFontSize();
  });

  document.getElementById("widthInput").addEventListener("input", function (e) {
    width = e.target.value;
    if (width < 150) {
      width = 150;
    }

    else if (width > 500) {
      width = 500;
    }

    width = width + "px";
    document.documentElement.style.setProperty('--cardWidth', `${width}`);

    changeSpanFontSize();
  });

};

let changeSpanFontSize = () => {
  let cardElement = document.getElementById('card');
  let height = getComputedStyle(cardElement).getPropertyValue('--cardHeight');
  let width = getComputedStyle(cardElement).getPropertyValue('--cardWidth');

  height = parseInt(height);
  width = parseInt(width);

  let fontSize = width * height * 0.0005;

  if (fontSize > 60) {
    fontSize = 60;
  }

  document.documentElement.style.setProperty('--spanFontSize', `${fontSize + "px"}`);
}