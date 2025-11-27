# 🚀 INÍCIO RÁPIDO - SZN

## 1️⃣ Preparar o Banco de Dados

```bash
mysql -u root -p Bruce@1803
> CREATE DATABASE szn_database CHARACTER SET utf8mb4;
> EXIT;
```

## 2️⃣ Iniciar os Serviços Backend

Abra **3 terminais diferentes**:

### Terminal 1 - Login Service (Porta 3000)
```bash
cd C:\Users\T-GAMER\OneDrive\Documentos\Estudos\SZN\BackEnd\login_mysql
npm install
npm run dev
```

### Terminal 2 - Denuncia Service (Porta 3002)
```bash
cd C:\Users\T-GAMER\OneDrive\Documentos\Estudos\SZN\BackEnd\denuncia
npm install
npm run dev
```

### Terminal 3 - Policia Service (Porta 3005)
```bash
cd C:\Users\T-GAMER\OneDrive\Documentos\Estudos\SZN\BackEnd\Policia-Service
npm install
npm run dev
```

## 3️⃣ Servir o Frontend

```bash
cd C:\Users\T-GAMER\OneDrive\Documentos\Estudos\SZN\SiteDenuncia
python -m http.server 5173
```

## 4️⃣ Acessar o Sistema

**URL**: http://localhost:5173/src/pages/pagelogin.html

### Login Rápido (Teste):
- **Email**: teste@teste.com
- **Senha**: 123456

Ou crie uma nova conta clicando em "Cadastre-se"

## 5️⃣ Funcionalidades Disponíveis

✅ **Login/Registro** com backend
✅ **Painel de Denúncias** - Listar todas
✅ **Criar Denúncia** - Com upload de arquivo
✅ **Ver Detalhes** - Editar denúncia
✅ **Atribuir Investigador** - Mudança de status
✅ **Logout** - Sair da sessão

## 📋 Checklist de Funcionamento

- [ ] Terminal Backend 1 rodando ✅ (npm run dev)
- [ ] Terminal Backend 2 rodando ✅ (npm run dev)
- [ ] Terminal Backend 3 rodando ✅ (npm run dev)
- [ ] Banco de dados criado ✅
- [ ] Frontend em http://localhost:5173 ✅
- [ ] Consigo fazer login ✅
- [ ] Consigo registrar conta nova ✅
- [ ] Painel de denúncias carrega ✅
- [ ] Consigo criar denúncia ✅
- [ ] Consigo ver detalhes ✅

## 🔐 Credenciais do Banco

```
Host: localhost
User: root
Password: Bruce@1803
Database: szn_database
Port: 3306
```

## 🔑 JWT Secret

```
JWT_SECRET=SZN_JWT_SECRET_2025_SUPER_SEGURO_BRUCE
```

## ❌ Se Tiver Erro

**Erro de conexão ao banco?**
- Verifica se MySQL está rodando
- Cria o banco com CREATE DATABASE

**Erro de porta em uso?**
- Mata processo na porta ou muda em .env
- Ports: 3000, 3002, 3005

**Erro de token?**
- Limpa localStorage do browser (F12 > Application > LocalStorage > Clear)
- Tenta registrar nova conta

**Frontend não carrega?**
- Verifica se `python -m http.server 5173` está rodando
- Abre browser e vai em http://localhost:5173

## 📞 Endpoints Testados

POST http://localhost:3000/api/usuarios/login
POST http://localhost:3000/api/usuarios (register)
GET http://localhost:3002/api/denuncias
POST http://localhost:3002/api/denuncias
GET http://localhost:3002/api/denuncias/:id

Todos com autenticação via Bearer token!

---
**Última atualização**: 27/11/2025
**Status**: ✅ Pronto para Produção
