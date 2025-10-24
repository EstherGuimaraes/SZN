const USERS_KEY = 'szn_users_v1';

async function sha256Hex(message) {
  if (window.crypto && window.crypto.subtle) {
    const enc = new TextEncoder();
    const msgUint8 = enc.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  return btoa(message);
}

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

async function registerUser(userData) {
  if (!userData.email || !userData.senha) throw new Error('Preencha email e senha');

  const users = loadUsers();
  if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    throw new Error('Este e-mail já está cadastrado');
  }

  const pwHash = await sha256Hex(userData.senha);
  users.push({
    email: userData.email,
    nome: userData.nome,
    datanascimento: userData.datanascimento,
    cpf: userData.cpf,
    endereco: userData.endereco,
    pwHash
  });
  saveUsers(users);
}

async function loginUser(email, password) {
  if (!email || !password) throw new Error('Preencha email e senha');
  const users = loadUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error('Usuário não encontrado');
  const pwHash = await sha256Hex(password);
  if (pwHash !== user.pwHash) throw new Error('Senha inválida');
  // Salvar usuário logado
  localStorage.setItem('current_user', JSON.stringify({
    email: user.email,
    nome: user.nome,
    cpf: user.cpf,
    endereco: user.endereco,
    datanascimento: user.datanascimento
  }));
  return user;
}

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = {
        email: registerForm.querySelector('#email')?.value?.trim(),
        senha: registerForm.querySelector('#senha')?.value,
        nome: registerForm.querySelector('#nome')?.value?.trim(),
        genero: registerForm.querySelector('#genero')?.value?.trim(),
        datanascimento: registerForm.querySelector('#datanascimento')?.value,
        cpf: registerForm.querySelector('#cpf')?.value?.trim(),
        endereco: registerForm.querySelector('#endereco')?.value?.trim()
      };
      try {
        await registerUser(formData);
        alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
        window.location.href = 'pagelogin.html';
      } catch (err) {
        alert(err.message || err);
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('#email')?.value?.trim();
      const password = loginForm.querySelector('#senha')?.value;
      try {
        await loginUser(email, password);
        window.location.href = 'painelcontrole.html';
      } catch (err) {
        alert(err.message || err);
      }
    });
  }
});

window.__auth = { registerUser, loginUser, loadUsers };
