// Variáveis globais

let usuario;

let txt;

let stt;

let destinatario;

let remetente;

let praquem = "Todos";

let usuariosSelecionados = []

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
    const tipo = "message"

    if(usuariosSelecionados.length>1){

        for(let i = 0; i<usuariosSelecionados.length;i++){
            praquem = usuariosSelecionados[i]
            
            let mensagemEnviada = 
            {
                from: usuario,
                to: praquem,
                text: texto,
                type: tipo // ou "private_message" para o bônus
            }

            const requisicaoMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',mensagemEnviada)

            requisicaoMensagem.then(enviada)
            requisicaoMensagem.catch(naoEnviada)
            console.log(mensagemEnviada)

        }
    }
    else{

    praquem = usuariosSelecionados[0]

    let mensagemEnviada = 
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
}

function opcoesDeMensagem(){
    const apagarFundo = document.querySelector(".fundo")
    const abrirAba = document.querySelector(".opcoes-de-mensagem")
    abrirAba.classList.toggle("desativar")
    apagarFundo.classList.toggle("desativar")
    buscarParticipantes()
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
                if(remetente === usuario){
                    achar.innerHTML += '<div class="mensagem privada">    <h1>'+ hora +'</h1>    <h2><span>'+ remetente + ' </span>para<span> ' + destinatario + '</span>: ' + txt +'</h2>    </div>'
                }
                
            }
        }

        if(stt === "status"){
            achar.innerHTML += '<div class="mensagem status">    <h1>'+ hora +'</h1>    <h2>'+ remetente + " " + txt +'</h2>    </div>'
        }

    }
    const elementoAparecer = document.querySelector(".container")

    let  ultimofilho = document.querySelector(".mensagem:last-child")

    ultimofilho.scrollIntoView(false);

    // console.log(ultimofilho)
}


function buscarParticipantes(){
    const usersNaConversa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')

    usersNaConversa.then(chamar)
}

function chamar(participants){

    const listaParticipantes = participants.data


    for(let contador = 0; contador<listaParticipantes.length;contador++){

        const pessoas = document.querySelector(".users")

        pessoas.innerHTML += '<div class="caixa-participante" onclick ="selecionar(this)"><ion-icon name="person-circle"></ion-icon><h4>'+ participants.data[contador].name+'</h4><div class = "check desativar "><ion-icon name="checkmark"></ion-icon></div></div>'
    }

    // console.log(participants.data[0].name)
}

function ehIgual(local){
    if(local !== usuarioSelcionado.innerHTML){
        // console.log("local" + local)
        // console.log("users" + usuarioSelcionado.innerHTML)
        return true
    }
}

let localElemento;

function selecionar(elemento){

    localElemento = elemento

    console.log(elemento)

    let estaMarcado = elemento.classList.contains("marcado")
    // console.log(estaSelecionado)

    if(estaMarcado === false){
        elemento.classList.add("selecionado")
        let checkSelecionado = document.querySelector(".selecionado > .check")
        usuarioSelcionado = document.querySelector(".selecionado > h4")
        checkSelecionado.classList.remove("desativar")
        elemento.classList.remove("selecionado")
        elemento.classList.add("marcado")
        usuariosSelecionados.push(usuarioSelcionado.innerHTML)
    }

    if(estaMarcado === true){
        elemento.classList.add("selecionado")
       let checkSelecionado = document.querySelector(".selecionado > .check")
       usuarioSelcionado = document.querySelector(".selecionado > h4")
       checkSelecionado.classList.add("desativar")
       elemento.classList.remove("selecionado")
       elemento.classList.remove("marcado")
       let removerUsuarios =  usuariosSelecionados.filter(ehIgual)
       usuariosSelecionados = removerUsuarios
    //    console.log(usuariosSelecionados)
    }
    // console.log(usuariosSelecionados)
    // praquem = usuariosSelecionados[0]
    // console.log(praquem)
}

function enviarPrivada(){
    console.log(usuariosSelecionados)
}