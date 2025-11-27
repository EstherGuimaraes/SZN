# 🚀 Sistema SZN - Backend & Frontend Integrados

## 📋 Resumo das Correções Realizadas

### Backend (Node.js + Express + MySQL)

#### ✅ **Problemas Corrigidos:**

1. **Padronização de Módulos**
   - Convertido tudo para **ES6 modules** (import/export)
   - Consistência em todos os serviços

2. **Banco de Dados**
   - Corrigido PostgreSQL em porta errada (3306 → 5432) para MySQL (3306)
   - Credenciais removidas dos arquivos (agora usa `.env`)
   - Criação automática de tabelas com constraints apropriadas

3. **Autenticação & Segurança**
   - JWT padronizado com secret em `.env`
   - Middlewares unificados (`verificarToken`, `validateToken`, `authPolice`)
   - Melhor tratamento de erros

4. **CORS & Integração**
   - CORS habilitado em todos os serviços
   - URLs de API centralizadas

5. **Estrutura de Serviços**
   - **Login Service (Porta 3000)**: Gerencia usuários
   - **Denuncia Service (Porta 3002)**: Gerencia denúncias
   - **Polícia Service (Porta 3005)**: Visualização de denúncias (permissões)

### Frontend (HTML/CSS/JS)

#### ✅ **Integrações Implementadas:**

1. **API Config Centralizado** (`api-config.js`)
   - URLs base dos serviços
   - Gerenciamento de tokens
   - Helper methods para autenticação

2. **Serviços de API** 
   - `auth-api.js`: Login, registro, logout
   - `denuncia-api.js`: Criar, listar, buscar denúncias
   - `denuncias-handler.js`: Handlers para UI

3. **Autenticação Integrada**
   - Login via API Backend
   - Tokens JWT armazenados em localStorage
   - Proteção de rotas (redireciona se não autenticado)

---

## 🔧 Como Configurar

### 1. Instalar Dependências

```bash
# Login Service
cd BackEnd/login_mysql
npm install

# Denuncia Service
cd ../denuncia
npm install

# Polícia Service
cd ../Policia-Service
npm install
```

### 2. Configurar Banco de Dados

```bash
# Criar banco de dados MySQL
mysql -u root -p

# No MySQL:
CREATE DATABASE szn_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 3. Configurar .env

```bash
# Na pasta BackEnd, copie .env.example para .env
cp .env.example .env

# Edite .env com suas credenciais:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=szn_database
JWT_SECRET=sua_chave_secreta_super_forte_aqui
```

### 4. Iniciar Serviços Backend

```bash
# Terminal 1 - Login Service (porta 3000)
cd BackEnd/login_mysql
npm run dev

# Terminal 2 - Denuncia Service (porta 3002)
cd BackEnd/denuncia
npm run dev

# Terminal 3 - Polícia Service (porta 3005)
cd BackEnd/Policia-Service
npm run dev
```

### 5. Servir Frontend

```bash
# Opção 1: Usar Live Server no VS Code
# Clique em Go Live na página HTML

# Opção 2: Python 3
cd SiteDenuncia
python -m http.server 5173

# Opção 3: Node.js (http-server)
npx http-server SiteDenuncia -p 5173
```

---

## 📡 Endpoints da API

### **LOGIN SERVICE** (http://localhost:3000/api)

```http
POST   /usuarios           # Criar usuário
GET    /usuarios           # Listar usuários
GET    /usuarios/:id       # Buscar por ID
PUT    /usuarios/:id       # Atualizar usuário
DELETE /usuarios/:id       # Deletar usuário
POST   /usuarios/login     # Fazer login (recebe token JWT)
```

### **DENUNCIA SERVICE** (http://localhost:3002/api)

```http
GET    /denuncias          # Listar todas
GET    /denuncias/:id      # Buscar denúncia
POST   /denuncias          # Criar denúncia (requer token)
```

### **POLÍCIA SERVICE** (http://localhost:3005/api)

```http
GET    /policia/denuncias           # Listar (apenas policiais)
GET    /policia/denuncias/:id       # Buscar (apenas policiais)
```

---

## 🔐 Autenticação

### Fluxo de Login

1. **Usuário faz login** via formulário
2. **Backend valida** email e senha
3. **Retorna JWT token** e dados do usuário
4. **Frontend armazena** token em localStorage
5. **Token incluído** em todas as requisições subsequentes

### Usar Token em Requisições

```javascript
const headers = {
  "Authorization": `Bearer ${token}`,
  "Content-Type": "application/json"
};

fetch("http://localhost:3002/api/denuncias", {
  method: "POST",
  headers,
  body: JSON.stringify({ titulo: "...", descricao: "..." })
});
```

---

## 📝 Exemplo de Criação de Denúncia

### Via JavaScript

```javascript
import DenunciaService from './services/denuncia-api.js';

// Criar denúncia
const resultado = await DenunciaService.criarDenuncia(
  "Problema no bairro",
  "Descrição detalhada do problema",
  archivoMidia // opcional
);

console.log(resultado); // { mensagem: "...", denuncia: {...} }
```

### Via cURL

```bash
curl -X POST http://localhost:3002/api/denuncias \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -F "titulo=Denúncia de teste" \
  -F "descricao=Descrição aqui" \
  -F "midia=@/caminho/arquivo.jpg"
```

---

## 🗂️ Estrutura de Diretórios

```
BackEnd/
├── .env                  # Variáveis de ambiente (CRIAR MANUALMENTE)
├── .env.example          # Exemplo de .env
├── login_mysql/          # Serviço de Usuários
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/db.js
│       ├── controllers/userController.js
│       ├── models/userModels.js
│       └── routes/userRoutes.js
├── denuncia/             # Serviço de Denúncias
│   ├── server.js
│   └── src/
│       ├── config/db.js
│       ├── controllers/denuncia.controller.js
│       ├── middlewares/verificarToken.js
│       ├── services/denuncia.service.js
│       └── routes/denuncia1.js
└── Policia-Service/      # Serviço da Polícia
    ├── server.js
    └── src/
        ├── config/db.js
        ├── controllers/policia.controller.js
        ├── middlewares/
        ├── services/policia.service.js
        └── routes/policia.routes.js

SiteDenuncia/
└── src/
    ├── pages/
    │   ├── pagelogin.html
    │   ├── paineldenuncias.html
    │   └── ...
    ├── services/
    │   ├── api-config.js         # Configuração centralizada
    │   ├── auth-api.js           # Serviço de autenticação
    │   ├── denuncia-api.js       # Serviço de denúncias
    │   └── denuncias-handler.js  # Handlers para UI
    └── styles/
```

---

## 🐛 Troubleshooting

### Erro: "Connection timeout"
- Verifique se MySQL está rodando
- Confira credenciais em `.env`

### Erro: "Token não fornecido"
- Fazer login primeiro
- Token deve estar em localStorage

### Erro: "CORS blocked"
- Verifique URL do frontend em `.env` (FRONTEND_URL)
- Certifique-se que CORS está habilitado em todos os serviços

### Porta já em uso
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📚 Tecnologias Utilizadas

- **Backend**: Node.js, Express, MySQL, JWT
- **Frontend**: HTML5, CSS3, JavaScript ES6
- **Database**: MySQL 8+
- **Authentication**: JSON Web Token (JWT)

---

## ✨ Próximas Melhorias

- [ ] Adicionar validação com Joi
- [ ] Implementar refresh tokens
- [ ] Adicionar paginação
- [ ] Sistema de notificações
- [ ] Upload de imagens mais robusto
- [ ] Rate limiting
- [ ] Logs estruturados

---

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Logs do terminal de cada serviço
2. Console do navegador (F12)
3. Arquivo `.env` está configurado corretamente
4. Banco de dados está criado
