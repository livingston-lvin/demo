import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.development';
import { GstService } from '../../../../../services/gst.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
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
  selector: 'app-create-gst-rate-master',
  templateUrl: './create-gst-rate-master.component.html',
  styleUrl: './create-gst-rate-master.component.scss',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGstRateMasterComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private gstService: GstService,
    private router: Router
  ) {
    this.form = this.fb.group({
      rate: [null, Validators.required],
      applicableDt: [null, Validators.required],
    });
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
