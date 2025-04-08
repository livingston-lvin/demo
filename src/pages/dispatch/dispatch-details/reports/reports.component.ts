import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ReportsService } from '../../../../services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
  ],
})
export class ReportsComponent implements OnInit {
  type = signal(null);
  from: string | undefined;
  to: string | undefined;
  itemId: number | undefined;
  lob!: string;
  loc!: string;
  cc!: string;
  grade!: string;
  city!: string;
  state!: string;
  department!: string;
  lobs: any[] = [];
  locs: any[] = [];
  ccs: any[] = [];
  grades: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  departments: any[] = [];
  selectedLobs = signal<string[]>([]);
  selectedLocs = signal<string[]>([]);
  selectedCcs = signal<string[]>([]);
  selectedGrades = signal<string[]>([]);
  selectedCities = signal<string[]>([]);
  selectedStates = signal<string[]>([]);
  selectedDepartments = signal<string[]>([]);
  items: any[] = [];
  customers: any[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('lobInput') lobInput!: ElementRef<HTMLInputElement>;
  @ViewChild('locInput') locInput!: ElementRef<HTMLInputElement>;
  @ViewChild('ccInput') ccInput!: ElementRef<HTMLInputElement>;
  @ViewChild('gradeInput') gradeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cityInput') cityInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stateInput') stateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('departmentInput') departmentInput!: ElementRef<HTMLInputElement>;

  constructor(private reportsService: ReportsService) {}

  reset() {
    this.selectedLobs.update((_) => []);
    this.selectedLocs.update((_) => []);
    this.selectedCcs.update((_) => []);
    this.selectedGrades.update((_) => []);
    this.selectedCities.update((_) => []);
    this.selectedStates.update((_) => []);
    this.selectedDepartments.update((_) => []);
    this.itemId = undefined;
    this.from = undefined;
    this.to = undefined;
    this.type.set(null)
  }

  ngOnInit(): void {
    // this.loadData();
  }

  loadData() {
    this.reportsService.getData().subscribe(
      (res) => {
        this.lobs = res.lobs;
        this.locs = res.locs;
        this.ccs = res.ccs;
        this.grades = res.grades;
        this.cities = res.cities;
        this.states = res.states;
        this.departments = res.departments;
        res.items.forEach((item: any) => this.items.push(item));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  download() {
    const payload = {
      type: this.type(),
      from: this.from,
      to: this.to,
      itemId: this.itemId,
      lobs: this.selectedLobs(),
      locs: this.selectedLocs(),
      ccs: this.selectedCcs(),
      grades: this.selectedGrades(),
      cities: this.selectedCities(),
      states: this.selectedStates(),
      departments: this.selectedDepartments(),
    };
    this.reportsService.getReport(payload).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.type()}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  change(event: any, type: string) {
    const value = event.target.value;
    if (value) {
      switch (type) {
        case 'lob': {
          if (this.lobs.includes(value)) {
            this.selectedLobs.update((lobs) => [...lobs, value]);
            this.lobInput.nativeElement.value = '';
          }
          break;
        }
        case 'loc': {
          if (this.locs.includes(value)) {
            this.selectedLocs.update((locs) => [...locs, value]);
            this.locInput.nativeElement.value = '';
          }
          break;
        }
        case 'cc': {
          if (this.ccs.includes(value)) {
            this.selectedCcs.update((ccs) => [...ccs, value]);
            this.ccInput.nativeElement.value = '';
          }
          break;
        }
        case 'grade': {
          if (this.grades.includes(value)) {
            this.selectedGrades.update((grades) => [...grades, value]);
            this.gradeInput.nativeElement.value = '';
          }
          break;
        }
        case 'city': {
          if (this.cities.includes(value)) {
            this.selectedCities.update((cities) => [...cities, value]);
            this.cityInput.nativeElement.value = '';
          }
          break;
        }
        case 'state': {
          if (this.states.includes(value)) {
            this.selectedStates.update((states) => [...states, value]);
            this.stateInput.nativeElement.value = '';
          }
          break;
        }
        case 'department': {
          if (this.departments.includes(value)) {
            this.selectedDepartments.update((departments) => [
              ...departments,
              value,
            ]);
            this.departmentInput.nativeElement.value = '';
          }
          break;
        }
      }
    }
  }

  add(event: MatChipInputEvent, type: string): void {
    const value = (event.value || '').trim();
    if (value) {
      switch (type) {
        case 'lob': {
          if (this.lobs.includes(value)) {
            this.selectedLobs.update((lobs) => [...lobs, value]);
            this.lobInput.nativeElement.value = '';
          }
          break;
        }
        case 'loc': {
          if (this.locs.includes(value)) {
            this.selectedLocs.update((locs) => [...locs, value]);
            this.locInput.nativeElement.value = '';
          }
          break;
        }
        case 'cc': {
          if (this.ccs.includes(value)) {
            this.selectedCcs.update((ccs) => [...ccs, value]);
            this.ccInput.nativeElement.value = '';
          }
          break;
        }
        case 'grade': {
          if (this.grades.includes(value)) {
            this.selectedGrades.update((grades) => [...grades, value]);
            this.gradeInput.nativeElement.value = '';
          }
          break;
        }
        case 'city': {
          if (this.cities.includes(value)) {
            this.selectedCities.update((cities) => [...cities, value]);
            this.cityInput.nativeElement.value = '';
          }
          break;
        }
        case 'state': {
          if (this.states.includes(value)) {
            this.selectedStates.update((states) => [...states, value]);
            this.stateInput.nativeElement.value = '';
          }
          break;
        }
        case 'department': {
          if (this.departments.includes(value)) {
            this.selectedDepartments.update((departments) => [
              ...departments,
              value,
            ]);
            this.departmentInput.nativeElement.value = '';
          }
          break;
        }
      }
    }
  }

  remove(lob: string): void {
    console.log(lob, this.selectedLobs);
    this.selectedLobs.update((lobs) => {
      const index = lobs.indexOf(lob);
      if (index < 0) {
        return lobs;
      }

      lobs.splice(index, 1);
      return [...lobs];
    });
  }
}
