document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const googleBtn = document.getElementById('google-login');
  const loginBtn = document.getElementById('login-btn');
  const btnText = document.getElementById('btn-text');
  const feedbackDiv = document.getElementById('feedback');

  const showFeedback = (message, isSuccess = false) => {
    feedbackDiv.textContent = message;
    feedbackDiv.className = `feedback ${isSuccess ? 'success' : 'error'}`;
    feedbackDiv.style.display = 'block';
  };

  const resetButton = () => {
    loginBtn.disabled = false;
    btnText.textContent = 'Entrar';
  };

  googleBtn.addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    googleBtn.disabled = true;
    googleBtn.innerHTML = `<span>Conectando...</span>`;

    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      
      showFeedback(`✅ Bem-vindo, ${user.displayName || user.email}! Redirecionando...`, true);
      
      setTimeout(() => {
        window.location.href = 'paineldenuncias.html';
      }, 1500);
      
    } catch (error) {
      console.error('Erro Google:', error);
      let msg = 'Falha ao entrar com Google.';
      if (error.code === 'auth/popup-closed-by-user') msg = 'Login cancelado.';
      if (error.code === 'auth/network-request-failed') msg = 'Sem conexão com a internet.';
      
      showFeedback(`❌ ${msg}`);
      googleBtn.disabled = false;
      googleBtn.innerHTML = `<img class="google-icon" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google"> Entrar com Google`;
    }
  });

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
      const userCredential = await auth.signInWithEmailAndPassword(email, senha);
      const user = userCredential.user;
      
      showFeedback(`✅ Olá, ${user.displayName || user.email}!`, true);
      
      setTimeout(() => {
        window.location.href = 'paineldenuncias.html';
      }, 1500);
      
    } catch (error) {
      console.error('Erro login:', error);
      let msg = 'E-mail ou senha incorretos.';
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-email':
          msg = 'E-mail inválido ou não cadastrado.';
          break;
        case 'auth/wrong-password':
          msg = 'Senha incorreta.';
          break;
        case 'auth/too-many-requests':
          msg = 'Muitas tentativas. Tente novamente mais tarde.';
          break;
      }
      showFeedback(`❌ ${msg}`);
      resetButton();
    }
  });

  window.simularCadastro = () => {
    if (confirm('Deseja criar uma conta de teste?\n\nE-mail: teste@cidadão.gov.br\nSenha: 123456')) {
      auth.createUserWithEmailAndPassword('teste@cidadão.gov.br', '123456')
        .then(() => {
          alert('✅ Conta criada!\nAgora faça login com os dados acima.');
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            alert('✅ Conta já existe.\nFaça login com:\nE-mail: teste@cidadão.gov.br\nSenha: 123456');
          } else {
            alert('Erro ao criar conta: ' + err.message);
          }
        });
    }
  };
});