import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
        projectId: 'messages-app-test-4699f',
        appId: '1:612526889035:web:f2edd23bab678f910655ce',
        storageBucket: 'messages-app-test-4699f.firebasestorage.app',
        apiKey: 'AIzaSyDu7R5CX91qFMa64L3PDYjPduBnUfLTMFA',
        authDomain: 'messages-app-test-4699f.firebaseapp.com',
        messagingSenderId: '612526889035',
        measurementId: 'G-DH6PNK1T38',
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideAnimationsAsync(),
    provideStore()
],
};
