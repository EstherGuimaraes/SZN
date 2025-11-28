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
  const DENUNCIA_API = 'http://localhost:3002/api/denuncias';

  try {
    const token = localStorage.getItem('auth_token');

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('meta', JSON.stringify({ paymentMethod: paymentMethod, modeloEntrega: dados.modeloEntrega, pais: dados.pais, cep: dados.cep }));

    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(DENUNCIA_API, {
      method: 'POST',
      headers,
      body: formData
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.erro || `Erro ${res.status}`);
    }

    const result = await res.json();
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
