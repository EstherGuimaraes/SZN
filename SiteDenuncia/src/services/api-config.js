// Configuração centralizada da API
const API_CONFIG = {
  // URLs base dos serviços
  DENUNCIA_API: import.meta.env.VITE_DENUNCIA_API || "http://localhost:3002/api",
  LOGIN_API: import.meta.env.VITE_LOGIN_API || "http://localhost:3000/api",
  POLICIA_API: import.meta.env.VITE_POLICIA_API || "http://localhost:3005/api",

  // Chaves de localStorage
  TOKEN_KEY: "auth_token",
  USER_KEY: "auth_user",

  // Headers padrão
  getHeaders(token = null) {
    const headers = {
      "Content-Type": "application/json"
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  },

  // Métodos auxiliares
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  },

  setToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  },

  getUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser(user) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  },

  clearAuth() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};

export default API_CONFIG;
