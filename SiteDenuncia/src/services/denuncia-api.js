import API_CONFIG from "./api-config.js";

// Serviço de Denúncias integrado com API Backend
const DenunciaService = {
  /**
   * Listar todas as denúncias
   */
  async listarDenuncias() {
    try {
      const token = API_CONFIG.getToken();
      const response = await fetch(`${API_CONFIG.DENUNCIA_API}/denuncias`, {
        method: "GET",
        headers: API_CONFIG.getHeaders(token)
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Erro ao listar denúncias:", error);
      throw error;
    }
  },

  /**
   * Buscar denúncia por ID
   */
  async buscarDenuncia(id) {
    try {
      const token = API_CONFIG.getToken();
      const response = await fetch(`${API_CONFIG.DENUNCIA_API}/denuncias/${id}`, {
        method: "GET",
        headers: API_CONFIG.getHeaders(token)
      });

      if (!response.ok) {
        throw new Error(`Denúncia não encontrada`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Erro ao buscar denúncia:", error);
      throw error;
    }
  },

  /**
   * Criar nova denúncia
   */
  async criarDenuncia(titulo, descricao, midia = null) {
    try {
      const token = API_CONFIG.getToken();

      if (!token) {
        throw new Error("Você precisa estar autenticado para criar uma denúncia");
      }

      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);

      if (midia) {
        formData.append("midia", midia);
      }

      const response = await fetch(`${API_CONFIG.DENUNCIA_API}/denuncias`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
          // Não incluir Content-Type, o fetch define automaticamente
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.erro || "Erro ao criar denúncia");
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Erro ao criar denúncia:", error);
      throw error;
    }
  },

  /**
   * Listar denúncias para polícia
   */
  async listarParaPolicia() {
    try {
      const token = API_CONFIG.getToken();
      const response = await fetch(`${API_CONFIG.POLICIA_API}/policia/denuncias`, {
        method: "GET",
        headers: API_CONFIG.getHeaders(token)
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: Acesso negado`);
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Erro ao listar denúncias para polícia:", error);
      throw error;
    }
  }
};

export default DenunciaService;
