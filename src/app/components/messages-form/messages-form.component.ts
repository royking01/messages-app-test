import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CreateMessageStore } from '../../component-store/messages-component.store';
import { takeWhile } from 'rxjs';
import { IMessage } from '../../interfaces/message.interface';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-messages-form',
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './messages-form.component.html',
  styleUrl: './messages-form.component.scss',
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    CreateMessageStore,
  ],
})
export class MessagesFormComponent {
  readonly dialogRef = inject(MatDialogRef<MessagesFormComponent>);
  private formBuilder = inject(FormBuilder);
  private messagesStore = inject(CreateMessageStore);

  isOpened = signal(true);

  isLoading$ = this.messagesStore.loading$;

  messageForm = this.formBuilder.group({
    name: ['', Validators.required],
    message: ['', Validators.required],
  });

  async submit() {
    if (this.messageForm.valid) {
      this.messagesStore.createMessage(this.messageForm.value as IMessage);

      this.messagesStore.success$
        .pipe(takeWhile(() => this.isOpened()))
        .subscribe((isMessageSentSuccessfully) => {
          if (isMessageSentSuccessfully) {
            this.dialogRef.close({
              message: this.messageForm.value,
            });
          }
        });
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
