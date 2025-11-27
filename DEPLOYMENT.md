# 🌍 Deployment Guide - SZN

## 📦 Preparação para Produção

### 1. Variáveis de Ambiente

```bash
# .env PRODUÇÃO
DB_HOST=seu_servidor_mysql.com
DB_USER=usuario_produção
DB_PASSWORD=senha_super_forte_aqui
DB_NAME=szn_prod
JWT_SECRET=chave_ultra_secreta_de_64_caracteres_aqui

NODE_ENV=production
FRONTEND_URL=https://seu_dominio.com
```

### 2. Build & Instalação

```bash
# Instalar apenas dependências de produção
npm install --production

# Ou instalar e remover devDependencies
npm install
npm prune --production
```

### 3. Banco de Dados

```bash
# SSH para servidor
ssh usuario@seu_servidor.com

# Criar banco de dados
mysql -u root -p

CREATE DATABASE szn_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON szn_prod.* TO 'szn_user'@'localhost' IDENTIFIED BY 'senha_forte';
FLUSH PRIVILEGES;
EXIT;
```

### 4. PM2 - Process Manager

```bash
# Instalar globalmente
npm install -g pm2

# Criar arquivo ecosystem.config.js
```

ecosystem.config.js:
```javascript
module.exports = {
  apps: [
    {
      name: 'login-service',
      script: './server.js',
      cwd: './BackEnd/login_mysql',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'denuncia-service',
      script: './server.js',
      cwd: './BackEnd/denuncia',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      }
    },
    {
      name: 'policia-service',
      script: './server.js',
      cwd: './BackEnd/Policia-Service',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3005
      }
    }
  ]
};
```

### 5. Iniciar com PM2

```bash
# Iniciar todos os serviços
pm2 start ecosystem.config.js

# Ver status
pm2 status

# Ver logs
pm2 logs

# Restart automático
pm2 startup
pm2 save
```

---

## 🌐 Nginx Reverse Proxy

### Instalação

```bash
sudo apt update
sudo apt install nginx
```

### Configuração /etc/nginx/sites-available/szn

```nginx
upstream login_backend {
    server 127.0.0.1:3000;
}

upstream denuncia_backend {
    server 127.0.0.1:3002;
}

upstream policia_backend {
    server 127.0.0.1:3005;
}

server {
    listen 80;
    server_name seu_dominio.com www.seu_dominio.com;

    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu_dominio.com www.seu_dominio.com;

    # SSL
    ssl_certificate /etc/letsencrypt/live/seu_dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu_dominio.com/privkey.pem;

    # Frontend
    location / {
        root /var/www/szn/SiteDenuncia;
        try_files $uri $uri/ /src/pages/pagelogin.html;
    }

    # Login Service
    location /api/usuarios {
        proxy_pass http://login_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Denuncia Service
    location /api/denuncias {
        proxy_pass http://denuncia_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Polícia Service
    location /api/policia {
        proxy_pass http://policia_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads
    location /uploads/ {
        alias /var/www/szn/BackEnd/uploads/;
        expires 30d;
    }
}
```

### Ativar Configuração

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/szn /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 🔒 SSL/HTTPS com Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot certonly --nginx -d seu_dominio.com -d www.seu_dominio.com

# Auto-renew
sudo systemctl enable certbot.timer
```

---

## 📊 Monitoramento

### Verificar Status dos Serviços

```bash
# Ver todos os processos PM2
pm2 status

# Ver métricas
pm2 monit

# Exportar logs
pm2 logs > szn-logs.txt
```

### Alertas

```bash
# Conectar PM2+ (monitoramento em cloud)
pm2 connect

# Ou usar ferramentas locais
# - New Relic
# - DataDog
# - Prometheus + Grafana
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions (exemplo)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/szn
            git pull origin main
            npm install --production
            pm2 restart ecosystem.config.js
```

---

## 📈 Performance

### Otimizações

1. **Compressão Gzip**
```nginx
gzip on;
gzip_types text/plain application/json;
gzip_min_length 1000;
```

2. **Cache**
```nginx
expires 1d;
add_header Cache-Control "public";
```

3. **Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

---

## 🚨 Backup & Disaster Recovery

### Backup Banco de Dados

```bash
# Diário
0 2 * * * mysqldump -u szn_user -p szn_prod > /backups/szn_$(date +%Y%m%d).sql
```

### Restore

```bash
mysql -u szn_user -p szn_prod < /backups/szn_backup.sql
```

---

## ✅ Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados criado e testado
- [ ] SSL/HTTPS configurado
- [ ] Nginx rodando e testado
- [ ] PM2 iniciado e monitorado
- [ ] Backups configurados
- [ ] Logs habilitados
- [ ] Monitoramento ativo
- [ ] DNS apontando para servidor
- [ ] Testes E2E passando
- [ ] Performance aceitável
- [ ] Alertas configurados

---

## 📞 Troubleshooting

### Porta já em uso
```bash
lsof -i :3000
kill -9 <PID>
```

### Nginx não responde
```bash
sudo systemctl status nginx
sudo journalctl -u nginx -n 50
```

### PM2 travado
```bash
pm2 kill
pm2 start ecosystem.config.js
```

### Sem conexão com banco
```bash
mysql -h HOST -u USER -p
```

---

**Última atualização:** 27/11/2025
