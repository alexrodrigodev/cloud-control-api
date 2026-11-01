# ☁️ Cloud Control API

Uma API REST desenvolvida para monitorização de infraestrutura B2B. O sistema permite registar servidores, acompanhar o estado de saúde (pings) e disparar alertas automáticos em tempo real (via Webhook) sempre que uma falha de sistema é detetada.

Este projeto foi desenvolvido com foco em arquitetura limpa, tipagem estática e integração contínua, simulando um ambiente real de operações de Cloud.

## 🚀 Tecnologias Utilizadas
- **Core:** Node.js e TypeScript
- **Framework Web:** Express.js
- **Base de Dados:** SQLite (leve e transacional)
- **Integração:** Webhooks (Discord API)
- **Infraestrutura:** Docker

## ⚙️ Como executar o projeto

### Opção 1: Rodar localmente (Node.js)
1. Instale as dependências: `npm install`
2. Inicie o servidor: `npm run dev`
3. A API estará disponível em: `http://localhost:3000`

### Opção 2: Rodar via Docker
1. Construa a imagem: `docker build -t cloud-control-api .`
2. Execute o contentor: `docker run -p 3000:3000 cloud-control-api`

## 📡 Endpoints Principais
- `POST /servers` - Regista um novo servidor no ambiente.
- `GET /servers` - Lista todos os servidores monitorizados e os seus estados.
- `POST /servers/:id/ping` - Recebe o pulso de saúde do servidor. Se o status recebido for "offline", a API dispara automaticamente um alerta via Webhook para a equipa de operações.