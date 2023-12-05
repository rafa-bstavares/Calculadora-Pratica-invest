itensMenu = document.querySelectorAll(".item-menu")
arrIndex = []
let marginWidth = document.querySelector(".slide1").clientWidth
let slider = document.querySelector(".slider")
let selectSimplesTaxa = document.querySelector(".select-simples-taxa")
let selectSimplesTempo = document.querySelector(".select-simples-tempo")
let botaoCalcularSimples = document.querySelector(".botao-calcular-simples")
let botaoCalcularComposta = document.querySelector(".botao-calcular-composta")
let botaoCalcularNosso = document.querySelector(".botao-calcular-nosso")
let botaoVoltarSimples = document.querySelector(".botao-voltar-simples")
let botaoVoltarComposta = document.querySelector(".botao-voltar-composta")
let botaoVoltarNosso = document.querySelector(".botao-voltar-nosso")
let itensRespostaSimples = document.querySelectorAll(".simples-resposta-container .item-simples")
let itensRespostaComposta = document.querySelectorAll(".composta-resposta-container .item-simples")
let itensRespostaNosso = document.querySelectorAll(".nosso-resposta-container .item-simples")
let containerSimples = document.querySelector(".container-simples")
let containerComposta = document.querySelector(".container-composta")
let containerNosso = document.querySelector(".container-nosso")
let containerRespostaSimples = document.querySelector(".simples-resposta-container")
let containerRespostaComposta = document.querySelector(".composta-resposta-container")
let containerRespostaNosso = document.querySelector(".nosso-resposta-container")
let selectCompostoTaxa = document.querySelector(".select-composta-taxa")
let selectCompostoTempo = document.querySelector(".select-composta-tempo")
let selectNossoAno = document.querySelector(".select-nosso-ano")
let selectNossoMes = document.querySelector(".select-nosso-mes")

console.log(marginWidth)


itensMenu.forEach((item, index) => {
    arrIndex.push(index)
    arrIndexFixo = [...arrIndex]
    item.addEventListener("click", () => {

        /*Adicionar a classe no elemento clicado*/
        item.classList.add("menu-ativado")

        /*Remover a classe de todos os outros*/
        arrIndex.splice(index, 1)
        console.log(arrIndex)
        arrIndex.forEach((elemento) => {
            itensMenu[elemento].classList.remove("menu-ativado")
        })

        arrIndex = [...arrIndexFixo]
        console.log(arrIndexFixo)


        slider.style.marginLeft = `calc(-85vw * ${index})`

    })
})

console.log(arrIndex)

selectSimplesTaxa.addEventListener("change", () => {
    let indexSelecionado = selectSimplesTaxa.options[selectSimplesTaxa.selectedIndex].index
    selectSimplesTempo.selectedIndex = indexSelecionado
})

selectSimplesTempo.addEventListener("change", () => {
    let indexSelecionado = selectSimplesTempo.options[selectSimplesTempo.selectedIndex].index
    selectSimplesTaxa.selectedIndex = indexSelecionado
})

selectCompostoTaxa.addEventListener("change", () => {
    let indexSelecionado = selectCompostoTaxa.options[selectCompostoTaxa.selectedIndex].index
    selectCompostoTempo.selectedIndex = indexSelecionado
})

selectCompostoTempo.addEventListener("change", () => {
    let indexSelecionado = selectCompostoTempo.options[selectCompostoTempo.selectedIndex].index
    selectCompostoTaxa.selectedIndex = indexSelecionado
})


botaoCalcularSimples.addEventListener("click", () => {
    let valorInicial = Number(document.querySelector(".input-simples-valor").value)
    let taxa = Number(document.querySelector(".input-simples-taxa").value)
    let tempo = Number(document.querySelector(".input-simples-tempo").value)
    taxa = taxa / 100
    console.log(taxa)
    console.log(tempo)
    console.log(tempo * taxa)
    console.log(3000 * 1.1)
    let valorTotalFinal = valorInicial * (1 + (tempo * taxa))
    valorTotalFinal = valorTotalFinal.toFixed(2)
    let totalEmJuros = valorTotalFinal - valorInicial

    console.log(`Total final: R$ ${valorTotalFinal}`)
    console.log(`Total em juros: R$ ${totalEmJuros}`)
    console.log(`Total Investido: R$ ${valorInicial}`)

    /* Escrevendo as respostas */
    itensRespostaSimples[0].innerHTML = `Total final: R$ ${valorTotalFinal}`
    itensRespostaSimples[1].innerHTML = `Total Investido: R$ ${valorInicial}`
    itensRespostaSimples[2].innerHTML = `Total em juros: R$ ${totalEmJuros}`

    /* desaparecer a calculadora */
    containerSimples.style.display = "none"

    /*aparecer respostas*/
    containerRespostaSimples.style.display = "flex"

    /* mudar botao para voltar*/
    botaoCalcularSimples.style.display = "none"
    botaoVoltarSimples.style.display = "flex"



})

document.querySelector(".botao-voltar-simples").addEventListener("click", () => {
    containerSimples.style.display = "flex"
    containerRespostaSimples.style.display = "none"
    botaoCalcularSimples.style.display = "flex"
    botaoVoltarSimples.style.display = "none"
})

botaoCalcularComposta.addEventListener("click", () => {
    let valorTotalFinal
    let valorTotalInvestido
    let totalEmJuros
    if(selectCompostoTempo.selectedIndex == 1){
        let valorInicial = Number(document.querySelector(".input-composta-valor-ini").value)
        let valorMensal = Number(document.querySelector(".input-composta-valor-mes").value)
        let taxa = Number(document.querySelector(".input-composta-taxa").value)
        taxa = taxa / 100
        let tempo = Number(document.querySelector(".input-composta-tempo").value)
        let totalAtual = valorInicial
        for(let i = 0; i < tempo; i++){
            totalAtual = (totalAtual * taxa) + totalAtual + valorMensal
        }
    
        valorTotalFinal = totalAtual.toFixed(2)
        valorTotalInvestido = (valorInicial + tempo * valorMensal).toFixed(2)
        totalEmJuros = (valorTotalFinal - valorTotalInvestido).toFixed(2)
    
    }else{
        let valorInicial = Number(document.querySelector(".input-composta-valor-ini").value)
        let valorMensal = Number(document.querySelector(".input-composta-valor-mes").value)
        let taxa = Number(document.querySelector(".input-composta-taxa").value)
        taxa = taxa / 100
        let tempo = Number(document.querySelector(".input-composta-tempo").value)
        let totalAtual = valorInicial

        tempo = tempo * 12

        taxa = ((1 + taxa)**(1/12)) - 1
        console.log("taxa anual")
        console.log(taxa)

        for(let i = 0; i < tempo; i++){
            totalAtual = (totalAtual * taxa) + totalAtual + valorMensal
        }

        valorTotalFinal = totalAtual.toFixed(2)
    
        console.log(valorTotalFinal)
        

        valorTotalInvestido = (valorInicial + tempo * valorMensal).toFixed(2)
        console.log(valorTotalInvestido)

        totalEmJuros = (valorTotalFinal - valorTotalInvestido).toFixed(2)
    }

    itensRespostaComposta[0].innerHTML = `Total final: R$ ${valorTotalFinal}`
    itensRespostaComposta[1].innerHTML = `Total Investido: R$ ${valorTotalInvestido}`
    itensRespostaComposta[2].innerHTML = `Total em juros: R$ ${totalEmJuros}`

        /* desaparecer a calculadora */
        containerComposta.style.display = "none"

        /*aparecer respostas*/
        containerRespostaComposta.style.display = "flex"
    
        /* mudar botao para voltar*/
        botaoCalcularComposta.style.display = "none"
        botaoVoltarComposta.style.display = "flex"

})

document.querySelector(".botao-voltar-composta").addEventListener("click", () => {
    containerComposta.style.display = "flex"
    containerRespostaComposta.style.display = "none"
    botaoCalcularComposta.style.display = "flex"
    botaoVoltarComposta.style.display = "none"
})



let objAnos = {
    Y2020: [
        10.26,
        2.42,
        0.3,
        6,
        10.61,
        4.77,
        9.96,
        17.77,
        4.77,
        6.03,
        10.56,
        13.17
    ],
    Y2021: [
        4.65,
        14.61,
        5.93,
        4.36,
        0.27,
        4.33,
        4.95,
        -1.86,
        5.56,
        6.24,
        4.2,
        5.32
    ],
    Y2022: [
        10.26,
        5.53,
        11.45,
        6,
        8.75,
        14.32,
        5.6,
        5.49,
        10.21,
        6.27,
        3.73,
        6
    ],
    Y2023: [
        7.19,
        6.69,
        0.97,
        6.88,
        3.45,
        5.31,
        6.57,
        3.03,
        3.88,
        6.46,
        6,
        6
    ]
}


botaoCalcularNosso.addEventListener("click", () => {
    let anoSelecionado = selectNossoAno.options[selectNossoAno.selectedIndex].text
    let mesSelecionado = selectNossoMes.options[selectNossoMes.selectedIndex].value
    let mesSelecionadoIdx = Number(mesSelecionado)
    let anoObj = "Y" + anoSelecionado
    let valorInicial = Number(document.querySelector(".input-nosso-valor-ini").value)
    let valorMes = Number(document.querySelector(".input-nosso-valor-mes").value)
    let valorTotal = valorInicial

    console.log(`valor mensal vazio resulta em: ${valorMes}`)

    let anosFaltam
    switch(anoSelecionado){
        case "2020":
            anosFaltam = 4
            break

        case "2021":
            anosFaltam = 3
            break

        case "2022":
            anosFaltam = 2
            break

        case "2023":
            anosFaltam = 1
    }

    
    let mesesInvestindo = (12 - mesSelecionado) + (anosFaltam - 1)*12
    let j = mesSelecionadoIdx
    for(let i = 0; i < mesesInvestindo; i++){
        if(j == 12){
            anoSelecionado = Number(anoSelecionado) + 1
            anoObj = "Y" + anoSelecionado
            j = 0
        }
        let taxa = objAnos[anoObj][j] / 100
        console.log(objAnos[anoObj][j])
        console.log(taxa)
        valorTotal = (valorTotal * taxa) + valorTotal + valorMes
        j++
    }

    if(anosFaltam == 1){

    }




    let valorTotalInvestido = (valorInicial + mesesInvestindo * valorMes).toFixed(2)
    let valorTotalFinal = valorTotal.toFixed(2)
    let totalEmJuros = (valorTotal - valorTotalInvestido).toFixed(2) 



    /* Escrevendo as respostas */
    itensRespostaNosso[0].innerHTML = `Total final: R$ ${valorTotalFinal}`
    itensRespostaNosso[1].innerHTML = `Total Investido: R$ ${valorTotalInvestido}`
    itensRespostaNosso[2].innerHTML = `Total em juros: R$ ${totalEmJuros}`

    /* desaparecer a calculadora */
    containerNosso.style.display = "none"

    /*aparecer respostas*/
    containerRespostaNosso.style.display = "flex"

    /* mudar botao para voltar*/
    botaoCalcularNosso.style.display = "none"
    botaoVoltarNosso.style.display = "flex"

})


document.querySelector(".botao-voltar-nosso").addEventListener("click", () => {
    containerNosso.style.display = "flex"
    containerRespostaNosso.style.display = "none"
    botaoCalcularNosso.style.display = "flex"
    botaoVoltarNosso.style.display = "none"
})


const ctx = document.querySelector(".meu-grafico")

const meuGrafico = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['01/20', '02/20', '03/20', '04/20', '05/20', '06/20', '07/20', '08/20', '09/20', '10/20', '11/20', '12/20',
        '01/21', '02/21', '03/21', '04/21', '05/21', '06/21', '07/21', '08/21', '09/21', '10/21', '11/21', '12/21',
        '01/22', '02/22', '03/22', '04/22', '05/22', '06/22', '07/22', '08/22', '09/22', '10/22', '11/22', '12/22',
        '01/23', '02/23', '03/23', '04/23', '05/23', '06/23', '07/23', '08/23', '09/23', '10/23', '11/23', '12/23'],
        datasets: [
                {
                    label: 'Nossas taxas',
                    data: [ 10.26,
                        2.42,
                        0.3,
                        6,
                        10.61,
                        4.77,
                        9.96,
                        17.77,
                        4.77,
                        6.03,
                        10.56,
                        13.17,
                        4.65,
                        14.61,
                        5.93,
                        4.36,
                        0.27,
                        4.33,
                        4.95,
                        -1.86,
                        5.56,
                        6.24,
                        4.2,
                        5.32,
                        10.26,
                        5.53,
                        11.45,
                        6,
                        8.75,
                        14.32,
                        5.6,
                        5.49,
                        10.21,
                        6.27,
                        3.73,
                        6,
                        7.19,
                        6.69,
                        0.97,
                        6.88,
                        3.45,
                        5.31,
                        6.57,
                        3.03,
                        3.88,
                        6.46,
                        6,
                        6],
                    borderWidth: 1
            },
            {label: 'Taxa CDI',
                    data: [ 0.38,
                        0.29,
                        0.34,
                        0.28,
                        0.24,
                        0.21,
                        0.19,
                        0.16,
                        0.16,
                        0.16,
                        0.15,
                        0.16,
                        0.15,
                        0.13,
                        0.20,
                        0.21,
                        0.27,
                        0.31,
                        0.36,
                        0.43,
                        0.44,
                        0.49,
                        0.59,
                        0.77,
                        0.73,
                        0.76,
                        0.93,
                        0.83,
                        1.03,
                        1.02,
                        1.03,
                        1.17,
                        1.07,
                        1.02,
                        1.02,
                        1.12,
                        1.12,
                        0.92,
                        1.17,
                        0.92,
                        1.12,
                        1.07,
                        1.07,
                        1.14,
                        0.97,
                        1.00,
                        0.78,
                        0.78],
                    borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 25,
                ticks: {
                    callback: function(value){
                        return value + "%"
                    }
                }
            }
        },
        layout: {
            padding: 200
        }
    }
})