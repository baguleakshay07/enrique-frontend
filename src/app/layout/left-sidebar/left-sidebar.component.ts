import { Component, OnInit } from '@angular/core';
import {CurrencyService} from '../../_services/currency.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {


  constructor(public currencyService: CurrencyService) {

  }

  ngOnInit() {
  }

}
