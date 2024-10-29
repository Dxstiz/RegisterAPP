const fs = require('fs');
require('dotenv').config(); 

const envConfig = `export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "${process.env.FIREBASE_API_KEY}",
    authDomain: "${process.env.AUTH_DOMAIN}",
    projectId: "${process.env.PROJECT_ID}",
    storageBucket: "${process.env.STORAGE_BUCKET}",
    messagingSenderId: "${process.env.MESSAGING_SENDER_ID}",
    appId: "${process.env.APP_ID}"
  }
};`;

fs.writeFileSync('./src/environments/environment.ts', envConfig);
console.log('Environment configuration file generated successfully.');