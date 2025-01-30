import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading = signal(false);
  constructor() {}

  public showLoader(value: boolean) {
    // const preloader = document.getElementById('preloader') as HTMLInputElement;
    // preloader.style.display = value ? 'block' : 'none';

    // const preload = document.getElementById('preload') as HTMLInputElement;
    // preload.style.display = value ? 'block' : 'none';
    this.isLoading.set(value);
  }
}
