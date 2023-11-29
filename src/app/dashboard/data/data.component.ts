import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  // @Input() currentPage = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Input() currentPage: number;
  @Output() currentPageChange = new EventEmitter<number>();
  itemsPerPage = CHILDREN_PER_PAGE; // The default number of items per page

  constructor(public storeService: StoreService, private backendService: BackendService) {
    this.currentPage = 0; // Set a default value
  }

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.currentPageChange.emit(this.currentPage);
    this.backendService.getChildren(this.currentPage);
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
      age--;
    }
    return age;
  }

  selectPage(i: any) {
    let currentPage = i;
    this.currentPageChange.emit(currentPage);
    this.backendService.getChildren(currentPage);
  }

  public returnAllPages() {
    return Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE)
  }

  public cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
  }
}


