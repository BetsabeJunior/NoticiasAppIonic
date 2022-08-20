import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Article } from '../interfaces/index';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private storageService: StorageService) {}

  get noticias(): Article[]{
    return this.storageService.getLocalNoticias;
  }
}
