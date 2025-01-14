import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlChangeService {
  constructor(private router: Router) {
    console.log(router.isActive);
    this.logUrlChanges();
  }

  logUrlChanges() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('Navigated to URL:', event.urlAfterRedirects);
      });
  }
}
