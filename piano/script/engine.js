const pianoKeys = document.querySelectorAll(".piano-keys .key");
const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];

function playTune(key) {
    audio = new Audio(`tunes/${key}.wav`);
    audio.play();
}

pianoKeys.forEach(k => {
    k.addEventListener("click", () => playTune(k.dataset.key));
    mapedKeys.push(k.dataset.key);
})

document.addEventListener("keydown", (event) => {
    if (mapedKeys.includes(event.key)) playTune(event.key)
});

keysCheck.addEventListener("click", () => {
    pianoKeys.forEach(k => k.classList.toggle("hide"));
})