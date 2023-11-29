import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public currentPage: number = 0;

  receiveMessage(newPageCount: number) {
    this.currentPage = newPageCount;
  }

  handlePageChange(newPage: number): void {
    this.currentPage = newPage;
  }

}
