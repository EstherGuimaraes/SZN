// services/auth.js
(function() {
  if (!window.firebaseConfig) {
    console.error('❌ Firebase config não encontrado. Verifique firebase-config.js');
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(window.firebaseConfig);
  }
  
  window.auth = firebase.auth();
  window.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
})();