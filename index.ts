import express from 'express';
import WSServer from 'express-ws';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import { handleMessage } from './controllers/handleMessage';
import { AWSS } from './types';

const { app, getWss } = WSServer(express());

const { PORT = 5000 } = process.env;

const aWss = getWss() as AWSS;

app.use(cors());
app.use(express.json());

app.ws('/', (ws, _req) => {
  console.log(`CONNECTION ESTABLISHED`);

  ws.on('message', (msg: string) => handleMessage(ws, msg, aWss));
});

app.post('/image', (req, res) => {
  try {
    const data = (req.body.img as string).replace('data:image/png;base64,', '');
    fs.writeFileSync(
      path.resolve(__dirname, 'files', `${req.query.id}.jpg`),
      data,
      'base64'
    );
    return res.status(201).json({ message: 'loaded' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/image', (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, 'files', `${req.query.id}.jpg`)
    );
    const data = 'data:image/png;base64,' + file.toString('base64');
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`App started on port = ${PORT}`));
