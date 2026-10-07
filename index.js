import http from 'http';
import express from 'express';
import { EaglerSPRelay } from 'eaglerrelayjs';

const app = express();
const server = http.createServer(app);
const relay = new EaglerSPRelay({ debug: true });

app.use((_req, res) => {
  res.set('Content-Type', 'text/plain');
  res.status(426).end('Upgrade Required');
});

server.on('upgrade', (req, socket, head) => relay.handleUpgrade(req, socket, head));
server.listen(8080);
