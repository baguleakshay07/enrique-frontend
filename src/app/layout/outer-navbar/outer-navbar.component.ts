import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyService} from '../../_services/currency.service';

@Component({
    selector: 'app-outer-navbar',
    templateUrl: './outer-navbar.component.html',
    styleUrls: ['./outer-navbar.component.scss']
})
export class OuterNavbarComponent implements AfterViewInit, OnInit {
    selectedLanguage: string;
    title = '';
    currentUser;

    constructor(private router: Router, public currencyService: CurrencyService, private translate: TranslateService) {
        translate.setDefaultLang('eng');
        translate.use('eng');
        this.selectedLanguage = 'English';


    }

    ngOnInit() {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      /*if (user && user.logout) {
        this.currencyService.currentUser$.next(null);
      }*/

      this.currencyService.currentUser$.subscribe((currentUser) => {
        if (currentUser && currentUser.logout) {
            this.currentUser = currentUser;
           // this.currencyService.currentUser$.next(null);
            this.router.navigate(['/home']);
          }
        },
        err => {
          console.log(err);
        });
    }

    ngAfterViewInit() {

    }



}
