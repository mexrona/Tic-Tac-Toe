const mask = document.getElementById("mask");
const menu = document.getElementById("menu");
const start = document.getElementById("start");
const message = document.getElementById("message");

start.addEventListener("click", function () {
    menu.classList.add("hidden");
    mask.classList.add("hidden");
});

const renderMatrix = (element, width, height) => {
    const field = document.getElementById(element);
    const fragment = document.createDocumentFragment();

    const cellSize = parseInt(width);
    field.style.width = cellSize * 3 + "px";
    field.style.lineHeight = height;

    for (let i = 0; i < 9; i++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.style.width = width;
        div.style.height = height;

        fragment.appendChild(div);
    }

    field.appendChild(fragment);
};

renderMatrix("field", "100px", "100px");

const field = document.getElementsByClassName("cell");
let movePlayer = true;
let game = true;

for (let i = 0; i < field.length; i++) {
    field[i].addEventListener("click", function () {
        if (!game && this.classList.contains("clicked")) return;

        const notClickedCells = document.querySelectorAll(
            ".cell:not(.clicked)"
        );

        if (notClickedCells.length === 1) {
            ending({win: "Ничья!"});
        } else {
            movePlayer ? firstPlayer(this) : secondPlayer(this);
        }
    });
}

const firstPlayer = (that) => {
    if (that.innerHTML == "") {
        that.classList.add("clicked");
        that.classList.add("clicked-x");
        that.innerHTML = "x";
    }

    const result = checkMap();

    if (result.val) {
        game = false;

        setTimeout(() => {
            ending(result);
        }, 10);
    }

    movePlayer = !movePlayer;
};

const secondPlayer = (that) => {
    if (that.innerHTML == "") {
        that.classList.add("clicked");
        that.classList.add("clicked-0");
        that.innerHTML = "0";
    }

    const result = checkMap();

    if (result.val) {
        game = false;

        setTimeout(() => {
            ending(result);
        }, 10);
    }

    movePlayer = !movePlayer;
};

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const checkMap = () => {
    const items = Array.from(document.querySelectorAll(".cell")).map(
        (cell) => cell.innerHTML
    );

    for (let i = 0; i < winningCombinations.length; i++) {
        const winningCombination = winningCombinations[i];
        let innerOne =
            items[
                winningCombination[
                    winningCombination.length - winningCombination.length
                ]
            ];
        let innerTwo = items[winningCombination[winningCombination.length - 2]];
        let innerThree =
            items[winningCombination[winningCombination.length - 1]];

        if (innerOne === "x" && innerTwo === "x" && innerThree === "x") {
            return {val: true, win: "Победили КРЕСТИКИ!"};
        }

        if (innerOne === "0" && innerTwo === "0" && innerThree === "0") {
            return {val: true, win: "Победили НОЛИКИ!"};
        }
    }

    return {val: false};
};

const ending = (scenario) => {
    message.classList.add("no-hidden");
    message.innerHTML = scenario.win;
    mask.classList.remove("hidden");

    setTimeout(() => {
        message.classList.remove("no-hidden");
        menu.classList.remove("hidden");

        for (let i = 0; i < field.length; i++) {
            field[i].innerHTML = "";

            if (field[i].classList.contains("clicked")) {
                field[i].classList.remove("clicked");
            }

            if (field[i].classList.contains("clicked-x")) {
                field[i].classList.remove("clicked-x");
            }

            if (field[i].classList.contains("clicked-0")) {
                field[i].classList.remove("clicked-0");
            }
        }
    }, 3000);
};
