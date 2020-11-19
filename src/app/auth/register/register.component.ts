import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CurrencyService} from '../../_services/currency.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registrationModel: any = {};
  registrationErr;
  loading;
  captcha;
  genericError = false;
  selectedLanguage = 'en';
  email;
  registerationSuccess = false;
  passwordMatch = false;
  ip = false;
  public errorMessages = {
    name: [
      {type: 'required', message: 'Name is required'},
      {type: 'maxlength', message: 'Name cant be longer than 100 characters'}
    ],
    email: [
      {type: 'required', message: 'Email is required'},
      {type: 'pattern', message: 'Please enter a valid email address'}
    ],
    phone: [
      {type: 'required', message: 'Phone number is required'},
      {type: 'pattern', message: 'Please enter a valid phone number'}
    ],
  };

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

    signup(form) {
      this.loading = true;
      this.currencyService.signup(this.registrationModel, this.captcha)
      .subscribe(
        () => {
          form.reset();
          this.loading = false;
          this.registerationSuccess = true;
          this.registrationErr = null;
          setTimeout(() => {
            this.registerationSuccess = false;
            this.router.navigate(['/sign-in']);
          }, 1000);
          localStorage.removeItem('gt_email');
        },
        (err) => {
          if (err.status === 404) {
            this.genericError = true;
          }
          this.registrationErr = err.error.statusText;
          this.registerationSuccess = false;
          setTimeout(() => {
            this.registrationErr = null;
            this.genericError = null;
          }, 2000);
          this.captcha = '';
          this.loading = false;
          return false;
        });
  }

  checkPassword(value) {
        this.passwordMatch = this.registrationModel.password.toString() !== this.registrationModel.rpassword.toString();

  }
}

