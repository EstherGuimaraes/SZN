import DenunciaService from './denuncia-api.js';
import AuthService from './auth-api.js';

// Verificar autenticação
if (!AuthService.isAuthenticated()) {
    window.location.href = 'pagelogin.html';
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Carregar denúncias
        const data = await DenunciaService.listarDenuncias();
        const denuncias = data.denuncias || data || [];

        // Contar por status
        const contadores = {
            pendente: 0,
            investigando: 0,
            concluida: 0,
            urgente: 0
        };

        denuncias.forEach(d => {
            const status = (d.status || 'pendente').toLowerCase();
            if (status === 'pendente') contadores.pendente++;
            if (status === 'investigando') contadores.investigando++;
            if (status === 'concluida') contadores.concluida++;
            // Simular urgência: primeiras 3 pendentes
            if (status === 'pendente' && contadores.urgente < 3) contadores.urgente++;
        });

        // Atualizar cards
        const cards = document.querySelectorAll('.card');
        if (cards.length >= 4) {
            cards[0].querySelector('#qtd').textContent = contadores.pendente;
            cards[1].querySelector('#qtd').textContent = contadores.investigando;
            cards[2].querySelector('#qtd').textContent = contadores.investigando; // Em análise = investigando
            cards[3].querySelector('#qtd').textContent = contadores.concluida;
        }

        // Atualizar atenção
        const atencaoEl = document.getElementById('infoAtencao');
        if (atencaoEl) {
            if (contadores.urgente > 0) {
                atencaoEl.querySelector('#tituloAten').textContent = `Atenção: ${contadores.urgente} denúncia(s) urgente(s)`;
                atencaoEl.querySelector('#AtenDescricao').textContent = 'Requer ação imediata';
            } else {
                atencaoEl.querySelector('#tituloAten').textContent = 'Tudo sob controle!';
                atencaoEl.querySelector('#AtenDescricao').textContent = 'Nenhuma denúncia urgente';
            }
        }

        // Mostrar denúncias recentes
        const caixaDen = document.getElementById('caixaDen');
        if (caixaDen && denuncias.length > 0) {
            // Limpar denúncias antigas e adicionar as recentes
            const denunciasContainer = caixaDen.querySelector('.denuncias-list') || caixaDen;
            
            // Mostrar primeira denúncia como exemplo
            const primeiraDenuncia = denuncias[0];
            const denunciaEl = caixaDen.querySelector('a.denuncia');
            
            if (denunciaEl) {
                denunciaEl.href = `detalhedenuncias.html?id=${primeiraDenuncia.id}`;
                denunciaEl.querySelector('#tituloDenuncia').textContent = primeiraDenuncia.titulo || 'Sem título';
                denunciaEl.querySelector('#status').textContent = (primeiraDenuncia.status || 'pendente').toUpperCase();
                denunciaEl.querySelector('#status').className = `status ${primeiraDenuncia.status || 'pendente'}`;
                denunciaEl.querySelector('#descricaoDenuncia').textContent = 
                    (primeiraDenuncia.descricao || '').substring(0, 150) + (primeiraDenuncia.descricao?.length > 150 ? '...' : '');
                denunciaEl.querySelector('#dataDenuncia').innerHTML = 
                    `<strong>Data:</strong> ${new Date(primeiraDenuncia.created_at).toLocaleDateString('pt-BR')}`;
                denunciaEl.querySelector('#localDenuncia').innerHTML = '<strong>Local:</strong> Não especificado';
                denunciaEl.querySelector('#tipoCrime').innerHTML = '<strong>Crime:</strong> Não especificado';
            }
        }

        console.log('✅ Painel de Controle carregado com sucesso!', denuncias);

    } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
        
        // Mostrar valores padrão em caso de erro
        const cards = document.querySelectorAll('.card');
        if (cards.length >= 4) {
            cards[0].querySelector('#qtd').textContent = '0';
            cards[1].querySelector('#qtd').textContent = '0';
            cards[2].querySelector('#qtd').textContent = '0';
            cards[3].querySelector('#qtd').textContent = '0';
        }
    }
});

// Adicionar estilos de status
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .status.pendente {
        background: #fff3cd;
        color: #856404;
    }
    .status.investigando {
        background: #d1ecf1;
        color: #0c5460;
    }
    .status.concluida {
        background: #d4edda;
        color: #155724;
    }
`;
document.head.appendChild(styleSheet);
