import { Component, Input } from '@angular/core';
import { IMessage } from '../../interfaces/message.interface';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { DatePipe, SlicePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; // Optional, if you need buttons in the table
import { MatIconModule } from '@angular/material/icon'; // Optional, if you want to use icons

@Component({
  selector: 'app-messages-list',
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    SlicePipe,
    DatePipe,
  ],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.scss',
})
export class MessagesListComponent {
  @Input() messages!: Array<IMessage> | null;
  displayedColumns: string[] = ['id', 'name', 'message', 'date'];
}
