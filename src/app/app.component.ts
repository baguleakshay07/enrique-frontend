import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {CurrencyService} from './_services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ctest-project';
}
