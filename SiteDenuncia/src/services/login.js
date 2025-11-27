import AuthService from './auth-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginBtn = document.getElementById('login-btn');
  const btnText = document.getElementById('btn-text');
  const feedbackDiv = document.getElementById('feedback');
  
  // Link para criar conta
  const registerLink = document.querySelector(".register-link a");
  if (registerLink) {
    registerLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "register.html";
    });
  }

  const showFeedback = (message, isSuccess = false) => {
    feedbackDiv.textContent = message;
    feedbackDiv.className = `feedback ${isSuccess ? 'success' : 'error'}`;
    feedbackDiv.style.display = 'block';
  };

  const resetButton = () => {
    loginBtn.disabled = false;
    btnText.textContent = 'Entrar';
  };

  // Validação em tempo real do email
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const email = emailInput.value.trim();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      
      if (email && !isValidEmail) {
        emailInput.style.borderColor = '#ef5350';
        emailInput.title = 'E-mail inválido';
      } else {
        emailInput.style.borderColor = '#ddd';
        emailInput.title = '';
      }
    });

    emailInput.addEventListener('focus', () => {
      emailInput.style.borderColor = '#667eea';
    });
  }

  // Permitir envio com Enter na senha
  const senhaInput = document.getElementById('senha');
  if (senhaInput) {
    senhaInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
      }
    });
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    
    if (!email || !senha) {
      showFeedback('⚠️ Preencha e-mail e senha.');
      return;
    }

    loginBtn.disabled = true;
    btnText.textContent = 'Entrando...';

    try {
      const result = await AuthService.login(email, senha);
      
      showFeedback(`✅ Bem-vindo, ${result.usuario.nome}!`, true);
      
      setTimeout(() => {
        window.location.href = 'paineldenuncias.html';
      }, 1500);
      
    } catch (error) {
      console.error('Erro login:', error);
      
      let msg = error.message || 'Erro ao fazer login.';
      
      if (msg.includes('E-mail')) {
        msg = 'E-mail inválido ou não cadastrado.';
      } else if (msg.includes('senha')) {
        msg = 'Senha incorreta.';
      }
      
      showFeedback(`❌ ${msg}`);
      resetButton();
    }
  });

  // Simular criação de conta (opcional)
  window.simularCadastro = async () => {
    if (confirm('Deseja criar uma conta de teste?\n\nE-mail: teste@teste.com\nSenha: 123456')) {
      try {
        await AuthService.registrar('Usuário Teste', 'teste@teste.com', '123456');
        alert('✅ Conta criada!\nAgora faça login com os dados acima.');
      } catch (err) {
        if (err.message.includes('já cadastrado')) {
          alert('✅ Conta já existe.\nFaça login com:\nE-mail: teste@teste.com\nSenha: 123456');
        } else {
          alert('Erro ao criar conta: ' + err.message);
        }
      }
    }
  };
});