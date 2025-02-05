import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  catchError,
  delay,
  filter,
  map,
  merge,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
  collectionData,
  getDoc,
} from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { CreateMessageState, IMessage } from '../interfaces/message.interface';

const initialState: CreateMessageState = {
  messages: [],
  loading: false,
  error: null,
  success: null,
};

@Injectable()
export class CreateMessageStore extends ComponentStore<CreateMessageState> {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  // Selectors
  readonly messages$ = this.select((state) => state.messages);
  readonly loading$ = this.select((state) => state.loading);
  readonly error$ = this.select((state) => state.error);
  readonly success$ = this.select((state) => state.success);

  // Updaters
  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));
  readonly setError = this.updater((state, error: string | null) => ({
    ...state,
    success: false,
    error,
  }));
  readonly setSuccess = this.updater((state, error: string | null) => ({
    ...state,
    success: false,
    error,
  }));
  readonly setMessage = this.updater((state, message: IMessage) => ({
    ...state,
    success: true,
    messages: [...state.messages, message],
  }));
  readonly setMessages = this.updater((state, messages: IMessage[]) => ({
    ...state,
    success: true,
    messages: messages,
  }));

  readonly createMessage = this.effect(
    (params$: Observable<Pick<IMessage, 'message' | 'name'>>) => {
      return params$.pipe(
        tap(() => this.setLoading(true)),
        switchMap((params) => {
          return addDoc(collection(this.db, 'messages'), {
            message: params?.message,
            name: params.name,
            date: serverTimestamp(),
          })
            .then(async (docRef) => {
              const docSnap = await getDoc(docRef);
              this.setMessage({
                name: params.name,
                message: params.message,
                id: docSnap.id,
                createdAt: docSnap.data()?.['date'] as string,
              });
              this.setLoading(false);
              this.setSuccess('message added successfully');
            })
            .catch((error) => {
              this.setError(error.error.message);
              this.setLoading(false);
              this.setError(null);
              return [];
            });
        })
      );
    }
  );

  readonly getMessages = this.effect(() => {
    this.setLoading(true);
    return collectionData(collection(this.db, 'messages'), {
      idField: 'id',
    }).pipe(
      map((messages) => {
        this.setLoading(false);
        this.setMessages(messages as IMessage[]);
      }),
      catchError((error) => {
        this.setLoading(false);
        return of(this.setError(error));
      })
    );
  });

  readonly resetSuccessFailureStatus = this.effect(() => {
    return merge(this.success$, this.error$).pipe(
      filter((status) => status !== null),
      delay(3000),
      tap(() => {
        this.setSuccess(null);
        this.setError(null);
      })
    );
  });
  constructor() {
    super(initialState);
    this.resetSuccessFailureStatus();
  }
}
