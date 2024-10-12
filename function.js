let boxes = document.querySelectorAll(".box");
let body = document.querySelector(".body");
let rstBtn = document.querySelector("#resetBtn");
let submitBtn = document.querySelector(".submit");
let player1 = document.getElementById("input1");
let player2 = document.getElementById("input2");
let player1Name = document.getElementById("playerName1");
let player2Name = document.getElementById("playerName2");
let mainContentEl = document.getElementById("mainContent");
let inputContentEl = document.getElementById("inputContent");
let msg = document.getElementById("msgContainer");
let nwBtn = document.querySelector("#newGame");

let turnO = true;
let logIn = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Id Function 

submitBtn.addEventListener("click", () => {
    logIn = true;
    let value = player1.value;
    console.log(value);

    if (player1.value != "" && player2.value != "") {
        mainContentEl.classList.toggle("display");
        inputContentEl.classList.add("display");
        player1Name.textContent = player1.value;
        player2Name.textContent = " ";
    } else {
        if (player1.value === "") {
            alert("Fill the Player1 Name");
        } else {
            alert("Fill the Player 2 Name");
        }
    }
});

// Game Function 

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.textContent = "";
    }
};

const resetGame = () => {
    player1Name.textContent = player1.value;
    player2Name.textContent = "";
    turnO = true;
    enabledBoxes();
    msg.textContent = ""
    msg.classList.add("display");
    body.classList.remove("color");
};

const newGameBtn = () => {
    mainContentEl.classList.toggle("display");
    inputContentEl.classList.remove("display");
    player1.value = "";
    player2.value = "";
    resetGame();
}

const showWinner = winner => {
    for(box of boxes){
        box.disabled = true;
    }
    msg.classList.remove("display");
     player1Name.textContent = "";
     player2Name.textContent = "";
    if(winner === "O"){
        msg.textContent = `Congratulations, Winner is ${player1.value}`;
    }else{
        msg.textContent = `Congratulations, Winner is ${player2.value}`;
    }
    
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner")
                showWinner(pos1Val);
            }
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        body.classList.toggle("color");
        if (turnO === true) {
            box.textContent = "O";
            turnO = false;
            player1Name.textContent = " "
            player2Name.textContent = player2.value;
        } else {
            box.textContent = "X";
            turnO = true;
            player1Name.textContent = player1.value;
            player2Name.textContent = " ";     
        }
        box.disabled = true;

        checkWinner();
    });
});

rstBtn.addEventListener("click", resetGame);
nwBtn.addEventListener("click", newGameBtn);