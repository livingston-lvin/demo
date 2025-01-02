import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { GstService } from '../../../../../services/gst.service';

import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { MatDateFormats } from '@angular/material/core';

const moment = _rollupMoment || _moment;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    dateA11yLabel: 'L',
    monthYearLabel: 'MMM YYYY',
    monthYearA11yLabel: 'DD MM YYYY',
  },
};

@Component({
  selector: 'app-edit-gst-rate-master',
  templateUrl: './edit-gst-rate-master.component.html',
  styleUrl: './edit-gst-rate-master.component.scss',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditGstRateMasterComponent implements OnInit {
  form: FormGroup;
  id: number;
  constructor(
    private fb: FormBuilder,
    private gstService: GstService,
    private router: Router,
    private route: ActivatedRoute
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
          this.navigateToListGstPage();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('Please fill all mandetory fields...');
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
