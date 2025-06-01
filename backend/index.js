const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello from backend!');
});

app.post('/sendMessage', (req, res) => {
	console.log('Received message:', req.body);
	res.json({ status: 'success', received: req.body });
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
