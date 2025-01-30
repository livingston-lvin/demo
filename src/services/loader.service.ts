import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}

  public showLoader(value: any) {
    const preloader = document.getElementById('preloader') as HTMLInputElement;
    preloader.style.display = value ? 'block' : 'none';

    const preload = document.getElementById('preload') as HTMLInputElement;
    preload.style.display = value ? 'block' : 'none';
  }
}
