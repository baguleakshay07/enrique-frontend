import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  selectedLanguage = 'en';
  constructor(private router: Router,private translate: TranslateService) {
    translate.setDefaultLang('eng');
    translate.use('eng');
    this.selectedLanguage = 'English';
  }

  ngAfterViewInit() {
  }

  ngOnInit() {

  }


}
