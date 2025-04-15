import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DispatchDetailsService } from '../../services/dispatch-details.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ChatComponent implements OnInit {
  ticketStatus: any = {};
  chats: any[] = [];
  newMessage: string | undefined;
  dialogRef = inject(MatDialogRef<ChatComponent>);
  data = inject(MAT_DIALOG_DATA);
  service = inject(DispatchDetailsService);

  ngOnInit(): void {
    this.ticketStatus = this.data.data.ticket;
    this.chats = this.data.data.chats;
  }

  sendMessage() {
    if (this.newMessage?.trim()) {
      this.service
        .send({
          orderId: this.data.data.orderId,
          message: this.newMessage,
        })
        .subscribe(
          (res) => {
            console.log(res);
            this.chats.push({
              isStore: res.isStore,
              empId: res.empId,
              saveDate: res.saveDate,
              message: res.message,
            });
            this.newMessage = undefined;
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
