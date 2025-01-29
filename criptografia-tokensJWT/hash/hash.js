import { createHash } from 'crypto'

function criaHash(senha) {
    return createHash('sha256').update(senha).digest('hex')
}

// console.log(criaHash('uma String Qualquer'))

class Usuario {
    constructor(nome, senha) {
        this.nome = nome
        this.hash = criaHash(senha)
    }

    autentica(nome, senha) {
        if(nome === this.nome && this.hash === criaHash(senha)) {
            console.log('Usuário cadastrado com sucesso!')
            return true
        } 

        console.log('Usuário ou senha incorretos.')
        return false
    }
}

const usuario = new Usuario('guilherme serra', 'minhaSenha')

console.log(usuario)

// Caso de sucesso
usuario.autentica('guilherme serra', 'minhaSenha')

// Caso de fracasso
usuario.autentica('gs', 'minhaSenha')