function iniciar() {
    const listaDeTarefas = document.getElementById('lista')
    listaDeTarefas.innerHTML = ''

    itens = localStorage.getItem('lista')
    itensJSON = JSON.parse(itens)

    let contador = 0
    if (itensJSON) {
        itensJSON.forEach(function (item) {
            listarTarefa(contador, item.status, item.tarefa)
            contador++
        })
    } else {
        localStorage.setItem('lista', '[]')
        itens = localStorage.getItem('lista')
        itensJSON = JSON.parse(itens)
    }
}

function alterarStatus(tarefaSelecionada) {
    let indice = tarefaSelecionada.id.replace("tarefa-", "")
    let status = tarefaSelecionada.children[0].className

    if (status == 'pendente') {
        itensJSON[indice].status = 'concluido'
    } else {
        itensJSON[indice].status = 'pendente'
    }

    localStorage.setItem('lista', JSON.stringify(itensJSON))
    iniciar()
}

function removerTarefa(tarefaSelecionada) {
    let indice = tarefaSelecionada.id.replace("remove-", "")
    let pergunta = confirm("Deseja realmente excluir a tarefa?")

    if (pergunta) {
        itensJSON.splice(indice, 1)
        localStorage.setItem('lista', JSON.stringify(itensJSON))
    }

    iniciar()
}

function adicionarTarefa() {
    let tarefa = prompt("Qual tarefa deseja adicionar?")
    if (tarefa) {
        itensJSON.push({ "tarefa": tarefa, "status": "pendente" })
        localStorage.setItem('lista', JSON.stringify(itensJSON))
        iniciar()
    }
}

function listarTarefa(sequencia, status, tarefa) {
    const listaDeTarefas = document.getElementById('lista')

    const divTarefa = document.createElement('div')
    divTarefa.className = 'tarefa'
    divTarefa.id = 'tarefa-' + sequencia
    divTarefa.onclick = function () { alterarStatus(this) }

    const spanTarefa = document.createElement('span')
    spanTarefa.className = status
    spanTarefa.appendChild(document.createTextNode(tarefa))

    const divAcao = document.createElement('div')
    divAcao.className = 'acao'

    const inputRemove = document.createElement('input')
    inputRemove.id = 'remove-' + sequencia
    inputRemove.type = 'button'
    inputRemove.value = 'X'
    inputRemove.onclick = function () { removerTarefa(this) }

    divTarefa.appendChild(spanTarefa)
    divAcao.appendChild(inputRemove)

    listaDeTarefas.appendChild(divTarefa)
    listaDeTarefas.appendChild(divAcao)

}

iniciar()