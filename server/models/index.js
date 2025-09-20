import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes } from 'sequelize';

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:Shiv@ng123@localhost:5432/postgres',
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production'
        ? { require: true, rejectUnauthorized: false }
        : false,
      useUTC: false,
    },
    timezone: '+07:00',
    logging: false, // set true if you want SQL logs
  }
);

// Directory containing all model files
const modelsDir = __dirname;

// Read all JS files in the models folder (excluding this index.js)
const modelFiles = fs.readdirSync(modelsDir).filter(
  (file) => file !== path.basename(__filename) && file.endsWith('.js')
);

// Dynamically import all models
for (const file of modelFiles) {
  const modelPath = path.join(modelsDir, file);
  const { default: modelFunc } = await import(`file://${modelPath}`);
  const model = modelFunc(sequelize, DataTypes);
  db[model.name] = model;
}

// Run associations if defined in models
for (const modelName of Object.keys(db)) {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
}

// Export Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
