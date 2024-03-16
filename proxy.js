// proxy.js

import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per consentire le richieste CORS da tutti gli origini
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

// Configura il middleware per consentire richieste JSON
app.use(express.json());

// Gestisce le richieste inoltrando al server remoto e restituendo la risposta al client
app.post('/api/departures/busstops', async (req, res) => {
	try {
		const response = await axios.post(
			'https://poseidon2api.idsjmk.cz/api/departures/busstops',
			req.body
		);
		res.json(response.data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Errore durante la richiesta API' });
	}
});

// Avvia il server
app.listen(PORT, () => {
	console.log(`Server proxy in esecuzione sulla porta ${PORT}`);
});
