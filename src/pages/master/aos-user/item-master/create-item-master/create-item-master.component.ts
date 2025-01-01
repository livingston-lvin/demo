import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-item-master',
  templateUrl: './create-item-master.component.html',
  styleUrl: './create-item-master.component.scss',
  imports: [MatFormFieldModule, MatButtonModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class CreateItemMasterComponent { 
  constructor(){}
}
