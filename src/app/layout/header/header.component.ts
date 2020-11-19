import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ModalComponent} from '../modal/modal.component';
import {NgbActiveModal, NgbDropdownConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyService} from '../../_services/currency.service';
import {animate, group, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-navbar',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements AfterViewInit, OnInit {
    selectedLanguage: string;
    title = '';


    constructor(config: NgbDropdownConfig, private router: Router, public currencyService: CurrencyService, private modalService: NgbModal, public activeModal: NgbActiveModal, private translate: TranslateService) {
        config.autoClose = true;
        translate.setDefaultLang('eng');
        translate.use('eng');
        this.selectedLanguage = 'English';
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }



  logout() {
    this.currencyService.logout().subscribe(() => {
      localStorage.removeItem('currentUser');
      this.currencyService.currentUser$.next(null);
      this.router.navigate(['/home']);
    }, () => {
      localStorage.removeItem('currentUser');
      this.currencyService.currentUser$.next(null);
      this.router.navigate(['/home']);
    });
  }

}
