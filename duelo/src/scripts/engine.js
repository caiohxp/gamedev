const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.querySelector("#score-points")
    },
    cardSprites: {
        avatar: document.querySelector("#card-image"),
        name: document.querySelector("#card-name"),
        type: document.querySelector("#card-type")
    },
    fieldCards: {
        player: document.querySelector("#player-field-card"),
        computer: document.querySelector("#computer-field-card"),
    },
    actions: {
        button: document.querySelector("#next-duel")
    }
}

var cards = [];

const playersSide = {
    player: 'player-cards',
    computer: 'computer-cards'
}

const pathImages = "./src/assets/icons/";

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i < cardNumbers; i++){
        const randomIdCard = Math.floor(Math.random() * cards.length);
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.querySelector(`#${fieldSide}`).appendChild(cardImage);
    }

}

function drawSelectedCard(id){
    state.cardSprites.avatar.src = `${pathImages}${cards[id].img}`;
    state.cardSprites.avatar.setAttribute('height', '250px');
    state.cardSprites.name.innerText = cards[id].name;
    state.cardSprites.type.innerText = "Attribute: " + cards[id].type;
}

function setCardsField(id){
    // await removeCarsImages();
    let computerID = Math.floor(Math.random() * cards.length)

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = `${pathImages}${cards[id].img}`;
    state.fieldCards.computer.src = `${pathImages}${cards[computerID].img}`;

    checkDuelResults(id, computerID);
}

function checkDuelResults(playerID, computerID){
    console.log(cards[playerID].WinOf);
    console.log(cards[playerID].LoseOf);
    console.log(cards[computerID].name);
    if(cards[playerID].WinOf.includes(cards[computerID].type)) state.score.playerScore++;
    else if(cards[playerID].LoseOf.includes(cards[computerID].type)) state.score.computerScore++;

    state.score.scoreBox.innerText = `Win ${state.score.playerScore} | Lose ${state.score.computerScore}`;
}

function createCardImage(idCard, fieldSide){
    const cardImage = document.createElement('img');
    cardImage.setAttribute('height', '100px');
    cardImage.setAttribute('src', './src/assets/icons/card-back.png');
    cardImage.setAttribute('data-id', idCard);

    if(fieldSide === playersSide.player){
        cardImage.classList.add('card');
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        })
        cardImage.addEventListener("mouseover", () => {
            drawSelectedCard(idCard);
        })
    }


    return cardImage;
}

function main() {
    readTextFile("data.json", function (text) {
        cards = JSON.parse(text);
        drawCards(5, playersSide.player);
        drawCards(5, playersSide.computer);
    })
}

main();