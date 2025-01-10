import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { ItemPriceService } from '../../../../../services/item-price.service';
import { ItemService } from '../../../../../services/item.service';

@Component({
  selector: 'app-edit-item-price-master',
  templateUrl: './edit-item-price-master.component.html',
  styleUrl: './edit-item-price-master.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
})
export class EditItemPriceMasterComponent implements OnInit {
  id: number;
  form: FormGroup;
  items: any[] = [];
  constructor(
    private fb: FormBuilder,
    private itemPriceService: ItemPriceService,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      item: [null, Validators.required],
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
        this.items = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.itemPriceService.get(this.id).subscribe(
      (res) => {
        const item = this.items.filter((item) => item.id === res.item.id)[0];
        this.form.patchValue({
          item: item.id,
          amountIncGst: res.amountIncGst,
          itemGstRate: res.itemGstRate,
          priceApplicableFrom: res.priceApplicableFrom,
          itemPrice: res.itemPrice,
          itemHsnCode: res.itemHsnCode,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submit() {
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
