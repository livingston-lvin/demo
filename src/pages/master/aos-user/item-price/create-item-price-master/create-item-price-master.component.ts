import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { ItemPriceService } from '../../../../../services/item-price.service';
import { ItemService } from '../../../../../services/item.service';

@Component({
  selector: 'app-create-item-price-master',
  templateUrl: './create-item-price-master.component.html',
  styleUrl: './create-item-price-master.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
})
export class CreateItemPriceMasterComponent implements OnInit {
  form: FormGroup;
  items:any[]=[];
  constructor(
    private fb: FormBuilder,
    private itemPriceService: ItemPriceService,
    private router: Router,
    private itemService: ItemService
  ) {
    this.form = this.fb.group({
      itemId: [null, Validators.required],
      amountIncGst: [null, Validators.required],
      itemGstRate: [null, Validators.required],
      priceApplicableFrom: [null, Validators.required],
      itemPrice: [null, Validators.required],
      itemHsnCode: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.itemService.getAll().subscribe(
      (res) => {
        this.items=res
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit() {
    console.log(this.form.value,this.form.valid);
    
    if (this.form.valid) {
      const value = this.form.value;
      this.itemPriceService.create(value).subscribe(
        (res) => {
          this.navigateToListItemPricePage();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please fill all mandetory fields...');
    }
  }

  navigateToListItemPricePage() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.itemPrice,
      environment.list,
    ]);
  }

  validateNumberInput(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Delete',
    ];

    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
