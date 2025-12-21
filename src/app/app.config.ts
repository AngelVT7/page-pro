import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyAEqsTcEmOcMgTpgCJirvzM_rySMexaf88",
  authDomain: "alutec-web.firebaseapp.com",
  projectId: "alutec-web",
  storageBucket: "alutec-web.firebasestorage.app",
  messagingSenderId: "301084567168",
  appId: "1:301084567168:web:f74c23079f02e63f0c2865",
  measurementId: "G-JCP0XK2SSX"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    // 🔥 FIREBASE GLOBAL
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
