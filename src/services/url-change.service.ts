import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlChangeService {
  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      console.log(val instanceof NavigationEnd);
    });
  }
}
