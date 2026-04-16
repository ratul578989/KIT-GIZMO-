import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

const app = firebaseConfig && firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app, firebaseConfig?.firestoreDatabaseId || '(default)') : null;
export const storage = app && firebaseConfig?.storageBucket ? getStorage(app) : null;

export const isFirebaseReady = !!app;
export const isStorageReady = !!storage;
