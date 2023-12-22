const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    value: {
        timerId: null,
        gameSpeed: 1000,
        hitPosition: null,
        result: 0,
        currentTime: 60,
        lives: 3
    }
};

function timer(){
    setInterval(() => {
        if(state.value.currentTime > 0) state.value.currentTime--;
        else alert(`Game Over! O seu resultado foi ${state.value.result}`);
        if(state.value.lives <= 0){
            alert('Game Over! Você Perdeu!');
            state.value.currentTime = 60;
            state.value.lives = 3;
            state.view.lives.textContent = state.value.lives;
        }
        state.view.timeLeft.textContent = state.value.currentTime;
    },1000)
}

function main() {
    moveEnemy();
    addListenerHitbox();
    timer();
}

function randomSquare() {
    let randomNumber = Math.floor(Math.random() * 9);
    state.view.squares.forEach((square, i) => {
        square.classList.remove("enemy");
        if (i == randomNumber) {
            square.classList.add("enemy");
            state.value.hitPosition = square.id;
        }
    })
    console.log(randomNumber);
}

function addListenerHitbox() {
    state.view.squares.forEach(square => {
        square.addEventListener("mousedown", () => {
            if (state.value.hitPosition === square.id) {
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.values.hitPosition = null;
            } else{
                state.value.lives--;
                state.view.lives.textContent = state.value.lives;
            }
        })
    })
}

function moveEnemy() {
    state.value.timerId = setInterval(randomSquare, state.value.gameSpeed);
}

main();