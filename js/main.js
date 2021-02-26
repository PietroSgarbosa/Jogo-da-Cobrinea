let canvas = document.getElementById("snake"); //Variável canvas recebendo o campo canvas do HTML
let context = canvas.getContext("2d"); //O método Context tratará o campo como um objeto bidimensional
let box = 32; //Cada caixa de pixel que cobrirá o canvas

let cobrinea = []; //Array que formará a base do corpo da cobrinea, cada elemento é preenchido pelas coordenadas x e y 
cobrinea[0] = { //Cada elemento do array é um objeto de coordenadas
    x: 8 * box, //128 pixels
    y: 8 * box
}

let rat = {
    x: Math.floor(Math.random() * 15 + 1) * box, //Math.floor retira ponto flutuante
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = "right";

function criarBG() { //Função que quando chamada cria o background por meio de cálculos 
    context.fillStyle = "lightgray";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinea() {
    for(i = 0; i < cobrinea.length; i++){
        context.fillStyle = "blue"; //Um verde mais escuro para destacar
        context.fillRect(cobrinea[i].x, cobrinea[i].y, box, box); //Criando os blocos da cobrinea
    }
}

function drawRat() {
    context.fillStyle = "gray";
    context.fillRect(rat.x, rat.y, box, box);
}

document.addEventListener('keydown', update); //Evento de interação com as teclas 'keydown', dando boot na função de atualizar

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left"; //If para que a cobrinea não volte pelo lado oposto
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

startGame = () => { //Função que atualiza a cobrinea e inicia o jogo
    if(cobrinea[0].x > 15 * box && direction =="right") cobrinea[0].x = 0; //Limitando para cobrinea não sair do canvas
    if(cobrinea[0].x < 0  && direction =="left") cobrinea[0].x = 16 * box;
    if(cobrinea[0].y > 15 * box && direction =="down") cobrinea[0].y = 0;
    if(cobrinea[0].y < 0 && direction =="up") cobrinea[0].y = 16 * box;

    for(i = 1; i < cobrinea.length; i++) { //Método para identificar se a cabeça chocou com o corpo e dar gameover
        if(cobrinea[0].x == cobrinea[i].x && cobrinea[0].y == cobrinea[i].y) {
            clearInterval(game);
            alert("Game Over!");
        }
    }

    criarBG();
    criarCobrinea();
    drawRat();

    let cobrineaX = cobrinea[0].x; //Coordenadas para direção
    let cobrineaY = cobrinea[0].y;

    if(direction == "right") cobrineaX += box;
    if(direction == "left") cobrineaX -= box;
    if(direction == "up") cobrineaY -= box;
    if(direction == "down") cobrineaY += box;

    if(cobrineaX != rat.x || cobrineaY != rat.y) {
        cobrinea.pop(); //Método que retira o ultimo elemento de um array
    } else {
        rat.x = Math.floor(Math.random() * 15 + 1) * box, 
        rat.y = Math.floor(Math.random() * 15 + 1) * box
    }

    

    let newHead = { //Objeto de coodernadas 
        x: cobrineaX,
        y: cobrineaY
    }

    cobrinea.unshift(newHead); //adiciona um novo bloco a frente do direcional do comando
} 

let game = setInterval(startGame, 100);