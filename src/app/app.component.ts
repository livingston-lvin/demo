import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule],
})
export class AppComponent {
  isLoading = signal(false);

  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading;
  }
}
