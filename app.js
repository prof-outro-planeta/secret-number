let listaNmrsSecretos = [];
let nmrLimite = 10;
let nmrSecreto = gerarNmrAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() { 
    exibirTextoNaTela('h1', 'Jogo do número secreto'); 
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarTentativa() {
    let nmrTentativa = document.querySelector('input').value;
    if (nmrTentativa == nmrSecreto){
        let palavraTentativa = tentativas == 1 ? 'tentativa':'tentativas';
        let mensagem = `Você descobriu o número secreto ${nmrSecreto} com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (nmrTentativa > nmrSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        cleanInput();
    }
}

function gerarNmrAleatorio(){
    let nmrEscolhido = parseInt(Math.random() * nmrLimite + 1);
    let tamListaNmrsSorteados = listaNmrsSecretos.length;

    if (nmrLimite == tamListaNmrsSorteados){
        listaNmrsSecretos = [];
    }

    if (listaNmrsSecretos.includes(nmrEscolhido)){
        return gerarNmrAleatorio();
    } else {
        listaNmrsSecretos.push(nmrEscolhido);
        return nmrEscolhido;
    }
}

function cleanInput(){
    let campo = document.querySelector('input');
    campo.value = '';
}

function novoJogo() {
    nmrSecreto = gerarNmrAleatorio();
    cleanInput();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}