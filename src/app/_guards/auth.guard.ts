import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {RegisterComponent} from '../auth/register/register.component';
import {CurrencyService} from '../_services/currency.service';

@Injectable()
export class AuthGuard implements CanActivate {

  //  private static authorizedUrls = ['login', 'register'];

    constructor(private router: Router, private currencyService: CurrencyService ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const path = route.url[0].path;
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || currentUser.logout  ) {
          this.currencyService.currentUser$.next(null);
          this.router.navigate(['/home']);
          return false;
        }
        return true;
    }
}
