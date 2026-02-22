import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleWare/logger.js';
import { errorHadler } from './middleWare/errorHandler.js';
import { notFoundHandler } from './middleWare/notFoundHandler.js';
import router from './routes/router.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  })
);
app.use(cors());

app.use(router);

app.use(notFoundHandler);

app.use(errorHadler);

await connectMongoDB();

app.listen(PORT, error => {
  if (error) throw error;
  console.log(`Server is running on port ${PORT}`);
});
