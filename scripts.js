function comecar(){
    const sairDaTela = document.querySelector(".inicio")
    sairDaTela.classList.add("desativar")
}

function enviarMensagem(){
    let digitado = document.querySelector(".menu-digitacao > input")
    let texto = digitado.value

    console.log(texto)
    digitado.value = ""
}

function opcoesDeMensagem(){
    const apagarFundo = document.querySelector(".fundo")
    const abrirAba = document.querySelector(".opcoes-de-mensagem")
    abrirAba.classList.toggle("desativar")
    apagarFundo.classList.toggle("desativar")
}