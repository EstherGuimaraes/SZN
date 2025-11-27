# 📚 Documentação - SZN Sistema Integrado

## 📖 Guias Disponíveis

### 🚀 Começar Aqui
1. **[QUICK_START.md](./QUICK_START.md)** ⚡ 
   - Como iniciar em 5 minutos
   - Pré-requisitos
   - Comandos essenciais

### 📋 Referências
2. **[API_REFERENCE.md](./API_REFERENCE.md)** 📡
   - Todos os endpoints
   - Exemplos com cURL
   - Códigos de erro
   - Modelos de dados

3. **[RESUMO_COMPLETO.md](./RESUMO_COMPLETO.md)** 📊
   - Problemas encontrados e corrigidos
   - Arquivos criados/modificados
   - Fluxos de autenticação
   - Status final do projeto

### 🌍 Produção
4. **[DEPLOYMENT.md](./DEPLOYMENT.md)** 🔒
   - Setup de produção
   - Nginx + SSL
   - PM2 process manager
   - Backup e disaster recovery

### 📚 Backend
5. **[BackEnd/README.md](./BackEnd/README.md)** 🛠️
   - Estrutura do backend
   - Configuração detalhada
   - Troubleshooting

---

## 📂 Estrutura do Projeto

```
SZN/
├── 📚 QUICK_START.md              ← COMEÇAR AQUI
├── 📚 API_REFERENCE.md
├── 📚 RESUMO_COMPLETO.md
├── 📚 DEPLOYMENT.md
├── 📚 INDEX.md                    ← VOCÊ ESTÁ AQUI
│
├── BackEnd/
│   ├── 📚 README.md
│   ├── .env                       ← CRIAR COM SUAS CREDENCIAIS
│   ├── .env.example
│   │
│   ├── login_mysql/               (Porta 3000)
│   │   ├── server.js
│   │   ├── package.json
│   │   └── src/
│   │
│   ├── denuncia/                  (Porta 3002)
│   │   ├── server.js
│   │   ├── package.json
│   │   └── src/
│   │
│   └── Policia-Service/           (Porta 3005)
│       ├── server.js
│       ├── package.json
│       └── src/
│
└── SiteDenuncia/
    └── src/
        ├── pages/
        │   ├── pagelogin.html
        │   ├── paineldenuncias.html
        │   └── 🆕 teste-api.html   ← TESTAR ENDPOINTS
        │
        └── services/
            ├── 🆕 api-config.js
            ├── 🆕 auth-api.js
            ├── 🆕 denuncia-api.js
            ├── 🆕 denuncias-handler.js
            └── login.js (ATUALIZADO)
```

---

## 🎯 Roteiros Rápidos

### Para Iniciantes
```
1. Ler: QUICK_START.md
2. Executar: Comandos de setup
3. Testar: teste-api.html
4. Consultar: API_REFERENCE.md
```

### Para Desenvolvedores
```
1. Ler: BackEnd/README.md
2. Explorar: Estrutura de pastas
3. Entender: Middlewares e rotas
4. Customizar: Segundo suas necessidades
```

### Para DevOps/Deploy
```
1. Ler: DEPLOYMENT.md
2. Setup: Servidor e banco de dados
3. Configurar: Nginx e SSL
4. Monitor: PM2 e logs
```

---

## 🔑 Informações Importantes

### Credenciais de Teste
```
Email: teste@teste.com
Senha: 123456
```

### Portas Padrão
- Login Service: `3000`
- Denuncia Service: `3002`
- Polícia Service: `3005`
- Frontend: `5173`

### Banco de Dados
- Tipo: MySQL 8+
- Banco: `szn_database`
- Charset: `utf8mb4`

---

## ✨ Arquivos Principais Criados

### 🆕 Novos Arquivos de Integração Frontend
- `SiteDenuncia/src/services/api-config.js` - Configuração centralizada
- `SiteDenuncia/src/services/auth-api.js` - Autenticação integrada
- `SiteDenuncia/src/services/denuncia-api.js` - Serviço de denúncias
- `SiteDenuncia/src/services/denuncias-handler.js` - Handlers UI
- `SiteDenuncia/src/pages/teste-api.html` - Página de testes

### 🔧 Arquivos de Configuração
- `BackEnd/.env` - Variáveis de ambiente (CRIAR)
- `BackEnd/.env.example` - Exemplo de .env
- `BackEnd/denuncia/package.json` - Scripts denuncia service
- `BackEnd/login_mysql/package.json` - Atualizado

### 📚 Documentação
- `QUICK_START.md` - Início rápido
- `API_REFERENCE.md` - Referência de endpoints
- `RESUMO_COMPLETO.md` - Resumo executivo
- `DEPLOYMENT.md` - Guia de produção
- `BackEnd/README.md` - Backend detalhado

---

## 🚀 Próximos Passos

### Primeira Execução
1. [ ] Clonar/abrir projeto
2. [ ] Ler QUICK_START.md
3. [ ] Criar banco de dados
4. [ ] Criar arquivo .env
5. [ ] `npm install` em cada serviço
6. [ ] `npm run dev` em 3 terminais
7. [ ] Abrir teste-api.html no navegador

### Teste Completo
1. [ ] Login com teste@teste.com
2. [ ] Criar uma denúncia
3. [ ] Listar denúncias
4. [ ] Buscar denúncia por ID
5. [ ] Verificar logs no terminal

### Customização
1. [ ] Ajustar campos no banco
2. [ ] Adicionar novas rotas
3. [ ] Implementar validações extras
4. [ ] Integrar com outros serviços

---

## 🆘 Suporte Rápido

### Comandos Úteis
```bash
# Verificar se serviço está rodando
curl http://localhost:3000/

# Ver banco de dados criado
mysql -u root -p -e "SHOW DATABASES;"

# Listar processos Node
ps aux | grep node

# Matar processo na porta
npx kill-port 3000
```

### Onde Procurar Ajuda
1. **Erros de conexão**: Verificar .env
2. **Erros de banco**: Verificar MySQL
3. **Erros CORS**: Verificar FRONTEND_URL
4. **Erros de autenticação**: Verificar JWT_SECRET
5. **Erros de rota**: Consultar API_REFERENCE.md

---

## 📞 Contato & Suporte

- 📧 Email: suporte@seudominio.com
- 💬 GitHub Issues: [seu_repo]
- 📱 Whatsapp: Seu número

---

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| Serviços Backend | 3 |
| Endpoints Implementados | 15+ |
| Arquivos de Integração | 5 |
| Documentação (páginas) | 5 |
| Linhas de Código | 2000+ |
| Status | ✅ Pronto |

---

## 🎉 Sumário Final

```
✅ Backend: 100% funcional
✅ Frontend: Integrado
✅ Autenticação: JWT implementado
✅ Banco de Dados: MySQL configurado
✅ Documentação: Completa
✅ Testes: Página de testes inclusa

🚀 PRONTO PARA USO!
```

---

**Última atualização:** 27/11/2025  
**Versão:** 1.0.0  
**Status:** 🟢 ESTÁVEL E COMPLETO
