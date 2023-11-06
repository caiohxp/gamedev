const numeros = [
    { symbol: "11²", value: 121} , {symbol: "121", value: 121}, { symbol: "3³", value: 27}, { symbol: "27", value: 27}, 
    { symbol: "2³", value: 8}, { symbol: "8", value: 8}, { symbol: "5³", value: 125}, { symbol: "125", value: 125 }, 
    { symbol: "13²", value: 169}, { symbol: "169", value: 169}, { symbol: "7²", value: 49}, { symbol: "49", value: 49}
];
let openCards = [];

let shuffleNumeros = numeros.sort(() => (Math.random() > 0.5 ? 2 : -1));

for(let i = 0; i < numeros.length; i++){
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleNumeros[i].symbol;
    box.addEventListener("click", () => {
        if(openCards.length < 2){
            box.classList.add("boxOpen");
            openCards.push({ el: box, content: shuffleNumeros[i]});
            console.log(box);
        }
        if(openCards.length == 2){
            setTimeout(checkMatch, 500);
        }
    });
    document.querySelector(".game").appendChild(box);
}

function handleClick(){
    if(openCards.length < 2){
        console.log(this);
        this.classList.add("boxOpen");
        openCards.push(this);
    }
    if(openCards.length == 2){
        setTimeout(checkMatch, 500);
    }
}

function checkMatch(){
    if(openCards[0].content.value === openCards[1].content.value){
        openCards[0].el.classList.add("boxMatch");
        openCards[1].el.classList.add("boxMatch");
    } else{
        openCards[0].el.classList.remove("boxOpen");
        openCards[1].el.classList.remove("boxOpen");
    }
    openCards = [];
    if((document.querySelectorAll('.boxMatch')).length === numeros.length) alert("Você Venceu!");
}