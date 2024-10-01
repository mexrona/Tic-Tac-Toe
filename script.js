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
        const notClickedCells = document.querySelectorAll(
            ".cell:not(.clicked)"
        );

        if (notClickedCells.length === 1) {
            ending({win: "Ничья!"});
        }

        if (!this.classList.contains("clicked")) {
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

const checkMap = () => {
    const block = document.querySelectorAll(".cell");
    const items = [];

    for (let i = 0; i < block.length; i++) {
        items.push(block[i].innerHTML);
    }

    if (
        (items[0] == "x" && items[1] == "x" && items[2] == "x") ||
        (items[3] == "x" && items[4] == "x" && items[5] == "x") ||
        (items[6] == "x" && items[7] == "x" && items[8] == "x") ||
        (items[0] == "x" && items[3] == "x" && items[6] == "x") ||
        (items[1] == "x" && items[4] == "x" && items[7] == "x") ||
        (items[2] == "x" && items[5] == "x" && items[8] == "x") ||
        (items[0] == "x" && items[4] == "x" && items[8] == "x") ||
        (items[6] == "x" && items[4] == "x" && items[2] == "x")
    )
        return {val: true, win: "Победил первый игрок!"};
    if (
        (items[0] == "0" && items[1] == "0" && items[2] == "0") ||
        (items[3] == "0" && items[4] == "0" && items[5] == "0") ||
        (items[6] == "0" && items[7] == "0" && items[8] == "0") ||
        (items[0] == "0" && items[3] == "0" && items[6] == "0") ||
        (items[1] == "0" && items[4] == "0" && items[7] == "0") ||
        (items[2] == "0" && items[5] == "0" && items[8] == "0") ||
        (items[0] == "0" && items[4] == "0" && items[8] == "0") ||
        (items[6] == "0" && items[4] == "0" && items[2] == "0")
    )
        return {val: true, win: "Победил второй игрок!"};

    return {val: false};
};

const ending = (scenario) => {
    message.classList.add("no-hidden");
    message.innerHTML = scenario.win;
    mask.classList.remove("hidden");

    setTimeout(() => {
        location.reload();
    }, 3000);
};
