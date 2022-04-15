// Variáveis globais

let usuario;

let txt;

let stt;

let destinatario;

let remetente;



function deuCerto(){


    // console.log("Acerto")


    const sairDaTela = document.querySelector(".inicio")
    sairDaTela.classList.add("desativar")
    setInterval(verMensagens,3000)
    verMensagens()
}

function deuErro(erro){
    const statusCode = erro.response.status;
    if(statusCode === 400){
        const validacao = document.querySelector(".validacao")
        validacao.classList.remove("desativar")
        const nomeDigitado = document.querySelector(".usuario > input")
        nomeDigitado.value = ""
    }
}

function on(){
    // console.log("ainda aqui")
}

function off(){
    console.log("sai")
}

function enviada(){
    console.log("enviou")
}

function naoEnviada(){
    console.log("enviou")
}








// OUTRAS FUNÇÕES DE AÇÃO

function usuarioOnline(){

    const nome = {
        name: usuario
    }

    const requisicaoStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',nome)

    requisicaoStatus.then(on)
    requisicaoStatus.catch(off)
}

function selecionarNome(){
    usuario = document.querySelector(".usuario > input").value
}

function comecar(){
    selecionarNome()

    const nome = {
        name: usuario
    }

    const requisicaoNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nome)

    requisicaoNome.then(deuCerto)
    requisicaoNome.catch(deuErro)

    setInterval(usuarioOnline,5000)
}





// ENVIAR MENSAGEM

function enviarMensagem(){
    let digitado = document.querySelector(".menu-digitacao > input")
    let texto = digitado.value

    const praquem = "Todos";

    const tipo = "message"

    const mensagemEnviada = 
    {
        from: usuario,
        to: praquem,
        text: texto,
        type: tipo // ou "private_message" para o bônus
    }

    const requisicaoMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',mensagemEnviada)


    requisicaoMensagem.then(enviada)
    requisicaoMensagem.catch(naoEnviada)


    console.log(typeof(texto))
    digitado.value = ""
}

function opcoesDeMensagem(){
    const apagarFundo = document.querySelector(".fundo")
    const abrirAba = document.querySelector(".opcoes-de-mensagem")
    abrirAba.classList.toggle("desativar")
    apagarFundo.classList.toggle("desativar")
}


function verMensagens(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(processar)
}

function processar(resposta){
    // console.log(resposta.data)

    const qtdMensagens = (resposta.data).length

    const achar = document.querySelector(".container")

    // console.log(qtdMensagens)

    achar.innerHTML = ""

    for(let numResposta = 0; numResposta<qtdMensagens;numResposta++){

        let msg = resposta.data[numResposta]

        remetente = msg.from

        destinatario = msg.to

        txt = msg.text

        stt = msg.type

        hora = msg.time

        if(stt === "message"){

            if(destinatario === "Todos"){
                achar.innerHTML += '<div class="mensagem normal">    <h1>'+ hora +'</h1>    <h2><span>'+ remetente + ' </span>para<span> ' + destinatario + '</span>: ' + txt +'</h2>    </div>'
            }

            else{
                if(destinatario === usuario){
                    achar.innerHTML += '<div class="mensagem privada">    <h1>'+ hora +'</h1>    <h2><span>'+ remetente + ' </span>para<span> ' + destinatario + '</span>: ' + txt +'</h2>    </div>'
                }
                
            }
        }

        if(stt === "status"){
            achar.innerHTML += '<div class="mensagem status">    <h1>'+ hora +'</h1>    <h2><span>'+ remetente + ' </span>para<span> ' + destinatario + '</span>: ' + txt +'</h2>    </div>'
        }

    }

    const elementoAparecer = document.querySelector(".container")

    elementoAparecer.scrollIntoView(false);

}