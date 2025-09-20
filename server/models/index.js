import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

const __dirname = path.resolve();
const basename = path.basename(import.meta.url);
const db = {};

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:@localhost:5432/cgv-cinemas',
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false,
      useUTC: false,
    },
    timezone: '+07:00',
    logging: false, // set true if you want SQL logs
  }
);

// Import all models dynamically
const modelsDir = path.resolve('./models');
const files = fs.readdirSync(modelsDir).filter(
  (file) => file !== basename && file.slice(-3) === '.js'
);

for (const file of files) {
  const modelPath = path.join(modelsDir, file);
  const { default: modelFunc } = await import(`file://${modelPath}`);
  const model = modelFunc(sequelize, DataTypes);
  db[model.name] = model;
}

// Run associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
