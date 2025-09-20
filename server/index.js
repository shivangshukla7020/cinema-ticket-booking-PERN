import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Model
import models from './models/index.js';
// Route
import routes from './routes/index.js';

const app = express();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: { title: 'CGV Cinemas API', version: '1.0.0' },
    servers: [{ url: 'http://127.0.0.1:5000', description: 'Development server' }],
    components: {
      securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // your routes folder
};

const swaggerSpecs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(
  cors({
    origin: [
      'http://localhost:3000',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.enable('trust proxy');
app.use(
  session({
    secret: 'street',
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.static('public'));
app.use('/api', routes);

app.get('/', (req, res) => {
  res.status(200).json({ information: 'CGV Cinemas API v1.0.0' });
});

// ✅ Correct 404 middleware for Express 5+
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.status(401).json({ error: 'Unauthorized', message: err.message });
  if (err.status && err.name) return res.status(err.status).json({ message: err.message });
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  try {
    await models.sequelize.sync();
    console.log('Database connected!');
    console.log(`🚀 Server running at http://${hostname}:${port}`);
  } catch (error) {
    console.log('Failed to start server!', error);
  }
});
