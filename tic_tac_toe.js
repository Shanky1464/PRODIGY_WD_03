var xo = 1;
var xo_button = document.getElementById("ox");
const text = document.getElementById("text");
var arry = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
var X = [];
var O = [];
var processed = [];
var variable = "x";
var gameOver = false;  // Flag to indicate if the game is over

const winningCombinations = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
];

xo_button.onclick = () => {
    if (gameOver) return; // Prevent changing play mode if the game is over

    xo = (xo + 1) % 2;
    if (xo % 2 == 0) {
        xo_button.innerText = "Play as X";
        text.innerText = "Playing as O";
        variable = "o";
    } else {
        xo_button.innerText = "Play as O";
        text.innerText = "Playing as X";
        variable = 'x';
    }
}

function handleBlockClick(block) {
    block.addEventListener("click", () => {
        // Check if the game is over or the block has already been clicked
        if (gameOver || block.dataset.check === "true") return;

        block.style.backgroundColor = "";
        setTimeout(() => {
            xo_button.disabled = true;

            try {
                arry.pop(block.dataset.num);
            } catch (error) {}

            if (xo % 2 == 1 && block.dataset.check == "false") {
                block.style.backgroundColor = "white";
                block.style.color = 'black';
                block.innerHTML = "X";
                X.push(block.dataset.num);
                block.dataset.check = "true";
                xo += 1;
            }
            if (xo % 2 == 0 && block.dataset.check == "false") {
                block.style.backgroundColor = "white";
                block.style.color = 'black';
                block.innerHTML = "O";
                O.push(block.dataset.num);
                block.dataset.check = "true";
                xo += 1;
            }
            processed.push(block.dataset.num);
            if (arry.length == 0 && !checkWin(X) && !checkWin(O)) {
                text.innerText = "Draw!!";
                disableAllBlocks();
                gameOver = true;  // Set game over flag
            }
            if (checkWin(X)) {
                console.log('X wins');
                text.innerText = "X wins!";
                disableAllBlocks();
                gameOver = true;  // Set game over flag
            }
            if (checkWin(O)) {
                console.log('O wins');
                text.innerText = "O wins!";
                disableAllBlocks();
                gameOver = true;  // Set game over flag
            }
        });
    });
}

function checkWin(playerSelections) {
    return winningCombinations.some(combination => {
        if (combination.every(number => playerSelections.includes(number))) {
            combination.forEach(number => {
                const block = document.getElementById(`block${number}`);
                block.style.backgroundColor = "lightgreen";
            });
            return true;
        }
        return false;
    });
}

function reverseclick(block) {
    setTimeout(() => {
        block.style.backgroundColor = "black";
        block.innerHTML = "<p></p>";
        xo_button.disabled = false;
        block.dataset.check = "false";
        arry = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        X = [];
        O = [];
        processed = [];
        if (variable == 'x') {
            xo = 1;
        } else {
            xo = 0;
        }
        gameOver = false;  // Reset game over flag
    });
}

function disableAllBlocks() {
    for (let i = 1; i <= 9; i++) {
        const block = document.getElementById(`block${i}`);
        block.dataset.check = "true";  // Disable all blocks
    }
}

for (let i = 1; i <= 9; i++) {
    const block = document.getElementById(`block${i}`);
    handleBlockClick(block);
}

var button = document.getElementById("button");
button.onclick = () => {
    for (let i = 1; i <= 9; i++) {
        const block = document.getElementById(`block${i}`);
        reverseclick(block);
    }
    text.innerText = "Playing as X";
}
