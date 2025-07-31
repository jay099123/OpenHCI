import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // Use the env variable directly
};

console.log('🔧 Firebase Configuration:', {
  ...clientCredentials,
  apiKey: clientCredentials.apiKey ? `${clientCredentials.apiKey.substring(0, 10)}...` : 'Missing',
  databaseURL: clientCredentials.databaseURL || 'Missing'
});

const app = initializeApp(clientCredentials);
const database = getDatabase(app);
const storage = getStorage(app);

console.log('✅ Firebase initialized');
console.log('📊 Database instance:', database);

export {
  app,
  database,
  storage,
};