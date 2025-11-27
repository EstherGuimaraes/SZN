import DenunciaService from './denuncia-api.js';
import AuthService from './auth-api.js';

// Carregar denúncias na página
export async function carregarDenuncias() {
  try {
    if (!AuthService.isAuthenticated()) {
      window.location.href = 'pagelogin.html';
      return;
    }

    const data = await DenunciaService.listarDenuncias();
    const denuncias = data.denuncias || data;
    
    const container = document.getElementById('denuncias-container');
    
    if (!denuncias || denuncias.length === 0) {
      container.innerHTML = '<p>Nenhuma denúncia registrada.</p>';
      return;
    }

    container.innerHTML = denuncias.map(d => `
      <div class="denuncia-card">
        <h3>${d.titulo || 'Sem título'}</h3>
        <p>${d.descricao.substring(0, 100)}...</p>
        <span class="status ${d.status || 'pendente'}">${d.status || 'pendente'}</span>
        <button onclick="verDetalhes(${d.id})">Ver detalhes</button>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar denúncias:', error);
    alert('Erro ao carregar denúncias: ' + error.message);
  }
}

// Ver detalhes de uma denúncia
export async function verDetalhes(id) {
  try {
    const denuncia = await DenunciaService.buscarDenuncia(id);
    alert(`
Título: ${denuncia.titulo}
Descrição: ${denuncia.descricao}
Status: ${denuncia.status}
Criada em: ${new Date(denuncia.created_at).toLocaleDateString()}
    `);
  } catch (error) {
    alert('Erro ao carregar detalhes: ' + error.message);
  }
}

// Criar nova denúncia
export async function criarDenuncia(event) {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const midiaInput = document.getElementById('midia');
  const midia = midiaInput?.files[0] || null;

  if (!titulo || !descricao) {
    alert('⚠️ Preencha titulo e descrição');
    return;
  }

  try {
    const btn = event.target.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const resultado = await DenunciaService.criarDenuncia(titulo, descricao, midia);
    
    alert('✅ Denúncia criada com sucesso!');
    event.target.reset();
    carregarDenuncias(); // Recarregar lista

  } catch (error) {
    alert('❌ Erro ao criar denúncia: ' + error.message);
  } finally {
    const btn = event.target.querySelector('button');
    btn.disabled = false;
    btn.textContent = 'Enviar Denúncia';
  }
}

// Logout
export function logout() {
  AuthService.logout();
  window.location.href = 'pagelogin.html';
}

// Inicializar página quando carregada
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('denuncias-container')) {
    carregarDenuncias();
  }

  const formDenuncia = document.getElementById('form-denuncia');
  if (formDenuncia) {
    formDenuncia.addEventListener('submit', criarDenuncia);
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});
