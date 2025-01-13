import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { UrlChangeService } from '../services/url-change.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule],
})
export class AppComponent {
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), UrlChangeService],
});
