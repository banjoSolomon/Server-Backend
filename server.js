// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;
const dockerHost = process.env.DOCKER_HOST_URL || 'http://172.16.0.151:2375';

app.use(cors());

app.get('/containers', async (req, res) => {
    try {
        const response = await axios.get(`${dockerHost}/containers/json`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching container data', detail: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
