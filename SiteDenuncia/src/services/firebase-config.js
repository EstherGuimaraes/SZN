if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  console.log("⚠️ Modo offline: usando dados simulados");
  window.auth = {
    signInWithPopup: () => Promise.resolve({ user: { displayName: "Maria Silva", email: "maria@teste.com" } }),
    signInWithEmailAndPassword: (email, senha) => {
      if (email === "teste@cidadão.gov.br" && senha === "123456") {
        return Promise.resolve({ user: { email, displayName: "Teste Usuário" } });
      }
      return Promise.reject({ code: "auth/wrong-password" });
    }
  };
}