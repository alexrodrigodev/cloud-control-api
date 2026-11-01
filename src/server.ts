import express from 'express';
import { setupDatabase } from './database';
import { randomUUID } from 'crypto';

const app = express();
app.use(express.json());

const PORT = 3000;

setupDatabase().then((db) => {

    app.post('/servers', async (req, res) => {
        const { name, ip_address } = req.body;
        const id = randomUUID();

        await db.run(
            'INSERT INTO servers (id, name, ip_address, status) VALUES (?, ?, ?, ?)',
            [id, name, ip_address, 'online']
        );

        res.status(201).json({ id, name, ip_address, status: 'online' });
    });

    app.get('/servers', async (req, res) => {
        const servers = await db.all('SELECT * FROM servers ORDER BY last_ping DESC');
        res.json(servers);
    });

    app.post('/servers/:id/ping', async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        await db.run(
            'UPDATE servers SET status = ?, last_ping = CURRENT_TIMESTAMP WHERE id = ?',
            [status, id]
        );

        // INTEGRAÇÃO COM DISCORD
        if (status === 'offline') {
            const webhookUrl = 'https://discord.com/api/webhooks/1566591404505956373/pNp-ARK6L1jE1DEdJyhobsEs7oDfdMWVXG1Fp4cZgScvtuVt8n2Y3mLufdUn6tQLJuzw'; 
            
            // O Node.js usa o 'fetch' para fazer chamadas HTTP a outras APIs
            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: `🚨 **ALERTA CLOUD CONTROL:** O servidor com o ID \`${id}\` reportou uma falha e encontra-se **OFFLINE**!`
                })
            }).catch(erro => console.log("Aviso: Falha ao enviar alerta para o Discord."));
        }

        res.json({ message: `Estado do servidor ${id} atualizado para ${status}` });
    });

    app.listen(PORT, () => {
        console.log(`🚀 API Cloud Control a correr na porta ${PORT}`);
    });

}).catch(console.error);