const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage'); 


export const serviceAccount = './learned-484621-firebase-adminsdk-fbsvc-bb95384543.json';

export const app = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gs://learned-484621.firebasestorage.app'
});

export const bucket = getStorage().bucket();