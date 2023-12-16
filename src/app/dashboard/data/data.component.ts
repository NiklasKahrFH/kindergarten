import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { PageEvent } from '@angular/material/paginator';
import { ChildrensKindergardens } from 'src/app/shared/interfaces/childrens-kindergardens';
import { LoadingSpinnerComponent } from 'src/app/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  @ViewChild(LoadingSpinnerComponent) spinner!: LoadingSpinnerComponent;
  @ViewChild('kindergardenList') kindergardenList: any;
  @Output() pageChange = new EventEmitter<number>();
  @Input() currentPage: number;
  @Output() currentPageChange = new EventEmitter<number>();
  itemsPerPage = CHILDREN_PER_PAGE; // The default number of items per page
  childrensKindergartens: ChildrensKindergardens[] = [];

  constructor(public storeService: StoreService, private backendService: BackendService) {
    this.currentPage = 0; // Set a default value
  }

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
    setTimeout(() => {
      this.extractChildrensKindergartens();
    }, 1400);
  }

  extractChildrensKindergartens(): void {
    const uniqueKindergartens = new Map<string, ChildrensKindergardens>();
    this.storeService.children.forEach(child => {
      const key = `${child.kindergarden.name}-${child.kindergarden.address}`;
      if (!uniqueKindergartens.has(key)) {
        uniqueKindergartens.set(key, {
          name: child.kindergarden.name,
          address: child.kindergarden.address
        });
      }
    });
    this.childrensKindergartens = Array.from(uniqueKindergartens.values());
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.currentPageChange.emit(this.currentPage);
    this.backendService.getChildren(this.currentPage);
    this.spinner.checkSpinner(); // Call the method on the spinner component
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

  filter(kindergardenName: string) {

  }

  resetFilter() {

  }
}