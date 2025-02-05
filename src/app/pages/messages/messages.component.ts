import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialog,
} from '@angular/material/dialog';
import { MessagesFormComponent } from '../../components/messages-form/messages-form.component';
import { CreateMessageStore } from '../../component-store/messages-component.store';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  standalone: false,
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
})
export class MessagesComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private messagesStore = inject(CreateMessageStore);

  messages$ = this.messagesStore.messages$;
  isLoading$ = this.messagesStore.loading$;

  ngOnInit(): void {
    this.messagesStore.getMessages();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(MessagesFormComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef
      .afterClosed()
      .subscribe((result) => (result ? this.messagesStore.getMessages() : ''));
  }
}
