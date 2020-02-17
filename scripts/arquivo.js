var traducao = '';
var answerJson = {};

function chamarJson() {

    fetch('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=a0740d97607961dcf6e78e76df4d47fe93b5a225')
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            answerJson = json;
            document.getElementById('mostrarJson').innerText = answerJson.cifrado;
        });

    document.getElementById('mostrarJson').style = "display: block;";

    document.getElementById('traduzirJson').style = "display: block;";
}

function trazuzirMensagem() {
    document.getElementById('mostrarMensagemTraduzida').style = "display: block;";

    var alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var criptografado = document.getElementById('mostrarJson').innerText;

    for (var index = 0; index < criptografado.length; index++) {

        const letraCripto = criptografado[index]; // h

        if (letraCripto == '.' || letraCripto == ',' || letraCripto == ' ') {
            traducao = traducao + letraCripto;
            continue;
        }

        var posicaoLetraCripto;
        posicaoLetraCripto = alfabeto.indexOf(letraCripto);
        if (posicaoLetraCripto >= 0) {
            traducao = traducao + alfabeto[posicaoLetraCripto - 1];
        }

    }
    answerJson.decifrado = traducao;
    document.getElementById('mostrarMensagemTraduzida').innerText = traducao;
    document.getElementById('resumoSha1').style = "display: block;";
}

function resumirSha1() {
    document.getElementById('mostrarResumoSha1').style = "display: block;";

    document.getElementById('retornoMensagem').style = "display: block;";

    var md = forge.md.sha1.create();
    md.update(traducao);
    var resumo = md.digest().toHex();

    document.getElementById('mostrarResumoSha1').innerText = resumo;
    answerJson.resumo_criptografico = resumo;

}

function retornarMensagem() {
    document.getElementById('mostrarMensagemRetorno').style = "display: block";

    document.getElementById('reiniciar').style = "display: block";

    // fetch('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=a0740d97607961dcf6e78e76df4d47fe93b5a225', {

    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(answerJson),
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });

    var uploadArquivo = document.querySelector('input[type="file"]');
    var fileAnswer = new File([uploadArquivo.files[0]], "answer");
    var answer = new FormData();

    answer.append('answer', fileAnswer);
    const options = {
        method: 'POST',
        body: answer,
    };

    fetch('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=a0740d97607961dcf6e78e76df4d47fe93b5a225', options)

        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function reiniciar() {

    document.getElementById('mostrarJson').innerText = "";
    document.getElementById('mostrarJson').style = "display: none;";

    document.getElementById('traduzirJson').style = "display: none;";

    document.getElementById('resumoSha1').style = "display: none;";

    document.getElementById('retornoMensagem').style = "display: none;";

    document.getElementById('mostrarMensagemTraduzida').style = "display: none;";

    document.getElementById('mostrarResumoSha1').style = "display: none;";

    document.getElementById('mostrarMensagemRetorno').style = "display: none;";

    document.getElementById('reiniciar').style = "display: none";
}