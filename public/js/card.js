class Card {

    indexNumber;
    internalNumber;
    indexSuit;
    cardStructure

    constructor() {
        this.cardStructure = document.createElement('div');
        this.cardStructure.innerHTML = this.#createHTMLStructure();
        this.#generateNewCard();
    }

    getHTML = () => {
        return this.cardStructure;
    }

    getIndexNumber = () => {
        return this.indexNumber;
    }

    getIndexSuit = () => {
        return this.indexSuit;
    }

    #generateNewCard = () => {
        this.internalNumber = this.#generateRandomNumber();
        this.indexSuit = this.#generateRandomSuit();
        this.indexNumber = this.#generateIndexBasedOnNumberAndSuit(this.indexNumber, this.indexSuit);

        this.#createCardDesign(this.internalNumber, this.indexSuit);
        this.#changeSpanFontSize();
    }

    #generateRandomNumber = () => {
        let numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        let internalNumbers = Math.floor(Math.random() * numbers.length);

        if (numbers[internalNumbers] === "J"){
            this.indexNumber = "11";
        }

        else if (numbers[internalNumbers] === "Q"){
            this.indexNumber = "12";
        }

        else if (numbers[internalNumbers] === "K"){
            this.indexNumber = "13";
        }

        else if (numbers[internalNumbers] === "A"){
            this.indexNumber = "14";
        }

        else{
            this.indexNumber = numbers[internalNumbers];
        }

        this.indexNumber = parseInt(this.indexNumber);

        return numbers[internalNumbers];
    }

    #generateRandomSuit = () => {
        var suit = ["diamond", "spade", "heart", "club"];
        let indexSuit = Math.floor(Math.random() * suit.length);
        return suit[indexSuit];
    }

    #generateIndexBasedOnNumberAndSuit = (num, suit) => {
        
        if (suit === "club"){
            num = num * 4;
        }

        else if (suit === "heart"){
            num = (num * 4) + 1;
        }

        else if (suit === "spade"){
            num = (num * 4) + 2;
        }

        else if (suit === "diamond"){
            num = (num * 4) + 3;
        }
        
        return num;
    }

    #setHeightAndWidth = () => {
        let cardElement = this.cardStructure.getElementById('card');
        let computedStyle = this.cardStructure.getComputedStyle(cardElement);

        let heightElem = this.cardStructure.getElementById("heightInput");
        let widthElem = this.cardStructure.getElementById("widthInput");

        heightElem.value = parseInt(computedStyle.height, 10);
        widthElem.value = parseInt(computedStyle.width, 10);
    }

    #changeHeightAndWidth = () => {
        let card = this.cardStructure.getElementById('card');
        //let cardText = cardStructure.querySelector('#card span');

        this.cardStructure.getElementById("heightInput").addEventListener("input", function (e) {
            height = e.target.value;
            if (height < 150) {
                height = 150;
            }

            else if (height > 500) {
                height = 500;
            }

            height = height + "px";
            card.style.height = height;

            this.changeSpanFontSize();
        });

        this.cardStructure.getElementById("widthInput").addEventListener("input", function (e) {
            width = e.target.value;
            if (width < 150) {
                width = 150;
            }

            else if (width > 500) {
                width = 500;
            }


            width = width + "px";
            card.style.width = width;

            this.#changeSpanFontSize();
        });

        //cardText.style.lineHeight = card.style.height;
    };

    #changeSpanFontSize = () => {
        var spanElements = this.cardStructure.querySelectorAll('#card span');
        var cardElement = this.cardStructure.querySelector('#card');

        let height = cardElement.style.height;
        let width = cardElement.style.width;

        height = parseInt(height);
        width = parseInt(width);

        let fontSize = width * height * 0.0005;

        if (fontSize > 60) {
            fontSize = 60;
        }

        spanElements.forEach(function (span) {
            span.style.fontSize = fontSize + "px";
        });
    }

    #createCardDesign = (internalNumber, indexSuit) => {
        this.#createSuitDesign(internalNumber, indexSuit);
        this.#createNumberDesign(internalNumber, indexSuit, "#card-top-left", 10, 25, false);
        this.#createNumberDesign(internalNumber, indexSuit, "#card-bottom-right", 90, 75, true);
    }

    #createNumberDesign = (internalNumber, indexSuit, className, topNumberPos, topSuitPos, rotate) => {
        let cornerElement = this.cardStructure.querySelector(className);

        let numberElement = document.createElement("span");
        numberElement.textContent = internalNumber;
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
        let suitElement = this.#createSuitElement(indexSuit, 0, rotate, [`${topSuitPos}`, "50"]);
        suitElement.style.top = topSuitPos + "%";
        cornerElement.appendChild(suitElement);
    }

    #createSuitDesign = (internalNumber, indexSuit) => {
        let cardSuitRow = this.cardStructure.querySelector("#card-suit");

        if (cardSuitRow.childNodes.length > 0) {
            while (cardSuitRow.firstChild) {
                cardSuitRow.removeChild(cardSuitRow.firstChild);
            }
        }

        let numOfRowsArr = [];
        let numOfAbsolutePos = 0;

        if (internalNumber === "A" || internalNumber === "J" || internalNumber === "Q" || internalNumber === "K") {
            numOfRowsArr.push(1);
        }

        if (internalNumber === "2") {
            numOfRowsArr.push(1);
            numOfRowsArr.push(0);
            numOfRowsArr.push(1);
        }

        else if (internalNumber === "3") {
            numOfRowsArr.push(1);
            numOfRowsArr.push(1);
            numOfRowsArr.push(1);
        }

        else if (internalNumber === "4") {
            numOfRowsArr.push(2);
            numOfRowsArr.push(0);
            numOfRowsArr.push(2);
        }

        else if (internalNumber === "5") {
            numOfRowsArr.push(2);
            numOfRowsArr.push(1);
            numOfRowsArr.push(2);
        }

        else if (internalNumber === "6") {
            numOfRowsArr.push(2);
            numOfRowsArr.push(2);
            numOfRowsArr.push(2);
        }

        else if (internalNumber === "7") {
            numOfRowsArr.push(2);
            numOfRowsArr.push(1);
            numOfRowsArr.push(2);
            numOfRowsArr.push(2);
        }

        else if (internalNumber === "8") {
            numOfRowsArr.push(2);
            numOfRowsArr.push(1);
            numOfRowsArr.push(2);
            numOfRowsArr.push(1);
            numOfRowsArr.push(2);
        }

        else if (internalNumber === "9") {
            numOfRowsArr.push(2);
            numOfRowsArr.push(2);
            numOfRowsArr.push(1);
            numOfRowsArr.push(2);
            numOfRowsArr.push(2);

            numOfAbsolutePos = 1;
        }

        else if (internalNumber === "10") {
            numOfRowsArr.push(2);
            numOfRowsArr.push(1);
            numOfRowsArr.push(2);
            numOfRowsArr.push(2);
            numOfRowsArr.push(1);
            numOfRowsArr.push(2);

            numOfAbsolutePos = 2;
        }


        this.#createCardSuitRow(cardSuitRow, numOfRowsArr, indexSuit, internalNumber, numOfAbsolutePos);
    }


    #createCardSuitRow = (cardSuitParentRow, numOfRowsArr, indexSuit, internalNumber, numOfAbsolutePos) => {

        let indexAbsolute = 0;

        for (let row = 0; row < numOfRowsArr.length; row++) {

            let rotate = false;

            //rotate if at bottom, rotate 180
            if (row >= numOfRowsArr.length / 2) {
                rotate = true;
            }

            if (internalNumber === "9" && numOfRowsArr[row] === 1) {
                cardSuitParentRow.appendChild(this.#createSuitElement(indexSuit, 0, rotate, internalNumber, ["50", "50"]));
                indexAbsolute++;
                continue;
            }

            if (internalNumber === "10" && numOfRowsArr[row] === 1) {
                if (indexAbsolute === 0) {
                    cardSuitParentRow.appendChild(this.#createSuitElement(indexSuit, 0, rotate, ["30", "50"]));
                }

                else if (indexAbsolute === 1) {
                    cardSuitParentRow.appendChild(this.#createSuitElement(indexSuit, 0, rotate, ["70", "50"]));
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

                if (internalNumber === "J" || internalNumber === "Q" || internalNumber === "K") {
                    //cardSuitParentRow.childNodes[row].appendChild(createPictureElement(indexSuit, internalNumber));
                    cardSuitParentRow.childNodes[row].className += " m-0 p-0";
                    cardSuitParentRow.childNodes[row].style.backgroundImage = `url('img/${internalNumber}_${indexSuit}.png')`;
                    cardSuitParentRow.childNodes[row].style.backgroundRepeat = "no-repeat";
                    cardSuitParentRow.childNodes[row].style.backgroundSize = "cover";
                    cardSuitParentRow.childNodes[row].style.backgroundPosition = "center";
                }

                else {
                    cardSuitParentRow.childNodes[row].appendChild(this.#createSuitElement(indexSuit, 100 / numOfRowsArr[row], rotate));
                }
            }
        }
    }

    #createPictureElement = (indexSuit, internalNumber) => {
        let newElement = this.cardStructure.createElement("img");
        newElement.src = `img/${internalNumber}_${indexSuit}.png`;
        newElement.className = "img-fluid object-fit-contain border rounded";

        return newElement;
    }

    #createSuitElement = (indexSuit, width, rotate, absolutePos) => {

        let newElement = document.createElement("span");
        newElement.id = `card-suit-${indexSuit}`;
        newElement.textContent = this.#getSuitSymbol(indexSuit);

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

    #getSuitSymbol = (indexSuit) => {
        if (indexSuit === "spade") return " \u2660";
        if (indexSuit === "club") return " \u2663";
        if (indexSuit === "heart") return " \u2665";
        if (indexSuit === "diamond") return " \u2666";
    };

    #createHTMLStructure = () => {
        return `<div class="col-3 border rounded border border-dark m-2" id="card" style="background: white;
        width: 150px; height:150px; font-size: 60px;">
          <div class="row h-100">
            <div class="col-2 position-relative" id="card-top-left">

            </div>
            <div class="col-8 position-relative" id="card-suit">

            </div>
            <div class="col-2 position-relative" id="card-bottom-right">
            </div>
          </div>
        </div>`
    }
}
