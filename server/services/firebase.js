import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load Firebase service account JSON
const serviceAccount = require('../cinema-ticket-booking-e841c-firebase-adminsdk-fbsvc-be9a991d76.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'cgv-cinemas-1cbd9.appspot.com',
});

// Cloud storage
const bucket = admin.storage().bucket();

export default bucket
