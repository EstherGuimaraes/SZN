const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Verificações básicas para diagnosticar problemas comuns
function isFirebaseLoaded() {
  return !!window.firebase && !!window.firebase.auth;
}

if (!isFirebaseLoaded()) {
  console.error('Firebase SDK não encontrado. Verifique se os scripts do Firebase estão incluídos antes deste arquivo.');
}

if (typeof firebaseConfig.apiKey === 'undefined' || firebaseConfig.apiKey === 'SUA_API_KEY') {
  console.warn('FirebaseConfig parece não estar preenchido. Substitua os placeholders no arquivo loginGoogle.js.');
}

if (!window.firebase.apps || window.firebase.apps.length === 0) {
  try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase inicializado.');
  } catch (e) {
    console.error('Erro ao inicializar Firebase:', e);
  }
}

function loginComGoogle() {
  if (!isFirebaseLoaded()) {
    alert('Erro: Firebase não está carregado. Verifique a inclusão dos SDKs no HTML.');
    return;
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('Usuário logado:', result.user);
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect') || '/pages/painelcontrole.html';
      window.location.href = redirect;
    })
    .catch((error) => {
      console.error('Erro ao logar com Google:', error);
      // Mensagens mais informativas para o usuário
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        alert('O popup de login foi bloqueado ou fechado. Tente permitir popups e tente novamente.');
      } else if (error.code === 'auth/operation-not-allowed') {
        alert('Login com Google não está habilitado no console do Firebase. Ative o provedor Google.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        alert('Pedido de login cancelado. Tente novamente.');
      } else {
        alert('Erro ao logar com Google: ' + (error.message || error.code));
      }
    });
}
