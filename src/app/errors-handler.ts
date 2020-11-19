import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CurrencyService } from './_services/currency.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private currencyService: CurrencyService) {

  }
  handleError(error: Error) {
    if (error instanceof HttpErrorResponse) {


      if (error.status === 403) {
        if (localStorage.getItem('currentUser')) {
          const user = JSON.parse(localStorage.getItem('currentUser'));
          user.logout = true;
          if (user && user.logout) {
           // this.router.navigate(['/home']);
            this.currencyService.currentUser$.next(user);
          }
        }
      }
    } else {

    }
    console.error('[HANLDER]', error);
  }
}
