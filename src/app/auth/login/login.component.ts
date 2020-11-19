import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyService} from '../../_services/currency.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
    loginModel: any = {};
    loginErr;
    loading;
    captcha;
    genericError = false;
    ip = false;
    selectedLanguage = 'en';
    loader = false;
    constructor(private currencyService: CurrencyService, private router: Router, private translate: TranslateService,
                private http: HttpClient) {
      translate.setDefaultLang('eng');
      translate.use('eng');
      this.selectedLanguage = 'English';
    }

    ngAfterViewInit() {
    }

    ngOnInit() {

    }

    login(form) {
        this.loading = true;
        this.currencyService.login(this.loginModel.email, this.loginModel.password, this.captcha)
            .subscribe(
                (response) => {
                    this.ip = false;
                    this.loginErr = null;
                    this.loading = false;
                    if (response.statusCode === 'ENTER_TWOFA_CODE') {
                        localStorage.setItem('TWOFA_SESSIONID', response.sessionId);
                        this.router.navigate(['/twofa']);
                    } else {
                        this.router.navigate(['/home']);
                    }
                },
                (err) => {
                  if (err.status === 404) {
                      this.genericError = true;
                    } else if (err.error.statusCode === 'IP_UNVERIFIED') {
                        form.reset();
                        this.ip = true;
                    } else {
                        this.ip = false;
                    }
                  this.loginErr = err.error.statusText;
                  setTimeout(() => {
                      this.loginErr = null;
                      this.genericError = null;
                    }, 2000);
                  this.captcha = '';
                  this.loading = false;
                  return false;
                });
    }
}

