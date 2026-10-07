import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { existsSync } from 'node:fs';
import path from 'node:path';
import userRouter from './UserRoutes';
import dns from 'node:dns';
import { loadEnvFile } from 'node:process';

const envPath = path.join(__dirname, '../.env');
if (existsSync(envPath)) {
  loadEnvFile(envPath);
}
dns.setServers(['1.1.1.1', '8.8.8.8']);


export const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Hello, World!');
});
app.use(express.static(path.join(__dirname, '../public')));

app.use("/api", userRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Only connect and listen when run directly, not when imported by tests
// if (require.main === module) {
//   mongoose.connect("mongodb+srv://sthananarin_db_user:MC3sE1LJQ1PKdshy@cluster-cloud-deploy.clgpt1j.mongodb.net")
//     .then(() => {
//       console.log("Connected to MongoDB");
//       app.listen(3000, () => {
//         console.log("Server is running on http://localhost:3000");
//       });
//     })
//     .catch((error) => {
//       console.error("Error connecting to MongoDB:", error);
//     });
// }

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
