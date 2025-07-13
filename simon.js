let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "blue", "red", "green"];

let started = false;
let level = 0;
let hi = 0;

let h2 = document.querySelector("h2");
let hs = document.getElementById('HighScore');

function high() {
    if (hi < level) {
        hi = level;
        hs.innerText = `High Score : ${hi}`;
    }
}



document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelup();
    }
});

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randInx = Math.floor(Math.random() * 4);
    let randColor = btns[randInx];
    //console.log(`${randColor}`);
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnflash(randbtn);
}
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}
function btnPress() {
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}
function checkAns(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over!Your Score Was <b>${level}</b> <br> Press Any key to Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    high();
    level = 0;
}