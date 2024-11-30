import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  // Connect to MongoDB
  await connectDB();

  // Middleware
  app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
  }));
  app.use(cookieParser());
  app.use(express.json());

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api', apiRoutes);

  // Vite integration for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        
        // Always serve index.html for client-side routing
        let template = await vite.transformIndexHtml(url, 
          await vite.ssrLoadModule('/index.html')
        );
        
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    // Serve static files in production
    app.use(express.static(join(__dirname, '../../../dist')));
    app.get('*', (req, res) => {
      res.sendFile(join(__dirname, '../../../dist/index.html'));
    });
  }

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Frontend: ${process.env.APP_URL}`);
  });
}

createServer().catch(console.error);