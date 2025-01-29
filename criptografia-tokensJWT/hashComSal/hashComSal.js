import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'

function criaHashComSal(senha) {
    const sal = randomBytes(16).toString('hex')
    const senhaHasheada = scryptSync(senha, sal, 64).toString('hex')

    return `${sal}:${senhaHasheada}`
}

class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        [this.sal, this.hash] = criaHashComSal(senha).split(':')
    }

    autentica(nome, senha) {
        if(nome === this.nome) {
            const testeHash = scryptSync(senha, this.sal, 64)
            const hashReal = Buffer.from(this.hash, 'hex')

            const hashesCorrespondem = timingSafeEqual(testeHash, hashReal)

            if(hashesCorrespondem) {
                console.log('Usuário autenticado com sucesso')
                return true
            }
        }
        console.log('Usuário ou senha incorretos.')
        return false
    }
}

const gs = new Usuario('Guilherme Serra', 'senhaSecreta')

console.log(gs)

// Teste de sucesso
gs.autentica('Guilherme Serra', 'senhaSecreta')

// Teste de falha
gs.autentica('GS', 'senhaErrada')