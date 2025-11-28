const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const containerProduto = document.querySelector(".product");
const totalEl = document.querySelector(".total span");

if (carrinho.length > 0 && containerProduto) {
  const item = carrinho[0];

  containerProduto.innerHTML = `
    <img src="${item.imagem}">
    <div class="product-info">
      <h3>${item.nome}</h3>
      <span>${item.cor}</span><br>
      <small>${item.tamanho}</small>
    </div>
    <p class="product-price">R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
  `;

  if (totalEl) totalEl.textContent = `R$ ${(item.preco * item.quantidade).toFixed(2)}`;
}

// Função para coletar dados do formulário de pagamento
function coletarDadosPagamento() {
  return {
    email: document.getElementById('pag-email')?.value || '',
    pais: document.getElementById('pag-pais')?.value || '',
    nome: document.getElementById('pag-nome')?.value || '',
    sobrenome: document.getElementById('pag-sobrenome')?.value || '',
    cep: document.getElementById('pag-cep')?.value || '',
    endereco: document.getElementById('pag-endereco')?.value || '',
    telefone: document.getElementById('pag-telefone')?.value || '',
    descricao: document.getElementById('pag-descricao')?.value || '',
    modeloEntrega: document.getElementById('pag-modelo-entrega')?.value || '',
    carrinho
  };
}

// Envia os dados para o endpoint de denúncias (SiteDenuncia)
async function enviarParaDenunciaAPI(paymentMethod) {
  const dados = coletarDadosPagamento();

  const titulo = `Pedido - ${dados.nome} ${dados.sobrenome} - ${paymentMethod}`;
  const descricao = JSON.stringify({ contato: dados.email, endereco: dados.endereco, telefone: dados.telefone, descricao: dados.descricao, carrinho: dados.carrinho, total: totalEl?.textContent || '' });

  // URL base da API de denúncias (ajuste se seu backend estiver em outra porta)
  const DENUNCIA_API_BASE = 'http://localhost:3002/api/denuncias';
  const PUBLIC_ENDPOINT = DENUNCIA_API_BASE + '/public';

  try {
    const token = localStorage.getItem('auth_token');

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('meta', JSON.stringify({ paymentMethod: paymentMethod, modeloEntrega: dados.modeloEntrega, pais: dados.pais, cep: dados.cep }));

    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // Tenta enviar com token (se existir). Se receber 401/403, tentar rota pública.
    const trySend = async (url, hdrs) => {
      const response = await fetch(url, { method: 'POST', headers: hdrs, body: formData });
      return response;
    };

    // 1) Tentar envio para endpoint principal
    let response = await trySend(DENUNCIA_API_BASE, headers);

    // Se sem token or não autorizado, tentar rota pública
    if (!response.ok && (response.status === 401 || response.status === 403)) {
      // tentar rota pública (sem Authorization)
      response = await trySend(PUBLIC_ENDPOINT, {});
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.erro || `Erro ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}

// Attach payment button handlers
document.addEventListener('DOMContentLoaded', () => {
  const btnPix = document.querySelector('.pix');
  const btnCredito = document.querySelector('.credito');
  const btnDebito = document.querySelector('.debito');

  async function handler(e, method) {
    e.preventDefault();
    try {
      const res = await enviarParaDenunciaAPI(method);
      alert('Pagamento registrado e dados enviados como denúncia. ID: ' + (res.id || res.insertId || '—'));
      // Após sucesso, navegar para página final
      window.location.href = '/SZN/src/pages/Final.html';
    } catch (error) {
      alert('Erro ao enviar dados: ' + error.message);
      console.error(error);
    }
  }

  if (btnPix) btnPix.addEventListener('click', (e) => handler(e, 'Pix'));
  if (btnCredito) btnCredito.addEventListener('click', (e) => handler(e, 'Crédito'));
  if (btnDebito) btnDebito.addEventListener('click', (e) => handler(e, 'Débito'));
});
