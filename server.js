const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000; // Здесь можно указать порт вашего сервера

// Middleware для обработки CORS запросов и установки заголовков
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Здесь можно указать домен вашего фронтенда или * для разрешения доступа с любых доменов
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Обработчик маршрута для перенаправления запросов к Google API
app.get('/google-api', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Не указан URL Google API' });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Ошибка при запросе к Google API:', error);
    res.status(500).json({ error: 'Ошибка при запросе к Google API' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
