# 📡 API Reference - SZN

## Base URLs

```
Login:    http://localhost:3000/api
Denúncia: http://localhost:3002/api
Polícia:  http://localhost:3005/api
```

---

## 🔐 Autenticação

### Login
```
POST /usuarios/login
Content-Type: application/json

{
  "email": "teste@teste.com",
  "senha": "123456"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "teste@teste.com"
  }
}
```

### Header com Token
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 👤 Users (Login Service: 3000)

### Registrar Usuário
```
POST /usuarios
{
  "nome": "João",
  "email": "joao@email.com",
  "senha": "senha123"
}
```

### Listar Usuários
```
GET /usuarios
```

### Buscar Usuário
```
GET /usuarios/1
```

### Atualizar Usuário
```
PUT /usuarios/1
{
  "nome": "João Silva",
  "email": "joao@email.com"
}
```

### Deletar Usuário
```
DELETE /usuarios/1
```

---

## 📋 Denúncias (Denuncia Service: 3002)

### Listar Denúncias
```
GET /denuncias
Header: Authorization: Bearer TOKEN

Response:
{
  "total": 5,
  "denuncias": [
    {
      "id": 1,
      "titulo": "Problema no bairro",
      "descricao": "Descrição...",
      "usuario_id": 1,
      "status": "pendente",
      "midia": "uploads/foto.jpg",
      "created_at": "2025-11-27T10:30:00"
    }
  ]
}
```

### Buscar Denúncia
```
GET /denuncias/1
Header: Authorization: Bearer TOKEN

Response:
{
  "id": 1,
  "titulo": "Problema no bairro",
  "descricao": "Descrição completa...",
  "usuario_id": 1,
  "status": "pendente",
  "midia": "uploads/foto.jpg",
  "created_at": "2025-11-27T10:30:00"
}
```

### Criar Denúncia
```
POST /denuncias
Header: Authorization: Bearer TOKEN
Content-Type: multipart/form-data

Body:
- titulo: string (obrigatório)
- descricao: string (obrigatório)
- midia: file (opcional)

Response:
{
  "mensagem": "Denúncia criada com sucesso",
  "denuncia": {
    "id": 6,
    "titulo": "Nova denúncia",
    "descricao": "Descrição...",
    "usuario_id": 1,
    "status": "pendente"
  }
}
```

---

## 🚔 Polícia (Polícia Service: 3005)

### Listar Denúncias (Apenas Policiais)
```
GET /policia/denuncias
Header: Authorization: Bearer TOKEN_POLICIA

Response:
{
  "total": 5,
  "denuncias": [...]
}

Requisitos:
- Token JWT válido
- Campo "role": "policia" no token
```

### Buscar Denúncia (Apenas Policiais)
```
GET /policia/denuncias/1
Header: Authorization: Bearer TOKEN_POLICIA

Response:
{
  "id": 1,
  "titulo": "...",
  "descricao": "...",
  "usuario_id": 1,
  "status": "pendente",
  "midia": "uploads/foto.jpg"
}

Requisitos:
- Token JWT válido
- Campo "role": "policia" no token
```

---

## ⚠️ Códigos de Erro

| Código | Significado | Solução |
|--------|-------------|---------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado |
| 400 | Bad Request | Dados inválidos |
| 401 | Unauthorized | Token faltando/inválido |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Recurso não existe |
| 500 | Server Error | Erro no servidor |

---

## 📝 Exemplos com cURL

### Login
```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@teste.com",
    "senha": "123456"
  }'
```

### Listar Denúncias
```bash
curl -X GET http://localhost:3002/api/denuncias \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Criar Denúncia
```bash
curl -X POST http://localhost:3002/api/denuncias \
  -H "Authorization: Bearer SEU_TOKEN" \
  -F "titulo=Problema de rua" \
  -F "descricao=Descrição detalhada" \
  -F "midia=@/caminho/foto.jpg"
```

### Buscar Denúncia
```bash
curl -X GET http://localhost:3002/api/denuncias/1 \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 🔄 Fluxo Recomendado

1. **Login** → GET TOKEN
2. **Usar TOKEN** em todas requisições posteriores
3. **Criar Denúncia** com TOKEN
4. **Listar Denúncias** com TOKEN
5. **Logout** → Remover TOKEN do localStorage

---

## 📚 Campos do Modelo

### Usuário
```javascript
{
  id: Integer (auto),
  nome: String(100),
  email: String(100) UNIQUE,
  senha: String(255),
  created_at: DateTime,
  updated_at: DateTime
}
```

### Denúncia
```javascript
{
  id: Integer (auto),
  usuario_id: Integer,
  titulo: String(255),
  descricao: Text,
  midia: String(500),
  status: ENUM('pendente', 'investigando', 'concluida'),
  created_at: DateTime,
  updated_at: DateTime
}
```

---

## 🚫 Erros Comuns

### "Token not provided"
```
❌ Falta Authorization header
✅ Solução: curl -H "Authorization: Bearer TOKEN"
```

### "Invalid token"
```
❌ Token expirado ou malformado
✅ Solução: Faça login novamente
```

### "CORS error"
```
❌ Frontend e API em portas diferentes
✅ Solução: Verificar .env FRONTEND_URL
```

### "Email already registered"
```
❌ Email já existe no banco
✅ Solução: Use outro email ou faça login
```

---

## 💾 Rate Limiting (Futuro)

Será implementado: máx 100 requisições por minuto por IP

---

**Última atualização:** 27/11/2025
