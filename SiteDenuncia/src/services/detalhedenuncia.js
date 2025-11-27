document.addEventListener('DOMContentLoaded', () => {
  // Dados iniciais
  let denuncia = {
    id: 105,
    reporterName: 'Maria',
    reporterPhone: '11987654321',
    description: 'Vizinha relatou gritos de socorro e sons de agressão vindos do apartamento 302. Já é a terceira vez este mês que episódios similares ocorrem.',
    location: 'Rua das Palmeiras, 150 - Jardim Paulista',
    cityState: 'São Paulo - SP',
    date: '15/12/2025 às 11:18',
    crimeType: 'Agressão física',
    suspectInfo: 'Homem, aproximadamente 35 anos, mora no apartamento com a companheira',
    status: 'resolvida',
    investigator: null
  };

  // Carregar do localStorage
  const saved = localStorage.getItem(`denuncia_${denuncia.id}`);
  if (saved) denuncia = { ...denuncia, ...JSON.parse(saved) };

  // Elementos
  const editBtn = document.getElementById('edit-btn');
  const saveBtn = document.getElementById('save-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const statusBadge = document.getElementById('status-badge');
  const assignBtn = document.getElementById('assign-btn');
  const selectInvestigator = document.getElementById('investigator-select');

  // IDs dos campos
  const fields = {
    descricao: document.getElementById('field-descricao'),
    local: document.getElementById('field-local'),
    cidade: document.getElementById('field-cidade'),
    data: document.getElementById('field-data'),
    crime: document.getElementById('field-crime'),
    suspeito: document.getElementById('field-suspeito'),
    reporterName: document.getElementById('field-reporter-name'),
    reporterPhone: document.getElementById('field-reporter-phone')
  };

  // Formatar telefone
  const formatPhone = (raw) => {
    const n = (raw || '').replace(/\D/g, '');
    return n.length === 11 ? `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}` : raw || '—';
  };

  // Atualizar UI
  const render = () => {
    fields.descricao.textContent = denuncia.description;
    fields.local.textContent = denuncia.location;
    fields.cidade.textContent = denuncia.cityState;
    fields.data.textContent = denuncia.date;
    fields.crime.textContent = denuncia.crimeType;
    fields.suspeito.textContent = denuncia.suspectInfo;
    fields.reporterName.textContent = denuncia.reporterName;
    fields.reporterPhone.textContent = formatPhone(denuncia.reporterPhone);

    // Status
    statusBadge.className = `status ${denuncia.status}`;
    statusBadge.textContent = `Status: ${denuncia.status.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}`;

    // Investigação
    const investigationContent = document.getElementById('investigation-content');
    investigationContent.innerHTML = denuncia.investigator 
      ? `<p><strong>Investigador:</strong> ${denuncia.investigator}</p>`
      : `<p>Nenhum investigador atribuído</p>`;
  };

  // Modo edição: substitui textos por inputs
  const enableEditMode = () => {
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';

    const createInput = (el, value, isTextarea = false) => {
      const input = document.createElement(isTextarea ? 'textarea' : 'input');
      input.className = 'edit-input';
      input.value = value;
      if (!isTextarea) input.type = 'text';
      if (isTextarea) input.rows = 4;
      el.innerHTML = '';
      el.appendChild(input);
      return input;
    };

    createInput(fields.descricao, denuncia.description, true);
    createInput(fields.local, denuncia.location);
    createInput(fields.cidade, denuncia.cityState);
    createInput(fields.data, denuncia.date);
    createInput(fields.crime, denuncia.crimeType);
    createInput(fields.suspeito, denuncia.suspectInfo);
    createInput(fields.reporterName, denuncia.reporterName);
    createInput(fields.reporterPhone, formatPhone(denuncia.reporterPhone));
  };

  // Cancelar edição
  const disableEditMode = () => {
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    render();
  };

  // Validar data (formato: dd/mm/aaaa hh:mm)
  const isValidDateTime = (str) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4}) às (\d{2}):(\d{2})$/;
    if (!regex.test(str)) return false;
    const [, d, m, y, h, min] = str.match(regex);
    const date = new Date(`${y}-${m}-${d}T${h}:${min}:00`);
    return date.getFullYear() == y && 
           date.getMonth() + 1 == m && 
           date.getDate() == d &&
           date.getHours() == h &&
           date.getMinutes() == min;
  };

  // Salvar
  const save = () => {
    try {
      const inputs = document.querySelectorAll('.edit-input');
      if (inputs.length < 8) throw new Error('Campos insuficientes');

      denuncia.description = inputs[0].value.trim();
      denuncia.location = inputs[1].value.trim();
      denuncia.cityState = inputs[2].value.trim();
      denuncia.date = inputs[3].value.trim();
      denuncia.crimeType = inputs[4].value.trim();
      denuncia.suspectInfo = inputs[5].value.trim();
      denuncia.reporterName = inputs[6].value.trim();
      denuncia.reporterPhone = inputs[7].value.trim().replace(/\D/g, '');

      // Validação mínima
      if (!denuncia.description) throw new Error('Descrição é obrigatória');
      if (!isValidDateTime(denuncia.date)) {
        if (confirm('⚠️ Data no formato inválido. Deseja salvar mesmo assim?\n\nFormato esperado: 15/12/2025 às 11:18')) {
          // continua
        } else {
          return;
        }
      }

      localStorage.setItem(`denuncia_${denuncia.id}`, JSON.stringify(denuncia));
      disableEditMode();
      alert('✅ Denúncia atualizada com sucesso!');
    } catch (err) {
      alert(`❌ Erro: ${err.message || 'Verifique os campos e tente novamente.'}`);
      console.error(err);
    }
  };

  // Eventos
  editBtn.addEventListener('click', enableEditMode);
  saveBtn.addEventListener('click', save);
  cancelBtn.addEventListener('click', disableEditMode);

  statusBadge.addEventListener('click', () => {
    const statuses = ['resolvida', 'em-andamento', 'arquivada'];
    const i = statuses.indexOf(denuncia.status);
    denuncia.status = statuses[(i + 1) % 3];
    render();
    localStorage.setItem(`denuncia_${denuncia.id}`, JSON.stringify(denuncia));
  });

  assignBtn.addEventListener('click', () => {
    const nome = selectInvestigator.value;
    if (nome) {
      denuncia.investigator = nome;
      render();
      localStorage.setItem(`denuncia_${denuncia.id}`, JSON.stringify(denuncia));
      alert(`✅ Investigador atribuído: ${nome}`);
    } else {
      alert('⚠️ Selecione um investigador.');
    }
  });

  document.querySelector('.back-btn').addEventListener('click', () => {
    if (saveBtn.style.display === 'inline-block') {
      if (!confirm('Você tem alterações não salvas. Deseja sair mesmo assim?')) return;
    }
    window.location.href = 'paineldenuncias.html';
  });

  // Inicializa
  render();
});