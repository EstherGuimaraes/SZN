import API_CONFIG from "./api-config.js";

// Serviço de Autenticação integrado com Backend
const AuthService = {
  /**
   * Login com email e senha
   */
  async login(email, senha) {
    try {
      const response = await fetch(`${API_CONFIG.LOGIN_API}/usuarios/login`, {
        method: "POST",
        headers: API_CONFIG.getHeaders(),
        body: JSON.stringify({ email, senha })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensagem || "Falha ao fazer login");
      }

      const data = await response.json();
      
      // Salvar token e dados do usuário
      if (data.token) {
        API_CONFIG.setToken(data.token);
        API_CONFIG.setUser(data.usuario);
      }

      return data;
    } catch (error) {
      console.error("❌ Erro no login:", error);
      throw error;
    }
  },

  /**
   * Registrar novo usuário
   */
  async registrar(nome, email, senha) {
    try {
      const response = await fetch(`${API_CONFIG.LOGIN_API}/usuarios`, {
        method: "POST",
        headers: API_CONFIG.getHeaders(),
        body: JSON.stringify({ nome, email, senha })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mensagem || "Falha ao registrar");
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Erro no registro:", error);
      throw error;
    }
  },

  /**
   * Fazer logout
   */
  logout() {
    API_CONFIG.clearAuth();
  },

  /**
   * Verificar se está autenticado
   */
  isAuthenticated() {
    return API_CONFIG.isAuthenticated();
  },

  /**
   * Obter usuário atual
   */
  getCurrentUser() {
    return API_CONFIG.getUser();
  },

  /**
   * Obter token
   */
  getToken() {
    return API_CONFIG.getToken();
  }
};

export default AuthService;
