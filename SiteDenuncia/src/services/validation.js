function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

function validarEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validarSenha(senha) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(senha);
}

function validarData(data) {
    const hoje = new Date();
    const dataNascimento = new Date(data);
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();
    const mesAniversario = dataNascimento.getMonth() + 1;
    const diaAniversario = dataNascimento.getDate();
    
    if (mesAtual < mesAniversario || (mesAtual === mesAniversario && diaAtual < diaAniversario)) {
        idade--;
    }
    
    return idade >= 18;
}

function validarGenero(genero) {
    const generosValidos = ['masculino', 'feminino', 'outro', 'prefiro não informar'];
    return generosValidos.includes(genero.toLowerCase().trim());
}

function validarCampo(campo, valor) {
    const validacoes = {
        cpf: (v) => ({ valido: validarCPF(v), mensagem: 'CPF inválido' }),
        email: (v) => ({ valido: validarEmail(v), mensagem: 'E-mail inválido' }),
        senha: (v) => ({ valido: validarSenha(v), mensagem: 'A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra e um número' }),
        datanascimento: (v) => ({ valido: validarData(v), mensagem: 'Você precisa ter pelo menos 18 anos' }),
        nome: (v) => ({ valido: v.trim().length >= 3, mensagem: 'Nome deve ter pelo menos 3 caracteres' }),
        endereco: (v) => ({ valido: v.trim().length >= 5, mensagem: 'Endereço deve ter pelo menos 5 caracteres' }),
        genero: (v) => ({ valido: validarGenero(v), mensagem: 'Gênero inválido. Use: masculino, feminino, outro ou prefiro não informar' })
    };
    
    return validacoes[campo](valor);
}

window.validation = { validarCampo };