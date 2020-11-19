import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LoginComponent} from './auth/login/login.component';
import { AppComponent } from './app.component';
import {RegisterComponent} from './auth/register/register.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from 'ng-recaptcha';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {OuterNavbarComponent} from './layout/outer-navbar/outer-navbar.component';
import {ChartsModule} from 'ng2-charts';
import {ModalComponent} from './layout/modal/modal.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyService} from './_services/currency.service';
import { LeftSidebarComponent } from './layout/left-sidebar/left-sidebar.component';
import {AuthGuard} from './_guards/auth.guard';
import {ErrorsHandler} from './errors-handler';
import { ErrorHandler} from '@angular/core';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Location} from '@angular/common';
import { SwiperModule} from 'ngx-swiper-wrapper';
import {HomeComponent} from "./home/home/home.component";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    OuterNavbarComponent,
    ModalComponent,
    LeftSidebarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RecaptchaFormsModule,
    RouterModule.forRoot(appRoutes),
    RecaptchaModule.forRoot(),
    HttpClientModule,
    ChartsModule,
    NgxQRCodeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SwiperModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6Ld68zsUAAAAAOJY60GQKoT0TNhLuIxDcyyfSmPc'} as RecaptchaSettings
    },
     // /*{
     //   provide: SWIPER_CONFIG,
     //   useValue: DEFAULT_SWIPER_CONFIG
     // },*/
    NgbActiveModal,
    CurrencyService,
    AuthGuard,
    Location,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }

  ],
  entryComponents: [
    ModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
