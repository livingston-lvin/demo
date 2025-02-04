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
import { GstService } from '../../../../../services/gst.service';
import { SnackbarService } from '../../../../../services/snackbar.service';
import { Success } from '../../../../../constants/AppData';
@Component({
  selector: 'app-edit-gst-rate-master',
  templateUrl: './edit-gst-rate-master.component.html',
  styleUrl: './edit-gst-rate-master.component.scss',
  imports: [FormsModule, ReactiveFormsModule],
})
export class EditGstRateMasterComponent implements OnInit {
  form: FormGroup;
  id: number;
  constructor(
    private fb: FormBuilder,
    private gstService: GstService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackbarService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      id: [null, Validators.required],
      rate: [null, Validators.required],
      applicableDt: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.gstService.getGst(this.id).subscribe(
      (res) => {
        this.form.patchValue({
          id: res.id,
          rate: res.rate,
          applicableDt: res.applicableDt,
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
      this.gstService.create(value).subscribe(
        (res) => {
          this.snackBarService.openSnackBar({
            msg: 'Gst Rate updated successfully!',
            type: Success,
          });
          this.navigateToListGstPage();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  navigateToListGstPage() {
    this.router.navigate([
      environment.servletPath,
      environment.master,
      environment.aosUser,
      environment.gstMaster,
      environment.list,
    ]);
  }
}
