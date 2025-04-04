import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoaderService } from '../../../../services/loader.service';
import { ProductDetailUpdateService } from '../../../../services/product-detail-update.service';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bulk-dispatch-details',
  imports: [NgFor,NgIf,MatButtonModule],
  templateUrl: './bulk-dispatch-details.component.html',
  styleUrl: './bulk-dispatch-details.component.scss'
})
export class BulkDispatchDetailsComponent implements OnDestroy {
  file!: File;
  empDataSource: any[] = [];
  private subject$ = new Subject<void>();

  constructor(
    private service: ProductDetailUpdateService,
    private loader: LoaderService
  ) {}

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  fileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  uploadFile() {
    if (this.file) {
      this.loader.showLoader(true);
      const formData: FormData = new FormData();
      formData.append('file', this.file);
      this.service
        .getEmployeeHeaders(formData)
        .pipe(takeUntil(this.subject$))
        .subscribe({
          next: (res: any) => {
            this.empDataSource = res;
            this.loader.showLoader(false);
          },
          error: (err: any) => {
            console.log(err);
            this.loader.showLoader(false);
          },
        });
    }
  }

  optionSelected(event: any, index: number) {
    const options: any[] = event.target.options;
    const newMappings: any[] = [];
    for (let i = 0; i < options.length; i++) {
      const option: any = options[i];
      const selected = option.selected;
      const value = option.value;
      newMappings.push({ colName: value, selected: selected });
    }
    this.empDataSource[index].mappings = newMappings;
  }

  employeeInsert() {
    this.loader.showLoader(true);
    const formData: FormData = new FormData();
    formData.append('file', this.file);
    formData.append('data', JSON.stringify(this.empDataSource));
    this.service.insertEmployee(formData).subscribe(
      (res: any) => {
        alert('Employee Update Success');
        this.loader.showLoader(false);
      },
      (err) => {
        console.log(err);
        alert('Employee Update Failed');
        this.loader.showLoader(false);
      }
    );
  }
}

