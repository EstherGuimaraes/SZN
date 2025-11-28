import AuthService from './auth-api.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

    // Link para voltar para login
    const returnLink = document.querySelector('.return-link a');
    if (returnLink) {
        returnLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'pagelogin.html';
        });
    }

    // Função de validação individual
    function validarCampo(campo, valor) {
        switch (campo) {
            case "nome":
                if (valor.trim().length < 3) {
                    return { valido: false, mensagem: "Digite um nome válido (mín. 3 letras)" };
                }
                break;

            case "genero":
                if (valor === "") {
                    return { valido: false, mensagem: "Selecione um gênero" };
                }
                break;

            case "datanascimento":
                if (!valor) return { valido: false, mensagem: "Informe sua data de nascimento" };
                break;

            case "cpf":
                if (!/^\d{11}$/.test(valor.replace(/\D/g, ''))) {
                    return { valido: false, mensagem: "CPF deve ter 11 números" };
                }
                break;

            case "endereco":
                if (valor.trim().length < 5) {
                    return { valido: false, mensagem: "Digite um endereço válido" };
                }
                break;

            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                    return { valido: false, mensagem: "Digite um e-mail válido" };
                }
                break;

            case "senha":
                if (valor.length < 6) {
                    return { valido: false, mensagem: "A senha deve ter no mínimo 6 caracteres" };
                }
                break;
        }

        return { valido: true, mensagem: "" };
    }

    // Validação em tempo real (blur)
    document.querySelectorAll('.input-group input, .input-group select').forEach(input => {
        input.addEventListener('blur', function () {
            const campo = this.id;
            const valor = this.value;
            const resultado = validarCampo(campo, valor);

            let msg = this.parentElement.querySelector(".mensagem-erro");

            if (!msg) {
                msg = document.createElement("div");
                msg.className = "mensagem-erro";
                this.parentElement.appendChild(msg);
            }

            if (!resultado.valido) {
                msg.textContent = resultado.mensagem;
                this.classList.add("invalido");
            } else {
                msg.textContent = "";
                this.classList.remove("invalido");
            }
        });
    });
        // Permitir Enter no campo de senha para enviar o formulário
        if (input.type === 'password' || input.id === 'senha') {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    form.dispatchEvent(new Event('submit'));
                }
            });
        }


    // Submeter formulário
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let dados = {};
        let valido = true;

        const campos = ["nome", "email", "senha"];

        campos.forEach(id => {
            const input = document.getElementById(id);
            const res = validarCampo(id, input.value);

            if (!res.valido) {
                valido = false;
                input.classList.add("invalido");

                let msg = input.parentElement.querySelector(".mensagem-erro");
                if (!msg) {
                    msg = document.createElement("div");
                    msg.className = "mensagem-erro";
                    input.parentElement.appendChild(msg);
                }
                msg.textContent = res.mensagem;
            } else {
                input.classList.remove("invalido");
                dados[id] = input.value;
            }
        });

        if (!valido) {
            alert("Preencha todos os campos obrigatórios corretamente.");
            return;
        }

        const registerBtn = form.querySelector('button[type="submit"]');
        registerBtn.disabled = true;
        registerBtn.textContent = "Criando conta...";

        try {
            await AuthService.registrar(dados.nome, dados.email, dados.senha);
            alert("✅ Conta criada com sucesso! Faça login agora.");
            window.location.href = "pagelogin.html";
        } catch (error) {
            alert("❌ Erro ao criar conta: " + error.message);
            registerBtn.disabled = false;
            registerBtn.textContent = "Crie uma conta";
        }
    });
});
