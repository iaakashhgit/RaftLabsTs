import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import raftLabsRoutes from './routes/raftLabs'
import authenticateToken from './auth/checkToken'
import authRoutes from './routes/auth-routes'
import WebSocket from 'ws';


const port = 3000;
const app = express();
const MONGODB_URL = process.env.DB_URL;
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(bodyParser.json());
app.use("/auth",authRoutes)
app.use("/Raft-Labs",authenticateToken,raftLabsRoutes);

// WebSocket server
wss.on('connection', function connection(ws) {
  console.log("client connected")  
  ws.on('message', function incoming(data) {
    console.log("incoming data:",data.toString())
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

// Start the server and listen on port 3000
mongoose.connect(MONGODB_URL, { driverInfo: { platform: 'Raft-Labs' }})
  .then(() => {
    server.listen(`${port}`, () => {
      console.log('Server started at  ',port);
     });
  })
  .catch((err) => console.log(err));