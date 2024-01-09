import { Component } from '@angular/core';
import { StoreService } from '../shared/store.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  constructor(public storeService: StoreService) { }

}
