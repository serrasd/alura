import { createHash } from 'crypto';

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    this.hash = this.criaHash(senha);
  }

  criaHash(senha) {
    return createHash('sha256').update(senha).digest('hex');
  }

  autentica(nome, senha) {
    if (nome === this.nome && this.hash === this.criaHash(senha)) {
      console.log('Usuário cadastrado com sucesso!');
      return true;
    }

    // console.log('Usuário ou senha incorretos.');
    return false;
  }
}

const usuario = new Usuario('guilherme serra', '1337');

for (let senhaTeste = 0; senhaTeste < 10000; senhaTeste++) {
  if (usuario.autentica('guilherme serra', senhaTeste.toString())) {
    console.log(`A senha do usuário é ${senhaTeste}`);
  }
}
