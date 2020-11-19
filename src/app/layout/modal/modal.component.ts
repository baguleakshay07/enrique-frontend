import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ClipboardService} from 'ngx-clipboard';
import {CurrencyService} from '../../_services/currency.service';
@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit, OnInit {
    selectedLanguage: string;
    isCollapsed = true;
    title = '';
    closeResult: string;
    copied = false;

    constructor(public currencyService: CurrencyService, private clipboardService: ClipboardService, private modalService: NgbModal, private translate: TranslateService) {
        translate.setDefaultLang('eng');
        translate.use('eng');
        this.selectedLanguage = 'English';
    }

    ngOnInit() {

    }


    ngAfterViewInit() {

    }

    close() {
      this.modalService.dismissAll();
    }
    copy(text: string) {
      this.copied = true;
      this.clipboardService.copyFromContent(text);
      setTimeout(() => {
        this.copied = false;
      }, 3500);
    }

}
