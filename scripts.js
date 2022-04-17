// Variáveis globais

let usuario;

let txt;

let stt;

let tipo = "message";

let destinatario;

let remetente;

let praquem = "Todos";

let usuariosSelecionados = []

let enter = "n"

function deuCerto() {


    // console.log("Acerto")


    const sairDaTela = document.querySelector(".inicio")
    sairDaTela.classList.add("desativar")
    setInterval(verMensagens, 3000)
    verMensagens()
}

function deuErro(erro) {
    const statusCode = erro.response.status;
    if (statusCode === 400) {
        const validacao = document.querySelector(".validacao")
        validacao.classList.remove("desativar")
        const nomeDigitado = document.querySelector(".usuario > input")
        nomeDigitado.value = ""
    }
}

function on() {
    // console.log("ainda aqui")
}

function off() {
    console.log("sai")
    window.location.reload()
}

function enviada() {
    // console.log("enviou")
}

function naoEnviada() {
    // console.log("nao enviou")
}








// OUTRAS FUNÇÕES DE AÇÃO

function usuarioOnline() {

    const nome = {
        name: usuario
    }

    const requisicaoStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome)

    requisicaoStatus.then(on)
    requisicaoStatus.catch(off)
}

function selecionarNome() {
    usuario = document.querySelector(".usuario > input").value
}

function comecar() {
    selecionarNome()

    const nome = {
        name: usuario
    }

    const requisicaoNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome)

    requisicaoNome.then(deuCerto)
    requisicaoNome.catch(deuErro)

    setInterval(usuarioOnline, 5000)
    buscarParticipantes()
}




// ESCOLHER PRIVACIDADE

function escolherPrivacidade(escolhido) {

    const publico = document.querySelector(".publico")
    const privado = document.querySelector(".privado")

    const checkPublico = document.querySelector(".publico .check")
    const checkPrivado = document.querySelector(".privado .check")

    if (escolhido === publico) {
        tipo = "message"
        checkPublico.classList.remove("desativar")
        checkPrivado.classList.add("desativar")
    }
    if (escolhido === privado) {
        tipo = "private_message"
        checkPrivado.classList.remove("desativar")
        checkPublico.classList.add("desativar")
        // tipo = "message"
    }
    // console.log(publico)
    // console.log(escolhido === publico)
}




// ENVIAR MENSAGEM

function ehIgualTodos(local) {
    if (local !== "Todos") {
        // console.log("local" + local)
        // console.log("users" + usuarioSelcionado.innerHTML)
        return true
    }
}

function enviarMensagem() {
    let digitado = document.querySelector(".menu-digitacao > input")
    let texto = digitado.value

    // console.log(usuariosSelecionados)

    if (usuariosSelecionados.length > 1) {

        let checkTodos = document.querySelector(".todos .check")
        checkTodos.classList.add("desativar")
        checkTodos.classList.remove("marcado")
        let removerUsuarios = usuariosSelecionados.filter(ehIgualTodos)
        usuariosSelecionados = removerUsuarios
        // console.log(usuariosSelecionados)

        for (let i = 0; i < usuariosSelecionados.length; i++) {
            praquem = usuariosSelecionados[i]

            if (praquem !== "Todos") {
                // tipo = "private_message"
                // tipo = "message"
                let mensagemEnviada =
                {
                    from: usuario,
                    to: praquem,
                    text: texto,
                    type: tipo // ou "private_message" para o bônus
                }

                const requisicaoMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemEnviada)

                requisicaoMensagem.then(enviada)
                requisicaoMensagem.catch(naoEnviada)
                // console.log(mensagemEnviada.type)
                // console.log(mensagemEnviada.to)
                // console.log(mensagemEnviada.from)
                digitado.value = ""

            }
        }
    }
    else {

        if (usuariosSelecionados.length === 0) {
            praquem = "Todos"
            let checkTodos = document.querySelector(".todos .check")
            checkTodos.classList.remove("desativar")
            checkTodos.classList.add("marcado")
            usuariosSelecionados.push("Todos")
        }
        else {
            praquem = usuariosSelecionados[0]
        }

        if (praquem !== "Todos" || (praquem === "Todos" && tipo === "message")) {
            let mensagemEnviada =
            {
                from: usuario,
                to: praquem,
                text: texto,
                type: tipo // ou "private_message" para o bônus
            }

            const requisicaoMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemEnviada)


            requisicaoMensagem.then(enviada)
            requisicaoMensagem.catch(naoEnviada)


            // console.log(typeof (texto))
            digitado.value = ""
        }
    }
    verMensagens()
}




// OPÇÕES DE MENSAGENS
function opcoesDeMensagem() {
    const apagarFundo = document.querySelector(".fundo")
    const abrirAba = document.querySelector(".opcoes-de-mensagem")
    abrirAba.classList.toggle("desativar")
    apagarFundo.classList.toggle("desativar")
    // buscarParticipantes()  // problema, toda vez que ele chama, ele desmarca os contatos ja selecionados - RESOLVER
}





// VER MENSAGENS

function verMensagens() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(processar)
}

function processar(resposta) {
    // console.log(resposta.data)

    const qtdMensagens = (resposta.data).length

    const achar = document.querySelector(".container")

    // console.log(qtdMensagens)

    achar.innerHTML = ""

    for (let numResposta = 0; numResposta < qtdMensagens; numResposta++) {

        let msg = resposta.data[numResposta]

        remetente = msg.from

        destinatario = msg.to

        txt = msg.text

        stt = msg.type

        hora = msg.time

        if (stt === "private_message") {

            if (destinatario === usuario) {
                achar.innerHTML += '<div class="mensagem privada">    <h1>' + hora + '</h1>    <h2><span>' + remetente + ' </span>para<span> ' + destinatario + '</span>: ' + txt + '</h2>    </div>'
            }
            if (remetente === usuario) {
                achar.innerHTML += '<div class="mensagem privada">    <h1>' + hora + '</h1>    <h2><span>' + remetente + ' </span>para<span> ' + destinatario + '</span>: ' + txt + '</h2>    </div>'
            }

        }

        if (stt === "message") {
            // if (destinatario === "Todos") {
            //     achar.innerHTML += '<div class="mensagem normal">    <h1>' + hora + '</h1>    <h2><span>' + remetente + ' </span>para<span> ' + destinatario + '</span>: ' + txt + '</h2>    </div>'
            // }

            achar.innerHTML += '<div class="mensagem normal">    <h1>' + hora + '</h1>    <h2><span>' + remetente + ' </span>para<span> ' + destinatario + '</span>: ' + txt + '</h2>    </div>'

        }

        if (stt === "status") {
            achar.innerHTML += '<div class="mensagem status">    <h1>' + hora + '</h1>    <h2>' + remetente + " " + txt + '</h2>    </div>'
        }

    }
    const elementoAparecer = document.querySelector(".container")

    let ultimofilho = document.querySelector(".mensagem:last-child")

    ultimofilho.scrollIntoView(false);

    // console.log(ultimofilho)
}




// BUSCAR PARTICIPANTES

function buscarParticipantes() {
    const usersNaConversa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')

    usersNaConversa.then(chamar)
}

function chamar(participants) {

    const listaParticipantes = participants.data

    const pessoas = document.querySelector(".users")

    for (let contador = 0; contador < listaParticipantes.length; contador++) {

        if (usuario !== listaParticipantes[contador].name) {
            pessoas.innerHTML += '<div class="caixa-participante" onclick ="selecionar(this)"><div class = "perfil"><ion-icon name="person-circle"></ion-icon><h4>' + participants.data[contador].name + '</h4></div><div class = "check desativar "><ion-icon name="checkmark"></ion-icon></div></div>'
        }
    }

    // console.log(participants.data[0].name)
}

function ehIgual(local) {
    if (local !== usuarioSelcionado.innerHTML) {
        // console.log("local" + local)
        // console.log("users" + usuarioSelcionado.innerHTML)
        return true
    }
}

let localElemento;

function selecionar(elemento) {

    localElemento = elemento

    // console.log(elemento)

    let estaMarcado = elemento.classList.contains("marcado")
    // console.log(estaSelecionado)
    // console.log(usuariosSelecionados)

    if (estaMarcado === false) {
        elemento.classList.add("selecionado")
        let checkSelecionado = document.querySelector(".selecionado > .check")
        usuarioSelcionado = document.querySelector(".selecionado  h4")
        checkSelecionado.classList.remove("desativar")
        elemento.classList.remove("selecionado")
        elemento.classList.add("marcado")
        usuariosSelecionados.push(usuarioSelcionado.innerHTML)
    }

    if (estaMarcado === true) {
        elemento.classList.add("selecionado")
        let checkSelecionado = document.querySelector(".selecionado > .check")
        usuarioSelcionado = document.querySelector(".selecionado  h4")
        checkSelecionado.classList.add("desativar")
        elemento.classList.remove("selecionado")
        elemento.classList.remove("marcado")
        let removerUsuarios = usuariosSelecionados.filter(ehIgual)
        usuariosSelecionados = removerUsuarios
        //    console.log(usuariosSelecionados)
    }
    // console.log(usuariosSelecionados)
    // praquem = usuariosSelecionados[0]
    // console.log(praquem)
}

// function escolherPrivacidade() {
//     console.log(usuariosSelecionados)
// }

function mensagemEnter(event) {

    let tecla = event.key;

    if(tecla === "Enter"){
        enviarMensagem()
    }
}

function nomeEnter(event) {

    let tecla = event.key;

    if(tecla === "Enter"){
        comecar()
    }
}