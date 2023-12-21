const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("score"),
    },
    value: {
        timerId: null,
        gameSpeed: 1000,
    }
};

function main(){
    moveEnemy();
}

function randomSquare(){
    let randomNumber = Math.floor(Math.random() * 9);
    state.view.squares.forEach((square, i) => {
        square.classList.remove("enemy");
        if(i == randomNumber) square.classList.add("enemy");
    })
    console.log(randomNumber);
}

function moveEnemy(){
    state.value.timerId = setInterval(randomSquare, state.value.gameSpeed);
}

main();