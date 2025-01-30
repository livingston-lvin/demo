import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { UrlChangeInterceptorService } from '../services/url-change.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule],
})
export class AppComponent implements OnInit {
  isLoading = signal(false);

  constructor(
    private loaderService: LoaderService,
    private urlChangeInterceptor: UrlChangeInterceptorService
  ) {
    this.isLoading = this.loaderService.isLoading;
  }

  ngOnInit() {
    this.urlChangeInterceptor.interceptUrlChanges();
  }
}
