# ⚡ QUICK START - SZN

## 🚀 Iniciar em 5 minutos

### Pré-requisitos
- ✅ Node.js 14+
- ✅ MySQL 8+
- ✅ npm ou yarn

### 1️⃣ Banco de Dados

```bash
mysql -u root -p

# No MySQL:
CREATE DATABASE szn_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 2️⃣ Backend - .env

```bash
cd BackEnd
cp .env.example .env

# Edite .env com suas credenciais:
# DB_USER=root
# DB_PASSWORD=sua_senha
# JWT_SECRET=sua_chave_segura
```

### 3️⃣ Instalar e Iniciar

```bash
# Terminal 1
cd BackEnd/login_mysql
npm install
npm run dev

# Terminal 2
cd BackEnd/denuncia
npm install
npm run dev

# Terminal 3
cd BackEnd/Policia-Service
npm install
npm run dev
```

### 4️⃣ Frontend

```bash
# Terminal 4
cd SiteDenuncia
python -m http.server 5173
```

### 5️⃣ Testar

Abra no navegador:
```
http://localhost:5173/src/pages/teste-api.html
```

---

## 📱 Usar Frontend

1. **Login**: `http://localhost:5173/src/pages/pagelogin.html`
   - Email: `teste@teste.com`
   - Senha: `123456`

2. **Painel**: Depois do login, você será redirecionado

3. **Testes**: `http://localhost:5173/src/pages/teste-api.html`

---

## 🐛 Erros Comuns

| Erro | Solução |
|------|---------|
| Connection refused 3000 | Login Service não está rodando |
| Connection refused 3002 | Denuncia Service não está rodando |
| CORS error | Verificar FRONTEND_URL em .env |
| Token not provided | Faça login primeiro |
| Database not found | Criar banco com comando acima |

---

## 📊 Arquitetura

```
SZN System
├── Login Service (3000)
├── Denuncia Service (3002)
├── Polícia Service (3005)
└── Frontend (5173)
    └── MySQL Database
```

---

## 💡 Dicas

- Use `teste-api.html` para testar endpoints
- Verifique logs no terminal de cada serviço
- Logs detalhados com [SERVIÇO] no console
- Use DevTools (F12) para ver requisições

---

Pronto! 🎉 Sistema rodando!
