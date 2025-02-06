import { HttpErrorResponse, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { SnackbarService } from '../services/snackbar.service';
import { Error } from '../constants/AppData';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader: LoaderService = inject(LoaderService);
  const snackbarService: SnackbarService = inject(SnackbarService);
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Sent) {
        loader.isLoading.set(true);
      } else if (event.type === HttpEventType.Response) {
        loader.isLoading.set(false);
      }
    }),
    catchError((error) => {
      console.log(error);
      snackbarService.openSnackBar({ msg: error.error, type: Error });
      loader.isLoading.set(false);
      return of(error);
    })
  );
};
