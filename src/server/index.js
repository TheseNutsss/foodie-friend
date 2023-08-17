const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/google-api/:url', async (req, res) => {
  try {
    const { url } = req.params;
    const { query } = req;
    
    const response = await axios.get(decodeURIComponent(url))
      

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response ? error.response.status : 500).json(error.message);
  }
});

app.get('/google-api', (req, res) => {
  res.status(200).json("Сервер работает")
})

app.listen(8080, () => {
  console.log('Server is running on port 3000');
});
