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

// Validação do formulário de pagamento
function validarDadosPagamento(dados) {
  const errors = [];
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // limpar estilos anteriores
  ['pag-email','pag-nome','pag-telefone','pag-endereco','pag-cep'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.borderColor = '';
      const prev = el.parentElement?.querySelector('.field-error');
      if (prev) prev.remove();
    }
  });

  if (!dados.email || !emailRe.test(dados.email)) {
    errors.push({ field: 'pag-email', message: 'E-mail inválido ou obrigatório.' });
  }

  if (!dados.nome || dados.nome.trim().length < 2) {
    errors.push({ field: 'pag-nome', message: 'Nome deve ter ao menos 2 caracteres.' });
  }

  const telefoneNums = (dados.telefone || '').replace(/\D/g, '');
  if (!telefoneNums || telefoneNums.length < 8) {
    errors.push({ field: 'pag-telefone', message: 'Telefone inválido ou obrigatório.' });
  }

  if (!dados.endereco || dados.endereco.trim().length < 5) {
    errors.push({ field: 'pag-endereco', message: 'Endereço inválido ou obrigatório.' });
  }

  const cepNums = (dados.cep || '').replace(/\D/g, '');
  if (!cepNums || cepNums.length < 5) {
    errors.push({ field: 'pag-cep', message: 'CEP inválido ou obrigatório.' });
  }

  return { valid: errors.length === 0, errors };
}

// Envia os dados para o endpoint de denúncias (SiteDenuncia)
async function enviarParaDenunciaAPI(paymentMethod) {
  const dados = coletarDadosPagamento();

  const titulo = `Pedido - ${dados.nome} ${dados.sobrenome} - ${paymentMethod}`;
  const descricao = JSON.stringify({ 
    contato: dados.email, 
    endereco: dados.endereco, 
    telefone: dados.telefone, 
    descricao: dados.descricao, 
    carrinho: dados.carrinho, 
    total: totalEl?.textContent || '',
    paymentMethod: paymentMethod,
    modeloEntrega: dados.modeloEntrega,
    pais: dados.pais,
    cep: dados.cep
  });

  const DENUNCIA_API_BASE = 'http://localhost:3002/api/denuncias';
  const PUBLIC_ENDPOINT = DENUNCIA_API_BASE + '/public';

  try {
    const token = localStorage.getItem('auth_token');
    const payload = { titulo, descricao };

    const trySend = async (url, hdrs) => {
      console.log('📤 Enviando para:', url);
      console.log('Payload:', payload);
      const response = await fetch(url, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', ...hdrs }, 
        body: JSON.stringify(payload) 
      });
      console.log('📥 Resposta status:', response.status);
      return response;
    };

    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // 1) Tentar envio para endpoint principal
    let response = await trySend(DENUNCIA_API_BASE, headers);

    // Se sem token ou não autorizado, tentar rota pública
    if (!response.ok && (response.status === 401 || response.status === 403)) {
      console.log('⚠️ Tentando rota pública...');
      response = await trySend(PUBLIC_ENDPOINT, {});
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error('❌ Erro resposta:', errText);
      try {
        const err = JSON.parse(errText);
        throw new Error(err.erro || err.mensagem || `Erro ${response.status}`);
      } catch {
        throw new Error(`Erro ${response.status}: ${errText}`);
      }
    }

    const result = await response.json();
    console.log('✅ Sucesso:', result);
    return result;
  } catch (err) {
    console.error('❌ Erro geral:', err);
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
    const dados = coletarDadosPagamento();
    const valid = validarDadosPagamento(dados);
    if (!valid.valid) {
      valid.errors.forEach(err => {
        const el = document.getElementById(err.field);
        if (el) {
          el.style.borderColor = '#ef5350';
          const small = document.createElement('div');
          small.className = 'field-error';
          small.style.color = '#c62828';
          small.style.fontSize = '12px';
          small.textContent = err.message;
          el.parentElement.appendChild(small);
        }
      });
      const first = document.getElementById(valid.errors[0].field);
      if (first) first.focus();
      alert('Preencha corretamente os campos obrigatórios.');
      return;
    }

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
